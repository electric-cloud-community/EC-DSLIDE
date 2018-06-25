/*

Electric Flow DSL - Create a deployable application
This example creates bare bones application model, artifacts and environment model that can be run to install a dummy application.  It exercises and illustrates the following key Electric Flow features:

- Application Modeling
	- Components that reference an artifact management system (Electric Flow Artifact Management)
	- Multiple tiers to target different content types to different server groups
	- Manual approval step
	- Rollback (on manual rejection)
- Artifact Management
	- Adding files programmatically through a procedure
- Environment Modeling
	- Multiple tiers to group different servers (all resources are mapped to 'localhost' for this example)

Instructions
1. Run this code through the DSLIDE (optionally edit the Customizable values below)
2. Navigate to the application model
3. Run the Deploy process to an environment in this project
4. Select Success in the Manual approval
5. Examine the Environment Inventory for this project
6. Run again with Smart Deploy turned off
7. Fail the Manual Validate step, this will cause roll back

Limitations
- Only works with Linux Electric Flow host

*/


// Customizable values ------------------

// Application Name
def projectName = "DSLIDE Example"
def AppName = "DSLIDE Application"
// Environment names ["env1", "env2" ...]
def envs = ["QA","UAT"]

// Application-Environment tier mapping ["apptier1":"envtier1", "apptier2":"envtier2" ...]
// The values will be used to create application and environment tier names and their maps
def appEnvTiers = ["App":"Tomcat", "DB":"MySQL"]

// Artifact group id
def ArtifactRoot = "com.mycompany.dslide"


// Clean up from prior runs ------------------

def envTiers = appEnvTiers.values()
def appTiers = appEnvTiers.keySet()

// Remove old application model
deleteApplication (projectName: projectName, applicationName: AppName) 

// Remove old Environment models
envs.each { env ->
	appTiers.each() { Tier ->
		def res = "${env}_${Tier}"
		deleteResource resourceName: res
	}
	deleteEnvironment(projectName: projectName, environmentName: env)
}

// Create new -------------------------------

def ArtifactVersions = []

project projectName, {

	// Create Environments, Tiers and Resources
	envs.each { env ->
		environment environmentName: env, {
			envTiers.each() { Tier ->
				def res = "${env}_${Tier}"
				environmentTier Tier, {
					// create and add resource to the Tier
					resource resourceName: res, hostName : "localhost"
				}
			}
		}
	} // Environments

	application applicationName: AppName, {
		
		appTiers.each() { Tier ->
			applicationTier Tier, {
				def CompName = "${Tier}_comp"
				def ArtifactVersion = "1.35"
				def ArtifactName = ArtifactRoot + ':' + CompName
				ArtifactVersions << [artifactName: ArtifactName, artifactVersion: ArtifactVersion]
				// Create artifact
				artifact groupId: ArtifactRoot, artifactKey: CompName
		
				component CompName, pluginKey: "EC-Artifact", {
					ec_content_details.with { 
						pluginProjectName = "EC-Artifact"
						pluginProcedure = "Retrieve"
						artifactName = ArtifactName
						filterList = ""
						overwrite = "update"
						versionRange = ArtifactVersion
						artifactVersionLocationProperty = "/myJob/retrievedArtifactVersions/\$" + "[assignedResourceName]"
					}

					process "Install", processType: "DEPLOY", componentApplicationName: AppName,{
						processStep "Retrieve Artifact",
							processStepType: "component",
							subprocedure: "Retrieve",
							errorHandling: "failProcedure",
							subproject: "/plugins/EC-Artifact/project",
							applicationName: null,
							applicationTierName: null,
							actualParameter: [ 
								artifactName : "\$" + "[/myComponent/ec_content_details/artifactName]",
								artifactVersionLocationProperty : "\$" + "[/myComponent/ec_content_details/artifactVersionLocationProperty]",
								filterList : "\$" + "[/myComponent/ec_content_details/filterList]",
								overwrite : "\$" + "[/myComponent/ec_content_details/overwrite]",
								versionRange : "\$" + "[/myJob/ec_" + CompName + "-version]"
							]
							
						processStep "Deploy Artifact",
							applicationName: null,
							applicationTierName: null,
							componentApplicationName: AppName,
							command: "echo testing $CompName..."
							
						processStep "Deploy Artifact",
							processStepType: 'command',
							subproject: '/plugins/EC-Core/project',
							subprocedure: 'RunCommand',
							actualParameter: [
								shellToUse: 'sh',
								commandToRun: 'sh $' + '[/myJob/retrievedArtifactVersions/$' + '[assignedResourceName]/$' + '[/myComponent/ec_content_details/artifactName]/cacheLocation]/installer.sh'
								],
							applicationName: null,
							applicationTierName: null,
							componentApplicationName: AppName		
							
						processDependency "Retrieve Artifact",
							targetProcessStepName: "Deploy Artifact"
							
					} // process
				} // Components
				process "Deploy",{
					
					processStep  "Install $CompName",
						processStepType: 'process',
						componentName: null,
						componentApplicationName: AppName,
						errorHandling: 'failProcedure',
						subcomponent: CompName,
						subcomponentApplicationName: AppName,
						subcomponentProcess: "Install"

						processStep 'Validate', {
							errorHandling = 'failProcedure'
							processStepType = 'manual'
							notificationTemplate = 'ec_default_manual_retry_process_step_notification_template'
							assignee = [
							'admin',
							]
						} // processStep
						
						processStep 'Rollback',
							rollbackType: 'environment',
							processStepType: 'rollback',
							errorHandling: 'abortJob'
						
						processDependency "Install $CompName", targetProcessStepName: 'Validate', {
							branchCondition = '$[/javascript !getProperty("/myJob/ec_rollbackCallerJobId")]'
							branchConditionName = 'notOnRollback'
							branchConditionType = 'CUSTOM'
							branchType = 'ALWAYS'
						}

						processDependency 'Validate', targetProcessStepName: 'Rollback', {
							branchType = 'ERROR'
						}						
						
				} // process
			} // applicationTier
		} // each Tier

		// Create Application-Environment mappings
		envs.each { Env -> 
			tierMap tierMapName: "$AppName-$Env",
				environmentProjectName: projectName, // Replace with projectName reference
				environmentName: Env,
				tierMapping: appEnvTiers			
		} // each Env
		
	} // Applications

} // project

// Create publishArtifact procedure

project projectName, {
	procedure "Publish Artifact Versions", {
		formalParameter "artifactName", type: "textentry", required: "1"
		formalParameter "artifactVersion", type: "textentry", required: "1"
		formalParameter "fileName", type: "textentry", required: "1"
		formalParameter "fileContent", type: "textarea", required: "1"
		
		step "Create File",
			subproject: "/plugins/EC-FileOps/project",
			subprocedure: "AddTextToFile",
			actualParameter: [
				Path: '$' + "[fileName]",
				Content: '$' + "[fileContent]",
				AddNewLine: "0",
				Append: "0"
			]
			
		step "Publish Artifact",
			subproject: "/plugins/EC-Artifact/project",
			subprocedure: "Publish",
			actualParameter: [
				artifactName: '$' + "[artifactName]",
				artifactVersionVersion: '$' + "[artifactVersion]",
				includePatterns: '$' + "[fileName]",
				repositoryName: "Default"
				//fromLocation:
			]
	}
}

ArtifactVersions.each { ar ->
	// Create artifact version
	transaction {
		runProcedure procedureName: "Publish Artifact Versions", projectName: projectName,
			actualParameter: [
				artifactName: ar.artifactName,
				fileContent: "echo Installing " + ar.artifactName,
				fileName: "installer.sh",
				artifactVersion: ar.artifactVersion
				]
	}
}



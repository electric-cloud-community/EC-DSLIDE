/*

Electric Flow DSL - Create a software delivery pipeline
This example creates bare bones pipeline model.  It exercises and illustrates the following key Electric Flow features:

- Pipeline modeling
- Snapshot

Instructions
1. Create the application model first (see DSLIDE examples)
1. Run this code through the DSLIDE (optionally edit the Customizable values below)
2. Navigate to the pipeline model
3. Run the pipeline, mark the validation 'Success'
4. Approve UAT entry


*/
// Settings
def ProjectName = "DSLIDE Example"
def pipe = "DSLIDE Pipeline"
def AppName = "DSLIDE Application"

// Environment and Stage names
def Envs = ["QA","UAT"]

project ProjectName, {
	
	application AppName // In case the application has not already been created
	
	pipeline pipe, {
	
		// Development State
		stage Envs[0], {
			task "Deploy",
				taskType: "PROCESS",
				subapplication: AppName,
				subproject: projectName,
				subprocess: "Deploy",
				taskProcessType: "APPLICATION",
				environmentName: Envs[0],
				clearActualParameters: "true",
				actualParameter: [ ec_smartDeployOption: "true" ]

				task "Create Snapshot",{
					actualParameter = [
						'ApplicationName': AppName,
						'EnvironmentName': Envs[0],
						'EnvironmentProjectName': projectName,
						'Overwrite': 'false',
						'ProjectName': projectName,
						'SnapshotName': (String) "${AppName}-${Envs[0]}-\$[/increment /myProject/SnapshotIndex]",
					]
					subpluginKey = 'EF-Utilities'
					subprocedure = 'Create Snapshot'
					taskType = 'UTILITY'
				} // task
			task "System Tests",{
				subpluginKey = 'EC-Core'
				subprocedure = 'RunCommand'
				actualParameter = [
					commandToRun: "ectool setProperty \"/myPipelineStageRuntime/ec_summary/Test Results\" " +
						// Dummy location...
						"\'" + '<html><a href=\"TestResultsSummary.html\">links</a></html>' + "\'"
				]
				taskType = 'COMMAND'
			} // task			
		} // QA Stage
		
		stage Envs[1], {
		
			// Entry gate to UAT
			task "Entry gate approval",
				taskType: 'APPROVAL',
				approver: ['admin'],
				gateType: 'PRE',
				notificationTemplate: 'ec_default_pipeline_notification_template'

			task "Deploy",
				taskProcessType: "APPLICATION",
				subproject: projectName,
				subapplication: AppName,
				subprocess: "Deploy",
				environmentName: Envs[1],
				advancedMode: "1", // allow for variable snapshotName
				snapshotName: "${AppName}-${Envs[0]}-\$[/myProject/SnapshotIndex]",
				clearActualParameters: true,
				taskType: "PROCESS",
				actualParameter: [ ec_smartDeployOption: "true" ]

			task "Smoke Test",{
				subpluginKey = 'EC-Core'
				subprocedure = 'RunCommand'
				actualParameter = [
					commandToRun: "ectool setProperty \"/myPipelineStageRuntime/ec_summary/Smoke Test Restults\" " +
						// Dummy location...
						"\'" + '<html><a href=\"TestResultsSummary.html\">link</a></html>' + "\'"
				]
				taskType = 'COMMAND'
			} // task		
				
		} // Stage QA

	} // Pipeline

} // Project

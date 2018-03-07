// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var WORD = /[\w$]+/, RANGE = 500;

  CodeMirror.registerHelper("hint", "anyword", function(editor, options) {
    var word = options && options.word || WORD;
    var range = options && options.range || RANGE;
    var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
    var end = cur.ch, start = end;
    while (start && word.test(curLine.charAt(start - 1))) --start;
    var curWord = start != end && curLine.slice(start, end);

    var list = [], seen = {};
	
		setSelectOptions(list,"aclEntry");
		setSelectOptions(list,"actualParameter");
		setSelectOptions(list,"application");
		setSelectOptions(list,"applicationTier");
		setSelectOptions(list,"artifact");
		setSelectOptions(list,"artifactVersion");
		setSelectOptions(list,"component");
		setSelectOptions(list,"credential");
		setSelectOptions(list,"directoryProvider");
		setSelectOptions(list,"emailConfig");
		setSelectOptions(list,"emailNotifier");
		setSelectOptions(list,"environment");
		setSelectOptions(list,"environmentInventoryItem");
		setSelectOptions(list,"environmentTemplate");
		setSelectOptions(list,"environmentTemplateTier");
		setSelectOptions(list,"environmentTemplateTierMap");
		setSelectOptions(list,"environmentTier");
		setSelectOptions(list,"eventSubscription");
		setSelectOptions(list,"formalParameter");
		setSelectOptions(list,"gateway");
		setSelectOptions(list,"getAccess");
		setSelectOptions(list,"getAclEntry");
		setSelectOptions(list,"getActualParameter");
		setSelectOptions(list,"getActualParameters");
		setSelectOptions(list,"getAdminLicense");
		setSelectOptions(list,"getApplication");
		setSelectOptions(list,"getApplications");
		setSelectOptions(list,"getApplicationTier");
		setSelectOptions(list,"getApplicationTiers");
		setSelectOptions(list,"getApplicationTiersInComponent");
		setSelectOptions(list,"getArtifact");
		setSelectOptions(list,"getArtifacts");
		setSelectOptions(list,"getArtifactVersion");
		setSelectOptions(list,"getArtifactVersions");
		setSelectOptions(list,"getAvailableResourcesForEnvironment");
		setSelectOptions(list,"getComponent");
		setSelectOptions(list,"getComponents");
		setSelectOptions(list,"getComponentsInApplicationTier");
		setSelectOptions(list,"getCredential");
		setSelectOptions(list,"getCredentials");
		setSelectOptions(list,"getDatabaseConfiguration");
		setSelectOptions(list,"getDeploymentHistoryItems");
		setSelectOptions(list,"getDirectoryProvider");
		setSelectOptions(list,"getDirectoryProviders");
		setSelectOptions(list,"getEmailConfig");
		setSelectOptions(list,"getEmailConfigs");
		setSelectOptions(list,"getEmailNotifier");
		setSelectOptions(list,"getEmailNotifiers");
		setSelectOptions(list,"getEntityChange");
		setSelectOptions(list,"getEntityChangeDetails");
		setSelectOptions(list,"getEnvironment");
		setSelectOptions(list,"getEnvironmentApplications");
		setSelectOptions(list,"getEnvironmentInventory");
		setSelectOptions(list,"getEnvironmentInventoryItem");
		setSelectOptions(list,"getEnvironmentInventoryItems");
		setSelectOptions(list,"getEnvironments");
		setSelectOptions(list,"getEnvironmentTemplate");
		setSelectOptions(list,"getEnvironmentTemplates");
		setSelectOptions(list,"getEnvironmentTemplateTier");
		setSelectOptions(list,"getEnvironmentTemplateTierMaps");
		setSelectOptions(list,"getEnvironmentTemplateTiers");
		setSelectOptions(list,"getEnvironmentTier");
		setSelectOptions(list,"getEnvironmentTiers");
		setSelectOptions(list,"getEventSubscription");
		setSelectOptions(list,"getEventSubscriptions");
		setSelectOptions(list,"getFormalParameter");
		setSelectOptions(list,"getFormalParameters");
		setSelectOptions(list,"getFullCredential");
		setSelectOptions(list,"getGateway");
		setSelectOptions(list,"getGateways");
		setSelectOptions(list,"getGroup");
		setSelectOptions(list,"getGroups");
		setSelectOptions(list,"getHook");
		setSelectOptions(list,"getHooks");
		setSelectOptions(list,"getJobDetails");
		setSelectOptions(list,"getJobInfo");
		setSelectOptions(list,"getJobNotes");
		setSelectOptions(list,"getJobs");
		setSelectOptions(list,"getJobsForSchedule");
		setSelectOptions(list,"getJobStatus");
		setSelectOptions(list,"getJobStepDetails");
		setSelectOptions(list,"getJobStepStatus");
		setSelectOptions(list,"getJobSummary");
		setSelectOptions(list,"getLicense");
		setSelectOptions(list,"getLicenses");
		setSelectOptions(list,"getLicenseUsage");
		setSelectOptions(list,"getManifest");
		setSelectOptions(list,"getPartialApplicationRevision");
		setSelectOptions(list,"getPipeline");
		setSelectOptions(list,"getPipelineRuntimeDetails");
		setSelectOptions(list,"getPipelineRuntimes");
		setSelectOptions(list,"getPipelines");
		setSelectOptions(list,"getPipelineStageRuntimeTasks");
		setSelectOptions(list,"getPlugin");
		setSelectOptions(list,"getPlugins");
		setSelectOptions(list,"getProcedure");
		setSelectOptions(list,"getProcedures");
		setSelectOptions(list,"getProcess");
		setSelectOptions(list,"getProcessDependencies");
		setSelectOptions(list,"getProcesses");
		setSelectOptions(list,"getProcessStep");
		setSelectOptions(list,"getProcessSteps");
		setSelectOptions(list,"getProject");
		setSelectOptions(list,"getProjects");
		setSelectOptions(list,"getProperties");
		setSelectOptions(list,"getProperty");
		setSelectOptions(list,"getRepositories");
		setSelectOptions(list,"getRepository");
		setSelectOptions(list,"getResource");
		setSelectOptions(list,"getResourcePool");
		setSelectOptions(list,"getResourcePools");
		setSelectOptions(list,"getResourcePoolsInEnvironmentTier");
		setSelectOptions(list,"getResources");
		setSelectOptions(list,"getResourcesInEnvironmentTemplateTierRetrieve");
		setSelectOptions(list,"getResourcesInEnvironmentTier");
		setSelectOptions(list,"getResourcesInPool");
		setSelectOptions(list,"getResourceTemplate");
		setSelectOptions(list,"getResourceTemplates");
		setSelectOptions(list,"getResourceTemplatesInEnvironmentTemplateTierRetrieve");
		setSelectOptions(list,"getResourceUsage");
		setSelectOptions(list,"getSchedule");
		setSelectOptions(list,"getSchedules");
		setSelectOptions(list,"getServerInfo");
		setSelectOptions(list,"getServerStatus");
		setSelectOptions(list,"getSnapshot");
		setSelectOptions(list,"getSnapshotEnvironments");
		setSelectOptions(list,"getSnapshots");
		setSelectOptions(list,"getStage");
		setSelectOptions(list,"getStages");
		setSelectOptions(list,"getState");
		setSelectOptions(list,"getStateDefinition");
		setSelectOptions(list,"getStateDefinitions");
		setSelectOptions(list,"getStates");
		setSelectOptions(list,"getStep");
		setSelectOptions(list,"getSteps");
		setSelectOptions(list,"getTask");
		setSelectOptions(list,"getTasks");
		setSelectOptions(list,"getTierMaps");
		setSelectOptions(list,"getTransition");
		setSelectOptions(list,"getTransitionDefinition");
		setSelectOptions(list,"getTransitionDefinitions");
		setSelectOptions(list,"getTransitions");
		setSelectOptions(list,"getUser");
		setSelectOptions(list,"getUsers");
		setSelectOptions(list,"getVersions");
		setSelectOptions(list,"getWorkflow");
		setSelectOptions(list,"getWorkflowDefinition");
		setSelectOptions(list,"getWorkflowDefinitions");
		setSelectOptions(list,"getWorkflows");
		setSelectOptions(list,"getWorkspace");
		setSelectOptions(list,"getWorkspaces");
		setSelectOptions(list,"getZone");
		setSelectOptions(list,"getZones");
		setSelectOptions(list,"group");
		setSelectOptions(list,"hook");
		setSelectOptions(list,"job");
		setSelectOptions(list,"jobStep");
		setSelectOptions(list,"pipeline");
		setSelectOptions(list,"procedure");
		setSelectOptions(list,"process");
		setSelectOptions(list,"processDependency");
		setSelectOptions(list,"processStep");
		setSelectOptions(list,"project");
		setSelectOptions(list,"property");
		setSelectOptions(list,"repository");
		setSelectOptions(list,"resource");
		setSelectOptions(list,"resourcePool");
		setSelectOptions(list,"resourceTemplate");
		setSelectOptions(list,"runProcedure");
		setSelectOptions(list,"schedule");
		setSelectOptions(list,"snapshot");
		setSelectOptions(list,"stage");
		setSelectOptions(list,"stateDefinition");
		setSelectOptions(list,"step-command");
		setSelectOptions(list,"step-plugin");
		setSelectOptions(list,"step-subprocedure");
		setSelectOptions(list,"step-workflow");
		setSelectOptions(list,"task");
		setSelectOptions(list,"tierMap");
		setSelectOptions(list,"transitionDefinition");
		setSelectOptions(list,"user");
		setSelectOptions(list,"workflowDefinition");
		setSelectOptions(list,"workspace");
		setSelectOptions(list,"zone");
		
    var re = new RegExp(word.source, "g");
    for (var dir = -1; dir <= 1; dir += 2) {
      var line = cur.line, endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
      for (; line != endLine; line += dir) {
        var text = editor.getLine(line), m;
        while (m = re.exec(text)) {
          if (line == cur.line && m[0] === curWord) continue;
          if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
            seen[m[0]] = true;
            list.push(m[0]);
          }
        }
      }
    }
    return {list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};
  });
});

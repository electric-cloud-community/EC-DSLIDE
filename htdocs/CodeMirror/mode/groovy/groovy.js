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

CodeMirror.defineMode("groovy", function(config) {
  function words(str) {
    var obj = {}, words = str.split(" ");
    for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
    return obj;
  }
  var keywords = words(
    "abstract as assert boolean break byte case catch char class const continue def default " +
    "do double else enum extends final finally float for goto if implements import in " +
    "instanceof int interface long native new package private protected public return " +
    "short static strictfp super switch synchronized threadsafe throw throws transient " +
    "try var void volatile while");
  var blockKeywords = words("catch class do else finally for if switch try while enum interface def");
  var standaloneKeywords = words("return break continue");
  var atoms = words("null true false this");

  var dsl_keywords = words( "aclEntry actualParameter application applicationDependency applicationFromDeploymentPackage applicationServiceMapping applicationTier artifact artifactVersion catalog catalogItem cluster component container credential dashboard deployerApplication deployerConfiguration deployerService directoryProvider emailConfig emailNotifier environment environmentInventoryItem environmentMap environmentTemplate environmentTemplateTier environmentTemplateTierMap environmentTemplateTierMapping environmentTier environmentVariable eventSubscription formalOutputParameter formalParameter gate gateway group hook job jobStep note pipeline port procedure process processDependency processStep project property release report reportObjectAssociation reportObjectAttribute reportObjectType reportingFilter repository reservation resource resourcePool resourceTemplate rollingDeployPhase schedule service serviceClusterMapping serviceDependency serviceMapDetail snapshot stage stateDefinition step task taskGroup tierMap tierMapping transitionDefinition user utilityResource waitDependency widget widgetFilterOverride workflowDefinition workspace zone" );

  var dsl_func_keywords = words( "abortAllJobs abortAllPipelineRuns abortJob abortJobStep abortPipelineRun addComponentToApplicationTier addDependentsToArtifactVersion addResourcePoolToEnvironmentTier addResourceTemplateToEnvironmentTemplateTier addResourceToEnvironmentTemplateTier addResourceToEnvironmentTier addResourcesToEnvironmentTier addResourcesToPool addSubrelease addUsersToGroup attachCredential attachParameter breakAclInheritance changeOwner checkAccess cleanupArtifactCache cleanupRepository clone completeJob completeJobStep completeManualProcessStep completeManualTask completeRelease completeRuntimeWaitDependency completeWorkflow copyComponent createAclEntry createActualParameter createApplication createApplicationDependency createApplicationFromDeploymentPackage createApplicationServiceMapping createApplicationTier createArtifact createArtifactVersion createCatalog createCatalogItem createCluster createComponent createContainer createCredential createDashboard createDeployerApplication createDeployerConfiguration createDeployerService createDirectoryProvider createEmailConfig createEmailNotifier createEnvironment createEnvironmentInventoryItem createEnvironmentMap createEnvironmentTemplate createEnvironmentTemplateTier createEnvironmentTemplateTierMap createEnvironmentTemplateTierMapping createEnvironmentTier createEnvironmentVariable createEventSubscription createFormalOutputParameter createFormalParameter createGate createGateway createGroup createHook createJob createJobStep createNote createPipeline createPort createProcedure createProcess createProcessDependency createProcessStep createProject createProperty createRelease createReport createReportObjectAssociation createReportObjectAttribute createReportObjectType createReportingFilter createRepository createReservation createResource createResourcePool createResourceTemplate createRollingDeployPhase createSchedule createService createServiceClusterMapping createServiceDependency createServiceMapDetail createSnapshot createStage createStateDefinition createStep createTask createTaskGroup createTierMap createTierMapping createTransitionDefinition createUser createUtilityResource createWaitDependency createWidget createWidgetFilterOverride createWorkflowDefinition createWorkspace createZone deleteAclEntry deleteActualParameter deleteApplication deleteApplicationDependency deleteApplicationServiceMapping deleteApplicationTier deleteArtifact deleteArtifactVersion deleteCatalog deleteCatalogItem deleteCluster deleteComponent deleteContainer deleteCredential deleteDashboard deleteDirectoryProvider deleteEmailConfig deleteEmailNotifier deleteEnvironment deleteEnvironmentInventoryItem deleteEnvironmentMap deleteEnvironmentTemplate deleteEnvironmentTemplateTier deleteEnvironmentTemplateTierMap deleteEnvironmentTemplateTierMapping deleteEnvironmentTier deleteEnvironmentVariable deleteEventSubscription deleteFormalOutputParameter deleteFormalParameter deleteGate deleteGateway deleteGroup deleteHook deleteJob deleteLicense deleteNote deletePipeline deletePipelineRun deletePlugin deletePort deleteProcedure deleteProcess deleteProcessDependency deleteProcessStep deleteProject deleteProperty deleteRelease deleteReport deleteReportObjectAssociation deleteReportObjectAttribute deleteReportObjectType deleteReportingFilter deleteRepository deleteReservation deleteResource deleteResourcePool deleteResourceTemplate deleteRollingDeployPhase deleteSchedule deleteService deleteServiceClusterMapping deleteServiceDependency deleteServiceMapDetail deleteSnapshot deleteStage deleteStateDefinition deleteStep deleteTask deleteTierMap deleteTierMapping deleteTransitionDefinition deleteUser deleteUtilityResource deleteWaitDependency deleteWidget deleteWidgetFilterOverride deleteWorkflow deleteWorkflowDefinition deleteWorkspace deleteZone describeObject detachCredential detachParameter doActionOnRealtimeCluster evalDsl evalScript expandString export exportPlugin generateDsl getAccess getAclEntry getActualParameter getActualParameters getAdminLicense getAllWaitingTasks getApplication getApplicationDependencies getApplicationServiceMapping getApplicationServiceMappings getApplicationTier getApplicationTiers getApplicationTiersInComponent getApplications getArtifact getArtifactVersion getArtifactVersions getArtifacts getAvailableResourcesForEnvironment getCatalog getCatalogItem getCatalogItems getCatalogs getCluster getClusters getComponent getComponents getComponentsInApplicationTier getContainer getContainers getCredential getCredentials getDashboard getDashboardVisualizations getDashboards getDatabaseConfiguration getDeployTopology getDeployerApplication getDeployerApplications getDeployerConfiguration getDeployerConfigurations getDeployerService getDeployerServices getDeploymentHistoryItems getDevOpsInsightServerConfiguration getDirectoryProvider getDirectoryProviders getEmailConfig getEmailConfigs getEmailNotifier getEmailNotifiers getEntityChange getEntityChangeDetails getEnvironment getEnvironmentApplications getEnvironmentDeployments getEnvironmentInventory getEnvironmentInventoryItem getEnvironmentInventoryItems getEnvironmentMaps getEnvironmentTemplate getEnvironmentTemplateTier getEnvironmentTemplateTierMaps getEnvironmentTemplateTiers getEnvironmentTemplates getEnvironmentTier getEnvironmentTiers getEnvironmentVariable getEnvironmentVariables getEnvironments getEventSubscription getEventSubscriptions getFormalOutputParameter getFormalOutputParameters getFormalParameter getFormalParameters getFullCredential getGate getGateway getGateways getGroup getGroups getHook getHooks getJobDetails getJobInfo getJobNotes getJobStatus getJobStepDetails getJobStepStatus getJobSummary getJobs getJobsForSchedule getLicense getLicenseUsage getLicenses getManifest getNote getNotes getOutputParameter getOutputParameters getPartialApplicationRevision getPartialServiceRevision getPathToProperty getPipeline getPipelineRuntimeDetails getPipelineRuntimes getPipelineStageRuntimeDeployerTasks getPipelineStageRuntimeTasks getPipelines getPlugin getPlugins getPort getPorts getProcedure getProcedures getProcess getProcessDependencies getProcessStep getProcessSteps getProcesses getProject getProjects getProperties getProperty getPropertyHierarchy getProvisionedEnvironments getRealtimeClusterDetails getRealtimeClusterTopology getRelease getReleaseInventory getReleaseTimelineDetails getReleases getReport getReportObjectAssociation getReportObjectAssociations getReportObjectAttribute getReportObjectAttributes getReportObjectType getReportObjectTypes getReportingFilter getReportingFilters getReports getRepositories getRepository getReservation getReservations getResource getResourcePool getResourcePools getResourcePoolsInEnvironmentTier getResourceTemplate getResourceTemplates getResourceTemplatesInEnvironmentTemplateTier getResourceUsage getResources getResourcesInEnvironmentTemplateTier getResourcesInEnvironmentTier getResourcesInPool getRetrievedArtifacts getRollingDeployPhase getRollingDeployPhases getRunHierarchy getRunSchedules getRuntimeWaitDependencies getSchedule getSchedules getServerInfo getServerStatus getService getServiceClusterMapping getServiceClusterMappings getServiceDependencies getServiceDeploymentDetails getServiceMapDetail getServiceMapDetails getServices getSnapshot getSnapshotEnvironments getSnapshots getStage getStages getState getStateDefinition getStateDefinitions getStates getStep getSteps getSubrelease getSubreleases getTask getTasks getTierMaps getTransition getTransitionDefinition getTransitionDefinitions getTransitions getUser getUsers getUtilityResource getUtilityResources getVersions getWaitDependencies getWaitDependency getWaitingTasks getWidget getWidgetFilterOverride getWidgetFilterOverrides getWidgets getWorkflow getWorkflowDefinition getWorkflowDefinitions getWorkflows getWorkspace getWorkspaces getZone getZones import importLicenseData incrementProperty installPlugin logStatistic login logout modifyAclEntry modifyActualParameter modifyApplication modifyApplicationDependency modifyApplicationServiceMapping modifyApplicationTier modifyArtifact modifyArtifactVersion modifyCatalog modifyCatalogItem modifyCluster modifyComponent modifyContainer modifyCredential modifyDashboard modifyDeployerApplication modifyDeployerConfiguration modifyDeployerService modifyDirectoryProvider modifyEmailConfig modifyEmailNotifier modifyEnvTemplTierResourceTemplMapping modifyEnvironment modifyEnvironmentInventoryItem modifyEnvironmentMap modifyEnvironmentTemplate modifyEnvironmentTemplateTier modifyEnvironmentTemplateTierMap modifyEnvironmentTemplateTierMapping modifyEnvironmentTier modifyEnvironmentVariable modifyEventSubscription modifyFormalOutputParameter modifyFormalParameter modifyGate modifyGateway modifyGroup modifyHook modifyJob modifyJobStep modifyNote modifyPipeline modifyPlugin modifyPort modifyProcedure modifyProcess modifyProcessDependency modifyProcessStep modifyProject modifyProperty modifyRelease modifyReport modifyReportObjectAssociation modifyReportObjectAttribute modifyReportObjectType modifyReportingFilter modifyRepository modifyReservation modifyResource modifyResourcePool modifyResourceTemplate modifyRollingDeployPhase modifySchedule modifyService modifyServiceClusterMapping modifyServiceDependency modifyServiceMapDetail modifySnapshot modifyStage modifyStateDefinition modifyStep modifyTask modifyTierMap modifyTierMapping modifyTransitionDefinition modifyUser modifyUtilityResource modifyWaitDependency modifyWidget modifyWidgetFilterOverride modifyWorkflowDefinition modifyWorkspace modifyZone moveDirectoryProvider moveJobs moveRepository moveStateDefinition moveStep moveTransitionDefinition pingAllResources pingResource promotePlugin provisionCluster provisionEnvironment provisionResourcePool pruneChangeHistory publishArtifactVersion removeComponentFromApplicationTier removeDependentsFromArtifactVersion removeDeployerApplication removeDeployerConfiguration removeDeployerService removeResourceFromEnvironmentTemplateTier removeResourceFromEnvironmentTier removeResourcePoolFromEnvironmentTier removeResourceTemplateFromEnvironmentTemplateTier removeResourcesFromEnvironmentTier removeResourcesFromPool removeSubrelease removeTaskGroup removeUsersFromGroup restartPipelineRun restoreAclInheritance retrieveArtifactVersions retryProcessStep retryTask revert runDiscovery runPipeline runProcedure runProcess runReport runServiceProcess runWorkflow searchEntityChange seedEnvironmentInventory sendEmail sendReportingData setDatabaseConfiguration setDevOpsInsightServerConfiguration setJobName setOutputParameter setProperty setTierResourcePhase shutdownServer startRelease tearDownEnvironment tearDownResource tearDownResourcePool testDirectoryProvider transitionWorkflow uninstallPlugin updateArtifactVersion validateDeployer validateServiceClusterMapping");

  var dsl_attr_keywords = words( "abortStatus abortedBy acl aclEntryId actualEndTime actualParameters actualStartTime advancedMode afterLastRetry agentDrivePath agentState agentUncPath agentUnixPath allowChangePermissions allowCurrentUserToApprove allowExecute allowModify allowRead alwaysRun applicationCount applicationDependencyId applicationDependencyName applicationId applicationName applicationProcessId applicationProjectName applicationTierId applicationTierName applicationTierProjectName applicationTiers approvers artifactCacheDirectory artifactId artifactKey artifactName artifactSource artifactUrl artifactVersion artifactVersionId artifactVersionName artifactVersionNameTemplate artifactVersionState assignedResourceName assignees associatedType attachedParameters attributeDataTypes attributePaths autoDelete autoRetryInProgress batchSize batchSizeType beginDate blackout branchCondition branchConditionName branchConditionType branchType broadcast buildNumber buttonLabel callingState callingStateId canonicalPath catalogId catalogItemCount catalogItemId catalogItemName catalogName cfgMgrPluginDisplayName cfgMgrPluginKey cfgMgrProcedure cfgMgrProjectName cloudProviderPluginDisplayName cloudProviderPluginKey cloudProviderProcedure cloudProviderProjectName clusterCount clusterId clusterName colorCode colorRanges colors combinedStatus command comment completed completionTime completionType complianceStatus componentCount componentId componentName componentProcessId componentRollback condition conditionExpanded configName configurationPluginType container containerCount containerId containerName containerPort containerType counter cpuCount cpuLimit createTime createTimeFormatted credentialName currentRollingDeployIteration dashboardFilterName dashboardId dashboardName defaultCapacity defaultProcess defaultUri defaultValue definition delayUntil deleted denyChangePermissions denyExecute denyModify denyRead dependencyJoinType dependentApplicationName dependentGateType dependentPipelineName dependentProjectName dependentReleaseName dependentServiceName dependentSnapshotName dependentStageName dependentTaskName deployerApplicationId deployerApplicationName deployerApplicationProjectName deployerConfigurationId deployerConfigurationName deployerExpression deployerId deployerName deployerRunType deployerServiceId deployerServiceName deployerServiceProjectName deployerTask deployerTaskCount deployerTaskName deploymentTime description destinations directoryName dslParamForm dslString duration effectiveDate elapsedTime emailConfigId emailNotifierId emailNotifierName enabled endDate enforceDependencies entityRevisionId entityRevisionName entryPoint envTemplateTierMapCount environmentEnabled environmentId environmentInventoryItemId environmentInventoryItemName environmentMapCount environmentMapId environmentMapName environmentName environmentNames environmentProjectName environmentTemplateId environmentTemplateName environmentTemplateProjectName environmentTemplateTierId environmentTemplateTierMapId environmentTemplateTierMapName environmentTemplateTierMappingId environmentTemplateTierMappingName environmentTemplateTierName environmentTemplateTierProjectName environmentTierId environmentTierName environmentTierProjectName environmentVariableId environmentVariableName errorCode errorHandling errorMessage eventSubscriptionId eventSubscriptionName eventType exclusive exclusiveJobId exclusiveJobName exclusiveJobStepId exclusiveJobStepName exclusiveMode exitCode expandable expansionDeferred external failedCount finish flow flowRuntimeStateId flowStateName formalOutputParameterId formalOutputParameterName formalParameterId formalParameterName formattingTemplate gateCondition gateId gateName gateType gatewayDisabled gatewayId gatewayName groupId groupName groupRunType hasDeployerTask headApplicationId headServiceId hookId hookName hookType hostName hostName1 hostName2 hostOS hostPlatform hostType iconUrl ignoreFilter imageName imageVersion index instruction interval intervalUnits job jobId jobName jobNameTemplate jobStepId jobType label lastGoodArtifactVersion lastModifiedBy lastNode lastResourceUsed lastRunTime launchedByUser layout licenseReshareWaitTime licenseWaitTime linkParameters linkTarget liveApplication liveEnvironmentCount liveProcedure liveProcedureStep liveProcess liveProcessStep liveProcessStepId liveProcessStepRevisionId liveProcessStepType liveSchedule local logFileName mailFrom mailHost mailPort mailProtocol mailUser majorMinorPatch manualApproval manualStepApprover maxCapacity memoryLimit memorySize memoryUnit minCapacity misfirePolicy modifyTime monthDays noteDetail noteId noteName notificationEnabled notificationTemplate notificationTemplateName notificationType notifierName operator orderIndex orderingFilter origin outcome outcomeReasonCode outputParameters overlap owner owningProjectName parallel parallelToPrevious parameterCount parameterName parameters parent parentFlowName pathRelativeToOwner performedRetryCount phase phaseExpression pipelineEnabled pipelineId pipelineName pipelineParameters pipelineType plannedEndDate plannedEndTime plannedStartDate plannedStartTime pluginDisplayName pluginKey pluginName pluginProjectName pluginPromoted pluginWizardBased port port1 port2 portId portName postExitCode postLogFileName postProcessor precondition principalName principalType priority procedureId procedureName processCount processDependencyId processId processName processStepId processStepName processStepType processType projectId projectName propertyId propertyName propertySheet propertySheetId providerClusterName providerProjectName provisionProcedure provisioningPluginType proxyCustomization proxyHostName proxyPort proxyProtocol publisherJobId publisherJobName publisherJobStepId qualifier recurrence refComponentCount refComponentId refComponentKey refComponentName refComponentProjectName refServiceId refServiceName refServiceProjectName registryUri releaseExclusive releaseId releaseMode releaseName releaseProjectName releaseStatus reportId reportName reportObjectAssociationCount reportObjectAssociationId reportObjectAttributeCount reportObjectAttributeId reportObjectAttributeName reportObjectTypeId reportObjectTypeName reportProjectName reportingFilterCount reportingFilterId reportingFilterName repositoryDisabled repositoryId repositoryIndex repositoryName repositoryNames required requiredApprovalsCount requiredParameterCount reservationId reservationName reservationRequired reserverName reserverProjectName reserverType resolvedTitle resource resourceAgentState resourceAgentVersion resourceCount resourceDisabled resourceId resourceName resourceName1 resourceName2 resourcePoolCount resourcePoolDisabled resourcePoolId resourcePoolName resourceSource resourceTemplateId resourceTemplateName resourceTemplateProjectName resourceWaitTime retries retryApprovers retryCount retryInterval retryNotificationTemplate retryType revisionId rollbackAppChangeRevision rollbackSnapshot rollbackType rollbackUndeployProcess rollingDeployConfigName rollingDeployEnabled rollingDeployManualStepAssignees rollingDeployManualStepCondition rollingDeployPhaseId rollingDeployPhaseName rollingDeployPhaseType rollingDeployPhases rollingDeployType runAsUser runTime runnable runningTime scheduleDisabled scheduleId scheduleName section selectSpecPath serviceClusterMappingId serviceClusterMappingName serviceCount serviceDependencyId serviceDependencyName serviceId serviceMapDetailId serviceMapDetailName serviceName serviceProjectName shell skipDeploy skipRollbackIfUndeployFails smartDeploy smartRollback smartUndeployEnabled snapshotCount snapshotId snapshotName source sourceFields sourceProcessStepName stageArtifacts stageCount stageId stageName stageSummaryParameters start startTime startable startingStage startingStateName stateDefinitionId stateDefinitionName status stepCount stepIndex stepLimit stepName stopTime storagePattern subErrorHandling subapplication subcomponent subcomponentApplication subcomponentProcess subflow subpipeline subpluginKey subprocedure subprocess subproject subrelease subreleasePipeline subreleasePipelineProject subreleaseSuffix subservice subserviceProcess substartingState subworkflowDefinition subworkflowStartingState supportsConfigurations target targetFields targetProcessStepName targetState taskApprovers taskCount taskEnabled taskId taskName taskProcessType taskSkippable taskType templatePipelineName templatePipelineProjectName tierCount tierMapId tierMapName tierMappingId tierMappingName tierResourceCounts tiermapCount timeLimit timeLimitUnits timeZone timeout title totalParameterCount totalWaitTime tracked transitionDefinitionId transitionDefinitionName trigger triggerType trusted type uri url usageCount useSSL useUtilityResource userDefinedParameterCount userName utilityResourceCount utilityResourceId utilityResourceName validMapping value version versionMismatch visualization visualizationProperties volume volumeMount waitDependencyId waitDependencyName waitForPlannedStartDate waitForTriggeredPipelines waitForTriggeredReleases waitTime waitingForDependency waitingForManualRetry waitingForPlannedStartDate waitingForPrecondition waitingOnManual weekDays widgetCount widgetFilterOverrideCount widgetFilterOverrideId widgetId widgetName workflowDefinitionName workflowName workingDirectory workspaceDisabled workspaceId workspaceName workspaceWaitTime zoneId zoneName" );

  var curPunc;
  function tokenBase(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'") {
      return startString(ch, stream, state);
    }
    if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
      curPunc = ch;
      return null;
    }
    if (/\d/.test(ch)) {
      stream.eatWhile(/[\w\.]/);
      if (stream.eat(/eE/)) { stream.eat(/\+\-/); stream.eatWhile(/\d/); }
      return "number";
    }
    if (ch == "/") {
      if (stream.eat("*")) {
        state.tokenize.push(tokenComment);
        return tokenComment(stream, state);
      }
      if (stream.eat("/")) {
        stream.skipToEnd();
        return "comment";
      }
      if (expectExpression(state.lastToken, false)) {
        return startString(ch, stream, state);
      }
    }
    if (ch == "-" && stream.eat(">")) {
      curPunc = "->";
      return null;
    }
    if (/[+\-*&%=<>!?|\/~]/.test(ch)) {
      stream.eatWhile(/[+\-*&%=<>|~]/);
      return "operator";
    }
    stream.eatWhile(/[\w\$_]/);
    if (ch == "@") { stream.eatWhile(/[\w\$_\.]/); return "meta"; }
    if (state.lastToken == ".") return "property";
    if (stream.eat(":")) { curPunc = "proplabel"; return "property"; }
    var cur = stream.current();
    if (atoms.propertyIsEnumerable(cur)) { return "atom"; }
    if (keywords.propertyIsEnumerable(cur)) {
      if (blockKeywords.propertyIsEnumerable(cur)) curPunc = "newstatement";
      else if (standaloneKeywords.propertyIsEnumerable(cur)) curPunc = "standalone";
      return "keyword";
    }
	
	if (dsl_keywords.propertyIsEnumerable(cur)) { return "dsl"; }
	if (dsl_func_keywords.propertyIsEnumerable(cur)) { return "dslfunc"; }
	if (dsl_attr_keywords.propertyIsEnumerable(cur)) { return "dslattr"; }

    return "variable";
  }
  tokenBase.isBase = true;

  function startString(quote, stream, state) {
    var tripleQuoted = false;
    if (quote != "/" && stream.eat(quote)) {
      if (stream.eat(quote)) tripleQuoted = true;
      else return "string";
    }
    function t(stream, state) {
      var escaped = false, next, end = !tripleQuoted;
      while ((next = stream.next()) != null) {
        if (next == quote && !escaped) {
          if (!tripleQuoted) { break; }
          if (stream.match(quote + quote)) { end = true; break; }
        }
        if (quote == '"' && next == "$" && !escaped && stream.eat("{")) {
          state.tokenize.push(tokenBaseUntilBrace());
          return "string";
        }
        escaped = !escaped && next == "\\";
      }
      if (end) state.tokenize.pop();
      return "string";
    }
    state.tokenize.push(t);
    return t(stream, state);
  }

  function tokenBaseUntilBrace() {
    var depth = 1;
    function t(stream, state) {
      if (stream.peek() == "}") {
        depth--;
        if (depth == 0) {
          state.tokenize.pop();
          return state.tokenize[state.tokenize.length-1](stream, state);
        }
      } else if (stream.peek() == "{") {
        depth++;
      }
      return tokenBase(stream, state);
    }
    t.isBase = true;
    return t;
  }

  function tokenComment(stream, state) {
    var maybeEnd = false, ch;
    while (ch = stream.next()) {
      if (ch == "/" && maybeEnd) {
        state.tokenize.pop();
        break;
      }
      maybeEnd = (ch == "*");
    }
    return "comment";
  }

  function expectExpression(last, newline) {
    return !last || last == "operator" || last == "->" || /[\.\[\{\(,;:]/.test(last) ||
      last == "newstatement" || last == "keyword" || last == "proplabel" ||
      (last == "standalone" && !newline);
  }

  function Context(indented, column, type, align, prev) {
    this.indented = indented;
    this.column = column;
    this.type = type;
    this.align = align;
    this.prev = prev;
  }
  function pushContext(state, col, type) {
    return state.context = new Context(state.indented, col, type, null, state.context);
  }
  function popContext(state) {
    var t = state.context.type;
    if (t == ")" || t == "]" || t == "}")
      state.indented = state.context.indented;
    return state.context = state.context.prev;
  }

  // Interface

  return {
    startState: function(basecolumn) {
      return {
        tokenize: [tokenBase],
        context: new Context((basecolumn || 0) - config.indentUnit, 0, "top", false),
        indented: 0,
        startOfLine: true,
        lastToken: null
      };
    },

    token: function(stream, state) {
      var ctx = state.context;
      if (stream.sol()) {
        if (ctx.align == null) ctx.align = false;
        state.indented = stream.indentation();
        state.startOfLine = true;
        // Automatic semicolon insertion
        if (ctx.type == "statement" && !expectExpression(state.lastToken, true)) {
          popContext(state); ctx = state.context;
        }
      }
      if (stream.eatSpace()) return null;
      curPunc = null;
      var style = state.tokenize[state.tokenize.length-1](stream, state);
      if (style == "comment") return style;
      if (ctx.align == null) ctx.align = true;

      if ((curPunc == ";" || curPunc == ":") && ctx.type == "statement") popContext(state);
      // Handle indentation for {x -> \n ... }
      else if (curPunc == "->" && ctx.type == "statement" && ctx.prev.type == "}") {
        popContext(state);
        state.context.align = false;
      }
      else if (curPunc == "{") pushContext(state, stream.column(), "}");
      else if (curPunc == "[") pushContext(state, stream.column(), "]");
      else if (curPunc == "(") pushContext(state, stream.column(), ")");
      else if (curPunc == "}") {
        while (ctx.type == "statement") ctx = popContext(state);
        if (ctx.type == "}") ctx = popContext(state);
        while (ctx.type == "statement") ctx = popContext(state);
      }
      else if (curPunc == ctx.type) popContext(state);
      else if (ctx.type == "}" || ctx.type == "top" || (ctx.type == "statement" && curPunc == "newstatement"))
        pushContext(state, stream.column(), "statement");
      state.startOfLine = false;
      state.lastToken = curPunc || style;
      return style;
    },

    indent: function(state, textAfter) {
      if (!state.tokenize[state.tokenize.length-1].isBase) return 0;
      var firstChar = textAfter && textAfter.charAt(0), ctx = state.context;
      if (ctx.type == "statement" && !expectExpression(state.lastToken, true)) ctx = ctx.prev;
      var closing = firstChar == ctx.type;
      if (ctx.type == "statement") return ctx.indented + (firstChar == "{" ? 0 : config.indentUnit);
      else if (ctx.align) return ctx.column + (closing ? 0 : 1);
      else return ctx.indented + (closing ? 0 : config.indentUnit);
    },

    electricChars: "{}",
    closeBrackets: {triples: "'\""},
    fold: "brace"
  };
});

CodeMirror.defineMIME("text/x-groovy", "groovy");

});

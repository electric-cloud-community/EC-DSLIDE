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

  var dsl_keywords = words( "acl aclEntry actualParameter application applicationDependency applicationTier artifact artifactVersion catalog catalogItem cluster component container credential dashboard deployerApplication deployerConfiguration deployerService directoryProvider emailConfig emailNotifier environment environmentMap environmentTemplate environmentTemplateTier environmentTemplateTierMap environmentTemplateTierMapping environmentTier environmentVariable formalParameter gate gateway group hook job jobStep license note pipeline plugin port procedure process processDependency processStep project property release report reportObjectAssociation reportObjectAttribute reportObjectType reportingFilter repository reservation resource resourcePool resourceTemplate rollingDeployPhase schedule service serviceClusterMapping serviceClusterMapping serviceDependency serviceMapDetail snapshot stage stateDefinition step task tierMap tierMapping transitionDefinition user widget widgetFilterOverride workflowDefinition workspace zone" );

  var dsl_func_keywords = words( "abortAllJobs abortAllPipelineRuns abortJob abortJobStep abortPipelineRun addComponentToApplicationTier addDependentsToArtifactVersion addResourcePoolToEnvironmentTier addResourcesToEnvironmentTier addResourcesToPool addResourceTemplateToEnvironmentTemplateTier addResourceToEnvironmentTemplateTier addResourceToEnvironmentTier addUsersToGroup attachCredential attachParameter breakAclInheritance changeOwner checkAccess cleanupArtifactCache cleanupRepository clone completeJob completeJobStep completeManualProcessStep completeManualTask completeRelease completeWorkflow copyComponent createAclEntry createActualParameter createApplication createApplicationDependency createApplicationFromDeploymentPackage createApplicationServiceMapping createApplicationTier createArtifact createArtifactVersion createCatalog createCatalogItem createCluster createComponent createContainer createCredential createDashboard createDeployerApplication createDeployerConfiguration createDeployerService createDirectoryProvider createEmailConfig createEmailNotifier createEnvironment createEnvironmentInventoryItem createEnvironmentMap createEnvironmentTemplate createEnvironmentTemplateTier createEnvironmentTemplateTierMap createEnvironmentTemplateTierMapping createEnvironmentTier createEnvironmentVariable createEventSubscription createFormalParameter createGate createGateway createGroup createHook createJob createJobStep createNote createPipeline createPort createProcedure createProcess createProcessDependency createProcessStep createProject createProperty createRelease createReport createReportingFilter createReportObjectAssociation createReportObjectAttribute createReportObjectType createRepository createReservation createResource createResourcePool createResourceTemplate createRollingDeployPhase createSchedule createService createServiceClusterMapping createServiceDependency createServiceMapDetail createSnapshot createStage createStateDefinition createStep createTask createTaskGroup createTierMap createTierMapping createTransitionDefinition createUser createWidget createWidgetFilterOverride createWorkflowDefinition createWorkspace createZone deleteAclEntry deleteActualParameter deleteApplication deleteApplicationDependency deleteApplicationServiceMapping deleteApplicationTier deleteArtifact deleteArtifactVersion deleteCatalog deleteCatalogItem deleteCluster deleteComponent deleteContainer deleteCredential deleteDashboard deleteDirectoryProvider deleteEmailConfig deleteEmailNotifier deleteEnvironment deleteEnvironmentInventoryItem deleteEnvironmentMap deleteEnvironmentTemplate deleteEnvironmentTemplateTier deleteEnvironmentTemplateTierMap deleteEnvironmentTemplateTierMapping deleteEnvironmentTier deleteEnvironmentVariable deleteEventSubscription deleteFormalParameter deleteGate deleteGateway deleteGroup deleteHook deleteJob deleteLicense deleteNote deletePipeline deletePipelineRun deletePlugin deletePort deleteProcedure deleteProcess deleteProcessDependency deleteProcessStep deleteProject deleteProperty deleteRelease deleteReport deleteReportingFilter deleteReportObjectAssociation deleteReportObjectAttribute deleteReportObjectType deleteRepository deleteReservation deleteResource deleteResourcePool deleteResourceTemplate deleteRollingDeployPhase deleteSchedule deleteService deleteServiceClusterMapping deleteServiceDependency deleteServiceMapDetail deleteSnapshot deleteStage deleteStateDefinition deleteStep deleteTask deleteTierMap deleteTierMapping deleteTransitionDefinition deleteUser deleteWidget deleteWidgetFilterOverride deleteWorkflow deleteWorkflowDefinition deleteWorkspace deleteZone describeObject detachCredential detachParameter evalDsl evalScript expandString export exportPlugin generateDsl getAccess getAclEntry getActualParameter getActualParameters getAdminLicense getAllWaitingTasks getApplication getApplicationDependencies getApplications getApplicationServiceMapping getApplicationServiceMappings getApplicationTier getApplicationTiers getApplicationTiersInComponent getArtifact getArtifacts getArtifactVersion getArtifactVersions getAvailableResourcesForEnvironment getCatalog getCatalogItem getCatalogItems getCatalogs getCluster getClusters getComponent getComponents getComponentsInApplicationTier getContainer getContainers getCredential getCredentials getDashboard getDashboards getDashboardVisualizations getDatabaseConfiguration getDeployerApplication getDeployerApplications getDeployerConfiguration getDeployerConfigurations getDeployerService getDeployerServices getDeploymentHistoryItems getDevOpsInsightServerConfiguration getDirectoryProvider getDirectoryProviders getEmailConfig getEmailConfigs getEmailNotifier getEmailNotifiers getEntityChange getEntityChangeDetails getEnvironment getEnvironmentApplications getEnvironmentDeployments getEnvironmentInventory getEnvironmentInventoryItem getEnvironmentInventoryItems getEnvironmentMaps getEnvironments getEnvironmentTemplate getEnvironmentTemplates getEnvironmentTemplateTier getEnvironmentTemplateTierMaps getEnvironmentTemplateTiers getEnvironmentTier getEnvironmentTiers getEnvironmentVariable getEnvironmentVariables getEventSubscription getEventSubscriptions getFormalParameter getFormalParameters getFullCredential getGate getGateway getGateways getGroup getGroups getHook getHooks getJobDetails getJobInfo getJobNotes getJobs getJobsForSchedule getJobStatus getJobStepDetails getJobStepStatus getJobSummary getLicense getLicenses getLicenseUsage getManifest getNote getNotes getPartialApplicationRevision getPartialServiceRevision getPipeline getPipelineRuntimeDetails getPipelineRuntimes getPipelines getPipelineStageRuntimeDeployerTasks getPipelineStageRuntimeTasks getPlugin getPlugins getPort getPorts getProcedure getProcedures getProcess getProcessDependencies getProcesses getProcessStep getProcessSteps getProject getProjects getProperties getProperty getProvisionedEnvironments getRelease getReleaseInventory getReleases getReleaseTimelineDetails getReport getReportingFilter getReportingFilters getReportObjectAssociation getReportObjectAssociations getReportObjectAttribute getReportObjectAttributes getReportObjectType getReportObjectTypes getReports getRepositories getRepository getReservation getReservations getResource getResourcePool getResourcePools getResourcePoolsInEnvironmentTier getResources getResourcesInEnvironmentTemplateTier getResourcesInEnvironmentTier getResourcesInPool getResourceTemplate getResourceTemplates getResourceTemplatesInEnvironmentTemplateTier getResourceUsage getRetrievedArtifacts getRollingDeployPhase getRollingDeployPhases getRunSchedules getSchedule getSchedules getServerInfo getServerStatus getService getServiceClusterMapping getServiceClusterMappings getServiceDependencies getServiceDeploymentDetails getServiceMapDetail getServiceMapDetails getServices getSnapshot getSnapshotEnvironments getSnapshots getStage getStages getState getStateDefinition getStateDefinitions getStates getStep getSteps getTask getTasks getTierMaps getTransition getTransitionDefinition getTransitionDefinitions getTransitions getUser getUsers getVersions getWaitingTasks getWidget getWidgetFilterOverride getWidgetFilterOverrides getWidgets getWorkflow getWorkflowDefinition getWorkflowDefinitions getWorkflows getWorkspace getWorkspaces getZone getZones import importLicenseData incrementProperty installPlugin login logout logStatistic modifyAclEntry modifyActualParameter modifyApplication modifyApplicationDependency modifyApplicationServiceMapping modifyApplicationTier modifyArtifact modifyArtifactVersion modifyCatalog modifyCatalogItem modifyCluster modifyComponent modifyContainer modifyCredential modifyDashboard modifyDeployerApplication modifyDeployerConfiguration modifyDeployerService modifyDirectoryProvider modifyEmailConfig modifyEmailNotifier modifyEnvironment modifyEnvironmentInventoryItem modifyEnvironmentMap modifyEnvironmentTemplate modifyEnvironmentTemplateTier modifyEnvironmentTemplateTierMap modifyEnvironmentTemplateTierMapping modifyEnvironmentTier modifyEnvironmentVariable modifyEnvTemplTierResourceTemplMapping modifyEventSubscription modifyFormalParameter modifyGate modifyGateway modifyGroup modifyHook modifyJob modifyJobStep modifyNote modifyPipeline modifyPlugin modifyPort modifyProcedure modifyProcess modifyProcessDependency modifyProcessStep modifyProject modifyProperty modifyRelease modifyReport modifyReportingFilter modifyReportObjectAssociation modifyReportObjectAttribute modifyReportObjectType modifyRepository modifyReservation modifyResource modifyResourcePool modifyResourceTemplate modifyRollingDeployPhase modifySchedule modifyService modifyServiceClusterMapping modifyServiceDependency modifyServiceMapDetail modifySnapshot modifyStage modifyStateDefinition modifyStep modifyTask modifyTierMap modifyTierMapping modifyTransitionDefinition modifyUser modifyWidget modifyWidgetFilterOverride modifyWorkflowDefinition modifyWorkspace modifyZone moveDirectoryProvider moveJobs moveRepository moveStateDefinition moveStep moveTransitionDefinition pingAllResources pingResource promotePlugin provisionCluster provisionEnvironment provisionResourcePool pruneChangeHistory publishArtifactVersion removeComponentFromApplicationTier removeDependentsFromArtifactVersion removeDeployerApplication removeDeployerConfiguration removeDeployerService removeResourceFromEnvironmentTemplateTier removeResourceFromEnvironmentTier removeResourcePoolFromEnvironmentTier removeResourcesFromEnvironmentTier removeResourcesFromPool removeResourceTemplateFromEnvironmentTemplateTier removeTaskGroup removeUsersFromGroup restartPipelineRun restoreAclInheritance retrieveArtifactVersions retryProcessStep retryTask revert runDiscovery runPipeline runProcedure runProcess runReport runServiceProcess runWorkflow searchEntityChange seedEnvironmentInventory sendEmail sendReportingData setDatabaseConfiguration setDevOpsInsightServerConfiguration setJobName setProperty setTierResourcePhase shutdownServer startRelease tearDownEnvironment tearDownResource tearDownResourcePool testDirectoryProvider transitionWorkflow uninstallPlugin updateArtifactVersion validateDeployer validateServiceClusterMapping");

  var dsl_attr_keywords = words( "action actualParameterName actualParameters addDeployProcess advancedMode afterItem afterLastRetry afterProcedureStep afterProcessStep afterStage afterTask agentDrivePath agentUncPath agentUnixPath allowNestedGroupsApprovers alwaysRun applicationDependencyName applicationEntityRevisionId applicationName applicationProcessName applicationProjectName applicationServiceMappingName applicationTierName approvers artifactCacheDirectory artifactFileName artifactGroup artifactKey artifactName artifactSource artifactUrl artifactVersion artifactVersionName artifactVersionNameTemplate artifactVersionState assignees associatedType attachment attributeDataTypes attributePaths author authorUrl autoDelete batchSize batchSizeType bcc beforeItem beforeProcedureStep beforeProcessStep beforeProviderName beforeRepositoryName beforeStage beforeStateDefinition beforeStep beforeTask beforeTransitionDefinition beginDate blackout block branchCondition branchConditionName branchConditionType branchType broadcast buttonLabel catalogItemName catalogName category cc cfgMgrParameters cfgMgrPluginKey cfgMgrProcedure cfgMgrProjectName changePermissionsPrivilege clearActualParameters clearAttributeDataTypes clearAttributePaths clearColors clearLinkParameters clearPhases clearPipelineParameters clearVisualizationProperties cloneName cloneTaskGroup cloudProviderParameters cloudProviderPluginKey cloudProviderProcedure cloudProviderProjectName clusterName clusterProjectName clusters colorCode colorRanges colors command comment commonGroupNameAttribute completed completionType componentApplicationName componentName componentProjectName componentRollback componentVersions compress condition configName configurationName containerName containerPort containerVersions counter cpuCount cpuLimit credentialName credentialProtected credentials customDatabaseDialect customDatabaseDriver customDatabaseUrl dashboardFilterName dashboardName databaseName databaseType daysToKeep debug defaultCapacity defaultValue definition deleteProcesses dependencyJoinType dependentApplicationName dependentArtifactVersions dependentProjectName dependentServiceName dependentSnapshotName deployerConfigurationName deployerExpression deployerRunType deployerTaskName describe description destinationProject destinations diagnostics disableProjectTracking disableSchedules domainName download dsl dslParamForm dslString duration effectiveDate elasticSearchUrl email emailAttribute emulateRestoreInheritance enabled enableGroups endDate enforceDependencies entityId entityPath entityType entryPoint environmentEnabled environmentMapName environmentName environmentNames environmentProjectName environmentTemplateName environmentTemplateProjectName environmentTemplateTierMapName environmentTemplateTierMappingName environmentTemplateTierName environmentTierName environmentVariableName errorHandling eventType evidence excludeJobs exclusive exclusiveMode executePrivilege exitCode expand expandable expansionDeferred extendedContextSearch extensionVersion external featureName fileName filter filters firstItem firstResult firstTask flowName flowRuntimeId flowRuntimeIds flowRuntimeName flowRuntimeStateId flowRuntimeStateName flowStateName flowTransitionName force forcePruneAll foreground formalParameterName formattingTemplate fromApplicationName fullUserName fullUserNameAttribute gateCondition gateType gatewayDisabled gatewayName groupBase groupId groupMemberAttributes groupMemberFilter groupName groupNameAttribute groupNames groupRunType groupSearchFilter header hookName hookParameters hookType hostName hostName1 hostName2 hostType html iconUrl ignoreFilter ignorePasskeyMismatch ignoreServerMismatch imageName imageVersion includeAll includeArtifactDetail includeCompParameterRef includeDetails includeEntityRevisions includeFormalParameters includePoolUsage includeResourceCount includeResourceDetails includeRetrieverJobs includeRetrieverJobSteps includeTemplateDetails includeTimeslots includeWorkflows incompletePostStages incrementBy inline insertRollingDeployManualStep instruction interval intervalUnits jobId jobNameTemplate jobProperties jobStepId jobStepName jobStepProperties keepOnError key label latest layout licenseData linkParameters linkTarget listenerPort local logFileName logStashUrl mailFrom mailHost mailPort mailProtocol mailUser mailUserPassword managerDn managerPassword maxCapacity maximum maxResults maxRetrievers membershipAttribute membershipFilter memoryLimit memorySize migrateSettings minCapacity misfirePolicy modifiedBy modifyPrivilege monthDays multipartMode name nestedGroupDepthLimit newComponentName newName newOwnerName note noteName notificationEnabled notificationTemplate notificationType notifierName notifyUsersInNestedGroups objectId objectName objectType objectTypeToReturn operator orderByEnvironmentTemplateUsage orderByEnvironmentUsage orderIndex orderingFilter orderStepsByIndex outcome overlap parallel parallelToPrevious parameterName parameters parentPath password passwordRecoveryAllowed path payload phase phaseExpression phases pipelineName pipelineParameters pipelineProjectName plannedEndDate plannedStartDate pluginKey pluginName pluginParameters pluginProjectName pluginWizardBased pools port port1 port2 portName postProcessor precondition preserveId preserveNames preserveSessions principalName principalType priority procedureName procedurePluginKey procedureProjectName processName processStepName processStepType processType productName projectName promoted propertyName propertySheetId propertyType protocol providerClusterName providerName providerProjectName providerType provisionParameters provisionProcedure proxyCustomization proxyHostName proxyPort proxyProtocol raw readPrivilege realm reason recurrence recurrenceEndDate recurse reducedDetailChangeHistory reference referenceComponentName referenceComponentProject registryUri releaseExclusive releaseFlowRuntimeMappings releaseId releaseMode releaseName relocatable removeAllDependentArtifactVersions removeAllUsers removeFromAllGroups reportingFilterName reportName reportObjectAttributeName reportObjectTypeName reportProjectName repositoryDisabled repositoryName repositoryNames required requiredApprovalsCount reservationName reservationRequired reserverTypes resourceCount resourceDisabled resourceName resourceName1 resourceName2 resourceNames resourcePhaseMappings resourcePoolDisabled resourcePoolName resourcePoolNames resourcePoolPhaseMappings resourcePools resourceTemplateName resourceTemplateProjectName restart retrieverJobId retrieverJobStepId retrieveToFolder retryApprovers retryCount retryInterval retryNotificationTemplate retryType revisionNumber rollbackSnapshot rollbackType rollbackUndeployProcess rollingDeployEnabled rollingDeployManualStepAssignees rollingDeployManualStepCondition rollingDeployPhaseName rollingDeployPhases rollingDeployPhaseType rollingDeployType safeMode scheduleDisabled scheduleName searchFields section serverLibraryPath serverStateOnly serviceApplicationName serviceClusterMappingName serviceDependencyName serviceEntityRevisionId serviceMapDetailName serviceName serviceProjectName sessionPassword shell skipDeploy skippable skipRollbackIfUndeployFails smartDeploy smartRollback smartUndeployEnabled snapshotName sortKey sortOrder sourceApplicationName sourceComponentName sourceFields sourceProject sourceProjectName stageArtifacts stageName stagesToRun startable startableOnly startingStage startingState startingStateName startTime stateDefinitionName stateName status stepLimit stepName stopTime storagePattern structureOnly subapplication subcomponent subcomponentApplicationName subcomponentProcess subcontainer subject subpluginKey subport subprocedure subprocess subproject subservice subserviceProcess substartingState subworkflowDefinition subworkflowStartingState supportsConfigurations systemObjectName targetFields targetProcessStepName targetState taskName taskNames taskProcessType taskType testConnection text tierMapName tierMappingName tierMappings tierResourceCounts timeLimit timeLimitUnits timeout timeSince timeUntil timeZone title to toApplicationName tracked transitionDefinitionName transitionName traverseHierarchy trigger trusted type updateFormXml uri url usableOnly useDefaults userBase userName userNameAttribute userNames userSearchFilter userSearchSubtree useSSL validate validationType value version visualization visualizationProperty volume volumeMount waitForDeleteToComplete waitForPlannedStartDate weekDays widgetName withAcls withNotifiers withVersionNumbers workflowDefinitionName workflowName workflowNameTemplate workingDirectory workspaceDisabled workspaceName zoneName" );

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

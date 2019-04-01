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

CodeMirror.defineMode("dsl", function(config) {
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

  var dsl_keywords = words( "acl aclEntry actualParameter application applicationDependency applicationTier artifact artifactVersion catalog catalogItem cluster component container credential dashboard deployerApplication deployerConfiguration deployerService devOpsInsightDataSource directoryProvider emailConfig emailNotifier environment environmentMap environmentTemplate environmentTemplateTier environmentTemplateTierMap environmentTemplateTierMapping environmentTier environmentVariable formalOutputParameter formalParameter gate gateway group hook job jobStep license note persona personaCategory personaPage pipeline plugin port procedure process processDependency processStep project property release report reportObjectAssociation reportObjectAttribute reportObjectType reportingFilter repository reservation resource resourcePool resourceTemplate rollingDeployPhase schedule searchFilter service serviceAccount serviceClusterMapping serviceClusterMapping serviceDependency serviceMapDetail snapshot stage stateDefinition step tag task tierMap tierMapping transitionDefinition user utilityResource waitDependency widget widgetFilterOverride workflowDefinition workspace zone" );

  var dsl_func_keywords = words( "abortAllJobs abortAllPipelineRuns abortJob abortJobStep abortPipelineRun addComponentToApplicationTier addDependentsToArtifactVersion addPersonaDetail addResourcePoolToEnvironmentTier addResourceTemplateToEnvironmentTemplateTier addResourceToEnvironmentTemplateTier addResourceToEnvironmentTier addResourcesToEnvironmentTier addResourcesToPool addSubrelease addUsersToGroup assignPersonaToGroup assignPersonaToUser attachCredential attachParameter breakAclInheritance changeOwner checkAccess cleanupArtifactCache cleanupRepository clone completeJob completeJobStep completeManualProcessStep completeManualTask completeRelease completeRuntimeWaitDependency completeWorkflow copyComponent createAclEntry createActualParameter createApplication createApplicationDependency createApplicationFromDeploymentPackage createApplicationServiceMapping createApplicationTier createArtifact createArtifactVersion createCatalog createCatalogItem createCluster createComponent createContainer createCredential createDashboard createDeployerApplication createDeployerConfiguration createDeployerService createDevOpsInsightDataSource createDirectoryProvider createEmailConfig createEmailNotifier createEnvironment createEnvironmentInventoryItem createEnvironmentMap createEnvironmentTemplate createEnvironmentTemplateTier createEnvironmentTemplateTierMap createEnvironmentTemplateTierMapping createEnvironmentTier createEnvironmentVariable createEventSubscription createFormalOutputParameter createFormalParameter createGate createGateway createGroup createHook createJob createJobStep createKerberosKeytab createKerberosKeytabEntry createNote createPersona createPersonaCategory createPersonaPage createPipeline createPort createProcedure createProcess createProcessDependency createProcessStep createProject createProperty createRelease createReport createReportObjectAssociation createReportObjectAttribute createReportObjectType createReportingFilter createRepository createReservation createResource createResourcePool createResourceTemplate createRollingDeployPhase createSchedule createSearchFilter createService createServiceAccount createServiceClusterMapping createServiceDependency createServiceMapDetail createSession createSnapshot createStage createStateDefinition createStep createTag createTask createTaskGroup createTierMap createTierMapping createTransitionDefinition createUser createUtilityResource createWaitDependency createWidget createWidgetFilterOverride createWorkflowDefinition createWorkspace createZone deleteAclEntry deleteActualParameter deleteApplication deleteApplicationDependency deleteApplicationServiceMapping deleteApplicationTier deleteArtifact deleteArtifactVersion deleteCatalog deleteCatalogItem deleteCluster deleteComponent deleteContainer deleteCredential deleteDashboard deleteDevOpsInsightDataSource deleteDirectoryProvider deleteEmailConfig deleteEmailNotifier deleteEnvironment deleteEnvironmentInventoryItem deleteEnvironmentMap deleteEnvironmentTemplate deleteEnvironmentTemplateTier deleteEnvironmentTemplateTierMap deleteEnvironmentTemplateTierMapping deleteEnvironmentTier deleteEnvironmentVariable deleteEventSubscription deleteFormalOutputParameter deleteFormalParameter deleteGate deleteGateway deleteGroup deleteHook deleteJob deleteKerberosKeytab deleteKerberosKeytabEntry deleteLicense deleteNote deletePersona deletePersonaCategory deletePersonaPage deletePipeline deletePipelineRun deletePlugin deletePort deleteProcedure deleteProcess deleteProcessDependency deleteProcessStep deleteProject deleteProperty deleteRelease deleteReport deleteReportObjectAssociation deleteReportObjectAttribute deleteReportObjectType deleteReportingFilter deleteRepository deleteReservation deleteResource deleteResourcePool deleteResourceTemplate deleteRollingDeployPhase deleteSchedule deleteSearchFilter deleteService deleteServiceAccount deleteServiceClusterMapping deleteServiceDependency deleteServiceMapDetail deleteSession deleteSnapshot deleteStage deleteStateDefinition deleteStep deleteTag deleteTask deleteTierMap deleteTierMapping deleteTransitionDefinition deleteUser deleteUtilityResource deleteWaitDependency deleteWidget deleteWidgetFilterOverride deleteWorkflow deleteWorkflowDefinition deleteWorkspace deleteZone describeObject detachCredential detachParameter doActionOnRealtimeCluster evalDsl evalScript expandString export exportPlugin generateDsl getAccess getAclEntry getActualParameter getActualParameters getAdminLicense getAllWaitingTasks getApplication getApplicationDependencies getApplicationServiceMapping getApplicationServiceMappings getApplicationTier getApplicationTiers getApplicationTiersInComponent getApplications getArtifact getArtifactVersion getArtifactVersions getArtifacts getAvailableResourcesForEnvironment getCatalog getCatalogItem getCatalogItems getCatalogs getCluster getClusters getComponent getComponents getComponentsInApplicationTier getContainer getContainers getCredential getCredentials getDashboard getDashboardVisualizations getDashboards getDatabaseConfiguration getDeployTopology getDeployerApplication getDeployerApplications getDeployerConfiguration getDeployerConfigurations getDeployerService getDeployerServices getDeploymentHistoryItems getDevOpsInsightDataSource getDevOpsInsightDataSources getDevOpsInsightServerConfiguration getDirectoryProvider getDirectoryProviders getEmailConfig getEmailConfigs getEmailNotifier getEmailNotifiers getEntityChange getEntityChangeDetails getEnvironment getEnvironmentApplications getEnvironmentDeployments getEnvironmentInventory getEnvironmentInventoryItem getEnvironmentInventoryItems getEnvironmentMaps getEnvironmentTemplate getEnvironmentTemplateTier getEnvironmentTemplateTierMaps getEnvironmentTemplateTiers getEnvironmentTemplates getEnvironmentTier getEnvironmentTiers getEnvironmentVariable getEnvironmentVariables getEnvironments getEventSubscription getEventSubscriptions getFormalOutputParameter getFormalOutputParameters getFormalParameter getFormalParameters getFullCredential getGate getGateway getGateways getGroup getGroups getHook getHooks getJobDetails getJobInfo getJobNotes getJobStatus getJobStepDetails getJobStepStatus getJobSummary getJobs getJobsForSchedule getKerberosKeytab getKerberosKeytabs getLicense getLicenseUsage getLicenses getManifest getNote getNotes getOutputParameter getOutputParameters getPartialApplicationRevision getPartialServiceRevision getPathToProperty getPersona getPersonaCategories getPersonaCategory getPersonaPage getPersonaPages getPersonas getPipeline getPipelineRuntimeDetails getPipelineRuntimes getPipelineStageRuntimeDeployerTasks getPipelineStageRuntimeTasks getPipelines getPlugin getPlugins getPort getPorts getProcedure getProcedures getProcess getProcessDependencies getProcessStep getProcessSteps getProcesses getProject getProjects getProperties getProperty getPropertyHierarchy getProvisionedEnvironments getRealtimeClusterDetails getRealtimeClusterTopology getRelease getReleaseInventory getReleaseTimelineDetails getReleases getReport getReportObjectAssociation getReportObjectAssociations getReportObjectAttribute getReportObjectAttributeValues getReportObjectAttributes getReportObjectType getReportObjectTypes getReportingFilter getReportingFilters getReports getRepositories getRepository getReservation getReservations getResource getResourcePool getResourcePools getResourcePoolsInEnvironmentTier getResourceTemplate getResourceTemplates getResourceTemplatesInEnvironmentTemplateTier getResourceUsage getResources getResourcesInEnvironmentTemplateTier getResourcesInEnvironmentTier getResourcesInPool getRetrievedArtifacts getRollingDeployPhase getRollingDeployPhases getRunHierarchy getRunSchedules getRuntimeWaitDependencies getSchedule getSchedules getSearchFilter getSearchFilters getServerInfo getServerStatus getService getServiceAccount getServiceAccounts getServiceClusterMapping getServiceClusterMappings getServiceDependencies getServiceDeploymentDetails getServiceMapDetail getServiceMapDetails getServices getSessions getSnapshot getSnapshotEnvironments getSnapshots getSsoConfiguration getStage getStages getState getStateDefinition getStateDefinitions getStates getStep getSteps getSubrelease getSubreleases getTag getTags getTask getTasks getTierMaps getTransition getTransitionDefinition getTransitionDefinitions getTransitions getUser getUsers getUtilityResource getUtilityResources getVersions getWaitDependencies getWaitDependency getWaitingTasks getWidget getWidgetFilterOverride getWidgetFilterOverrides getWidgets getWorkItems getWorkflow getWorkflowDefinition getWorkflowDefinitions getWorkflows getWorkspace getWorkspaces getZone getZones import importLicenseData incrementProperty installPlugin logStatistic login logout modifyAclEntry modifyActualParameter modifyApplication modifyApplicationDependency modifyApplicationServiceMapping modifyApplicationTier modifyArtifact modifyArtifactVersion modifyCatalog modifyCatalogItem modifyCluster modifyComponent modifyContainer modifyCredential modifyDashboard modifyDeployerApplication modifyDeployerConfiguration modifyDeployerService modifyDevOpsInsightDataSource modifyDirectoryProvider modifyEmailConfig modifyEmailNotifier modifyEnvTemplTierResourceTemplMapping modifyEnvironment modifyEnvironmentInventoryItem modifyEnvironmentMap modifyEnvironmentTemplate modifyEnvironmentTemplateTier modifyEnvironmentTemplateTierMap modifyEnvironmentTemplateTierMapping modifyEnvironmentTier modifyEnvironmentVariable modifyEventSubscription modifyFormalOutputParameter modifyFormalParameter modifyGate modifyGateway modifyGroup modifyHook modifyJob modifyJobStep modifyKerberosKeytab modifyNote modifyPersona modifyPersonaCategory modifyPersonaPage modifyPipeline modifyPlugin modifyPort modifyProcedure modifyProcess modifyProcessDependency modifyProcessStep modifyProject modifyProperty modifyRelease modifyReport modifyReportObjectAssociation modifyReportObjectAttribute modifyReportObjectType modifyReportingFilter modifyRepository modifyReservation modifyResource modifyResourcePool modifyResourceTemplate modifyRollingDeployPhase modifySchedule modifySearchFilter modifyService modifyServiceAccount modifyServiceClusterMapping modifyServiceDependency modifyServiceMapDetail modifySession modifySnapshot modifyStage modifyStateDefinition modifyStep modifyTag modifyTask modifyTierMap modifyTierMapping modifyTransitionDefinition modifyUser modifyUtilityResource modifyWaitDependency modifyWidget modifyWidgetFilterOverride modifyWorkflowDefinition modifyWorkspace modifyZone moveDirectoryProvider moveJobs moveRepository moveStateDefinition moveStep moveTransitionDefinition pingAllResources pingResource processWebhook promotePlugin provisionCluster provisionEnvironment provisionResourcePool pruneChangeHistory publishArtifactVersion removeComponentFromApplicationTier removeDependentsFromArtifactVersion removeDeployerApplication removeDeployerConfiguration removeDeployerService removePersonaDetail removeResourceFromEnvironmentTemplateTier removeResourceFromEnvironmentTier removeResourcePoolFromEnvironmentTier removeResourceTemplateFromEnvironmentTemplateTier removeResourcesFromEnvironmentTier removeResourcesFromPool removeSubrelease removeTaskGroup removeUsersFromGroup restartPipelineRun restoreAclInheritance retrieveArtifactVersions retryProcessStep retryTask revert runDiscovery runPipeline runProcedure runProcess runReport runServiceProcess runWorkflow searchEntityChange seedEnvironmentInventory sendEmail sendReportingData setDatabaseConfiguration setDevOpsInsightServerConfiguration setJobName setOutputParameter setPipelineRunName setProperty setSsoConfiguration setTierResourcePhase shutdownServer startRelease tagObject tearDownEnvironment tearDownResource tearDownResourcePool testDirectoryProvider transitionWorkflow unassignPersonaFromGroup unassignPersonaFromUser uninstallPlugin untagObject updateArtifactVersion validateDeployer validateServiceClusterMapping");

  var dsl_attr_keywords = words( "applicationName applicationTierName artifactName artifactVersionName catalogName clusterName componentName configName containerName credentialName dashboardName environmentName environmentTemplateName environmentTemplateTierName environmentTierName flowName flowRuntimeId flowRuntimeName flowRuntimeStateId flowRuntimeStateName flowStateName flowTransitionName gateType gatewayName groupName jobId jobStepId kerberosKeytabName notifierName objectId objectType path pipelineName pluginName procedureName processName processStepName projectName propertySheetId releaseName reportName reportObjectTypeName repositoryName resourceName resourcePoolName resourceTemplateName scheduleName searchFilterName serviceAccountName serviceName snapshotName stageName stateDefinitionName stateName stepName systemObjectName tagName taskName transitionDefinitionName transitionName userName widgetName workflowDefinitionName workflowName workspaceName zoneName principalName principalType changePermissionsPrivilege executePrivilege modifyPrivilege readPrivilege actualParameterName applicationServiceMappingName newName serviceClusterMappingName serviceMapDetailName tierMapName value description applicationDependencyName dependentApplicationName dependentProjectName dependentServiceName dependentSnapshotName effectiveDate artifactKey artifactVersionNameTemplate groupId artifactVersionState dependentArtifactVersions removeAllDependentArtifactVersions version iconUrl catalogItemName afterItem beforeItem buttonLabel dslParamForm dslString endTargetJson firstItem subpluginKey subprocedure subproject useFormalParameter pluginKey pluginProjectName providerClusterName providerProjectName provisionParameters provisionProcedure actualParameters clearActualParameters pluginParameters reference sourceApplicationName sourceComponentName sourceProjectName command cpuCount cpuLimit entryPoint imageName imageVersion memoryLimit memorySize registryUri volumeMount password passwordRecoveryAllowed clearPhases layout phases type afterLastRetry applicationProjectName enforceDependencies errorHandling orderIndex retryApprovers retryCount retryInterval retryNotificationTemplate retryType smartDeploy stageArtifacts deployerConfigurationName deployerTaskName environmentProjectName environmentTemplateProjectName insertRollingDeployManualStep rollingDeployEnabled rollingDeployManualStepAssignees rollingDeployManualStepCondition rollingDeployPhases serviceProjectName skipDeploy devOpsInsightDataSourceName providerName allowNestedGroupsApprovers commonGroupNameAttribute domainName emailAttribute enableGroups fullUserNameAttribute groupBase groupMemberAttributes groupMemberFilter groupNameAttribute groupSearchFilter managerDn managerPassword membershipAttribute membershipFilter nestedGroupDepthLimit notifyUsersInNestedGroups providerType realm traverseHierarchy url useSSL userBase userNameAttribute userSearchFilter userSearchSubtree mailFrom mailHost mailPort mailProtocol mailUser mailUserPassword condition destinations environmentNames eventType formattingTemplate groupNames notificationType userNames environmentEnabled reservationRequired rollingDeployType environmentMapName serviceEntityRevisionId resourceCount resourceNames resourceTemplateProjectName applicationEntityRevisionId tierMappings environmentTemplateTierMapName environmentTemplateTierMappingName batchSize batchSizeType resourcePhaseMappings resourcePoolNames resourcePoolPhaseMappings environmentVariableName formalOutputParameterName formalParameterName checkedValue clearOptions defaultValue dependsOn expansionDeferred label options optionsDsl optionsFromPropertySheet propertyReference propertyReferenceType renderCondition required simpleList uncheckedValue updateFormXml validationDsl precondition gatewayDisabled hostName1 hostName2 port1 port2 resourceName1 resourceName2 clearPersonas migrateSettings personas removeAllUsers hookName broadcast hookParameters hookType procedurePluginKey procedureProjectName destinationProject jobNameTemplate status alwaysRun comment credentials exclusive exclusiveMode external jobStepName logFileName parallel parentPath postProcessor releaseExclusive releaseMode shell timeLimit timeLimitUnits workingDirectory licenseData note noteName personaName clearDetails homePageName isDefault personaDetails personaCategoryName clearPages personaPages personaPageName assigneesForSkipStage disableRestart enabled overrideWorkspace pipelineRunNameTemplate skipStageMode author authorUrl category extensionVersion key pluginWizardBased supportsConfigurations portName containerPort listenerPort protocol subcontainer subport componentApplicationName processType serviceApplicationName smartUndeployEnabled targetProcessStepName branchCondition branchConditionName branchConditionType branchType afterProcessStep assignees beforeProcessStep componentRollback dependencyJoinType emailConfigName includeCompParameterRef instruction notificationEnabled notificationTemplate processStepType rollbackSnapshot rollbackType rollbackUndeployProcess skipRollbackIfUndeployFails smartRollback subcomponent subcomponentApplicationName subcomponentProcess subservice subserviceProcess useUtilityResource utilityResourceName tracked propertyName credentialProtected expandable extendedContextSearch propertyType suppressValueTracking disablePipelineRestart pipelineProjectName plannedEndDate plannedStartDate definition parameters reportObjectTypeForSourceType reportQuery title uri associatedType sourceFields targetFields reportObjectAttributeName displayName enumerationValues sourceType sourceTypeDescription storagePattern reportingFilterName operator parameterName repositoryDisabled reservationName beginDate blackout endDate monthDays overlap recurrence recurrenceEndDate timeZone weekDays artifactCacheDirectory block hostName hostType pools port proxyCustomization proxyHostName proxyPort proxyProtocol repositoryNames resourceDisabled resourcePools stepLimit trusted autoDelete orderingFilter resourcePoolDisabled cfgMgrParameters cfgMgrPluginKey cfgMgrProcedure cfgMgrProjectName cloudProviderParameters cloudProviderPluginKey cloudProviderProcedure cloudProviderProjectName rollingDeployPhaseName phaseExpression rollingDeployPhaseType clearPipelineParameters interval intervalUnits misfirePolicy pipelineParameters priority scheduleDisabled stagesToRun startTime startingStage startingStateName stopTime tierResourceCounts newObjectType searchQuery addDeployProcess defaultCapacity maxCapacity minCapacity volume clusterProjectName serviceDependencyName componentVersions containerVersions afterStage beforeStage colorCode completed completionType duration incompletePostStages parallelToPrevious waitForPlannedStartDate startable substartingState subworkflowDefinition afterProcedureStep beforeProcedureStep advancedMode afterTask approvers beforeTask clearStageSummaryParameters deployerExpression deployerRunType firstTask gateCondition groupRunType keepOnError requiredApprovalsCount skippable stageSummaryParameters subErrorHandling subapplication subpipeline subprocess subrelease subreleasePipeline subreleasePipelineProject subreleaseSuffix subworkflowStartingState taskProcessType taskType triggerType useApproverAcl resourceExpression tierMappingName targetState trigger email fullUserName removeFromAllGroups sessionPassword allowSkip assigneesForSkip dependentGateType dependentPipelineName dependentReleaseName dependentStageName dependentTaskName waitDependencyName waitForTriggeredPipelines waitForTriggeredReleases attributeDataTypes attributePaths clearAttributeDataTypes clearAttributePaths clearColors clearLinkParameters clearVisualizationProperties colorRanges colors linkParameters linkTarget phase reportProjectName section visualization visualizationProperties dashboardFilterName ignoreFilter workflowNameTemplate agentDrivePath agentUncPath agentUnixPath local workspaceDisabled force reason componentProjectName subreleaseName subreleaseProject newOwnerName cloneName cloneTaskGroup disableProjectTracking linkNewPersona reducedDetailChangeHistory unlinkOriginalPersona outcome exitCode action evidence releaseId dependentFlowRuntimeId runtimeWaitDependencyName newComponentName fromApplicationName toApplicationName artifactFileName artifactGroup artifactVersion retrieveToFolder artifactSource artifactUrl content domainServiceUserAccount encryptionKeyTypes kvno servicePrincipalName validateKeytabEntry expirationDate sessionId taskNames foreground waitForDeleteToComplete featureName productName deleteProcesses objectName actionParameters dsl debug describe serverLibraryPath timeout fileName compress download excludeJobs relocatable revisionNumber safeMode withAcls withNotifiers withVersionNumbers emulateRestoreInheritance includeDetails includeEntityRevisions referenceComponentName referenceComponentProject includeRetrieverJobSteps includeRetrieverJobs maxRetrievers retrieverJobId retrieverJobStepId includePoolUsage objectTypeToReturn includeArtifactDetail usableOnly latest entityId entityPath entityType modifiedBy timeSince timeUntil includeResourceDetails orderByEnvironmentTemplateUsage includeTemplateDetails filter includeAll maximum structureOnly jobProperties jobStepProperties orderStepsByIndex firstResult maxResults sortKey sortOrder keytabFile outputParameterName fieldName fieldType format sourceId targetId targetParentId targetParentType targetType excludeGroupPersonas merged flowRuntimeIds filters groupRunNumber stageRunNumber taskRunNumber expand recurse excludeRuntimeDetails releaseFlowRuntimeMappings fromIndex maxValues valueStartsWith includeTimeslots reserverTypes includeResourceCount includeWorkflows diagnostics serverStateOnly includeFormalParameters startableOnly includeApplicationComponents workItemId workflowId validate orderByEnvironmentUsage registerLDAPUser searchFields disableSchedules preserveId preserveNames incrementBy name beforeProviderName sourceProject beforeRepositoryName beforeStateDefinition beforeStep beforeTransitionDefinition httpMethod operationId pluginConfigName webhookHeader webhookPayload webhookUrl promoted clusters daysToKeep batchedDelete forcePruneAll pruneUpgradeObsolete configurationName webhookData dashboardProjectName previewMode startingState applicationProcessName attachment bcc cc header html inline multipartMode raw subject text to payload customDatabaseDialect customDatabaseDriver customDatabaseUrl databaseName databaseType ignorePasskeyMismatch ignoreServerMismatch preserveSessions elasticSearchUrl logStashUrl testConnection enableSsoKerberos restart tags useDefaults validationType" );

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

CodeMirror.defineMIME("text/x-dsl", "dsl");

});

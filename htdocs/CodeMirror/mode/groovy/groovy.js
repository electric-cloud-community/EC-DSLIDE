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

  var dsl_keywords = words( "aclEntry actualParameter application applicationTier artifact artifactVersion component credential directoryProvider emailConfig emailNotifier environment environmentInventoryItem environmentTemplate environmentTemplateTier environmentTemplateTierMap environmentTier eventSubscription formalParameter gateway group hook job jobStep pipeline procedure process processDependency processStep project property release repository resource resourcePool resourceTemplate schedule snapshot stage stateDefinition step task tierMap transitionDefinition user workflowDefinition workspace zone" );

  var dsl_func_keywords = words( "getAccess getAclEntry getActualParameter getActualParameters getAdminLicense getApplication getApplications getApplicationTier getApplicationTiers getApplicationTiersInComponent getArtifact getArtifacts getArtifactVersion getArtifactVersions getAvailableResourcesForEnvironment getComponent getComponents getComponentsInApplicationTier getCredential getCredentials getDatabaseConfiguration getDeploymentHistoryItems getDirectoryProvider getDirectoryProviders getEmailConfig getEmailConfigs getEmailNotifier getEmailNotifiers getEntityChange getEntityChangeDetails getEnvironment getEnvironmentApplications getEnvironmentInventory getEnvironmentInventoryItem getEnvironmentInventoryItems getEnvironments getEnvironmentTemplate getEnvironmentTemplates getEnvironmentTemplateTier getEnvironmentTemplateTierMaps getEnvironmentTemplateTiers getEnvironmentTier getEnvironmentTiers getEventSubscription getEventSubscriptions getFormalParameter getFormalParameters getFullCredential getGateway getGateways getGroup getGroups getHook getHooks getJobDetails getJobInfo getJobNotes getJobs getJobsForSchedule getJobStatus getJobStepDetails getJobStepStatus getJobSummary getLicense getLicenses getLicenseUsage getManifest getPartialApplicationRevision getPipeline getPipelineRuntimeDetails getPipelineRuntimes getPipelines getPipelineStageRuntimeTasks getPlugin getPlugins getProcedure getProcedures getProcess getProcessDependencies getProcesses getProcessStep getProcessSteps getProject getProjects getProperties getProperty getRepositories getRepository getResource getResourcePool getResourcePools getResourcePoolsInEnvironmentTier getResources getResourcesInEnvironmentTemplateTierRetrieve getResourcesInEnvironmentTier getResourcesInPool getResourceTemplate getResourceTemplates getResourceTemplatesInEnvironmentTemplateTierRetrieve getResourceUsage getSchedule getSchedules getServerInfo getServerStatus getSnapshot getSnapshotEnvironments getSnapshots getStage getStages getState getStateDefinition getStateDefinitions getStates getStep getSteps getTask getTasks getTierMaps getTransition getTransitionDefinition getTransitionDefinitions getTransitions getUser getUsers getVersions getWorkflow getWorkflowDefinition getWorkflowDefinitions getWorkflows getWorkspace getWorkspaces getZone getZones getReleaseInventory getReleases completeRelease startRelease" );

  var dsl_attr_keywords = words( "actualParameter afterProcessStep agentDrivePath agentUncPath agentUnixPath alwaysRun applicationEntityRevisionId applicationName applicationProjectName applicationTierName artifactCacheDirectory artifactKey artifactName artifactSource artifactUrl artifactVersion artifactVersionName artifactVersionNameTemplate artifactVersionState author autoDelete beforeProcessStep beforeProviderName beforeRepositoryName beforeStateDefinition beforeTransitionDefinition beginDate block branchCondition branchConditionName branchConditionType branchType broadcast cacheDirectory cfgMgrParameter cfgMgrPluginKey cfgMgrProcedure cfgMgrProjectName changePermissionsPrivilege clearActualParameters cloudProviderParameter cloudProviderPluginKey cloudProviderProcedure cloudProviderProjectName command commonGroupNameAttribute componentApplicationName componentName componentProjectName componentVersion compress condition configName counter credential credentialName customDatabaseDialect customDatabaseDriver customDatabaseUrl databaseName databaseType defaultValue deleteProcesses dependentArtifactVersions description destinationProject destinations diagnostics domainName emailAttribute enableGroups endDate entityId entityPath entityType environmentEnabled environmentName environmentNames environmentTemplateName environmentTemplateTierMapName environmentTemplateTierName environmentTierName errorHandling eventType excludePatterns exclusive exclusiveMode executePrivilege exitCode expand expandable expansionDeferred extendedContextSearch external filters followSymlinks force forcePruneAll foreground formattingTemplate formattingTemplateFile fromDirectory fullUserNameAttribute gatewayDisabled gatewayName groupBase groupId groupMemberAttributes groupMemberFilter groupName groupNameAttribute groupNames groupSearchFilter hostName hostName1 hostName2 hostType ignorePasskeyMismatch ignoreServerMismatch includeArtifactDetail includeCompParameterRef includeDependents includeEntityRevisions includeFormalParameters includePatterns includePoolUsage includeRetrieverJobs includeRetrieverJobSteps includeTemplateDetails includeWorkflows interval intervalUnits jobId jobNameTemplate jobProperties jobStepId jobStepName jobStepProperties keepOnError label latest local logFileName mailFrom mailHost mailPort mailProtocol mailUser mailUserPassword managerDn managerPassword maxRetrievers migrateSettings misfirePolicy modifiedBy modifyPrivilege monthDays newName newOwnerName notificationType notifierName objectId objectTypeToReturn orderByEnvironmentTemplateUsage orderByEnvironmentUsage orderIndex orderingFilter outcome overwrite parallel parentPath password passwordRecoveryAllowed path pluginName pollInterval pools port port1 port2 postProcessor precondition preserveSessions priority procedureName processName processStepName processStepType processType projectName promoted propertySheetId propertyType providerType proxyCustomization proxyHostName proxyPort proxyProtocol readPrivilege realm reason recurse releaseExclusive releaseMode removeAllDependentArtifactVersions removeAllUsers repositoryDisabled repositoryName repositoryNames required resourceDisabled resourceName resourceName1 resourceName2 resourceNames resourcePoolDisabled resourcePoolName resourceTemplateName restart retrieverJobId retrieverJobStepId scheduleDisabled scheduleName serverStateOnly shell snapshotName startable startableOnly startingState startingStateName startTime stateDefinitionName stateName status stepLimit stepName stopTime structureOnly subcomponent subcomponentApplicationName subcomponentProcess subprocedure subproject substartingState subworkflowDefinition systemObjectName targetState tierMapName tierMapping tierResourceCount timeLimit timeLimitUnits timeout timeSince timeUntil timeZone toDirectory tracked transitionDefinitionName transitionName trigger trusted type url usableOnly useDefaults userBase userName userNameAttribute userNames userSearchFilter userSearchSubtree useSSL value valueFile version versionRange weekDays workflowDefinitionName workflowName workflowNameTemplate workingDirectory workspaceDisabled workspaceName zoneName" );

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

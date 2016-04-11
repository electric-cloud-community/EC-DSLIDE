expandString jobId : "job_123", value : '''\
$[/javascript
	var projectList = "";
	var projectsObject = api.getProjects().project;
	for (var project in projectsObject) {
		projectList += projectsObject[project].projectName + "\\n";
	}
	projectList;
]
'''


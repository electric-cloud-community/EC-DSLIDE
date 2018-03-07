expandString value : '''\
$[/javascript
	var apiArgs = {
		maximum: "5",
		filter: "admin*"
	}
	var jsonUsers = api.getUsers(apiArgs);
	//JSON.stringify(jsonUsers.user);
	jsonUsers.user[0].fullUserName
]'''


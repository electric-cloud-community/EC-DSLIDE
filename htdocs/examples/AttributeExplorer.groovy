/*
	Attribute explorer
	
	Use the JavaScript function getKeyPairs() to return all the intrinsic
	properties of a Flow object. Use JavaScript member getter notation
	(.nodeName or ["node name"]) to reference the Flow object. Here are some
	example object paths:
	
		projects.Default
		projects["Electric Cloud"].schedules
		myJob.outputParameters
*/
evalScript jobId : "job_123", value : '''\
  function getKeyPairs(obj)
  {
      var res = [];
      for(var m in obj) {
              res.push(m + ":" + obj[m])
      }
      return res;
  }

getKeyPairs(projects.Default).join("\\n")
'''
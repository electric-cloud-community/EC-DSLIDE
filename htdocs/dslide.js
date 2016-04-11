// Chg history
// 9.24.15 - Set resultWindow to readonly to allow copy (issue 5);
// 10.6.15 - Improved results window output: removed JSON and \n
//         - Added insert procedure step

var minLines = 12;
var startingValue = '';
/*
for (var i = 0; i < minLines; i++) {
	startingValue += '\n';
}
*/

var hotkey = function (e) {
	 if (e.shiftKey) {
		console.log('foo');
		getHelp(getSelection());
	}
};
$(document).keypress(hotkey);

CodeMirror.commands.autocomplete = function(cm) {
	cm.showHint({hint: CodeMirror.hint.anyword});
}
var editor = CodeMirror.fromTextArea(document.getElementById("demotext"), {
  lineNumbers: true,
  gutter: true,
  lineWrapping: true,
  mode: "text/x-groovy",
  extraKeys: {"Ctrl-Space": "autocomplete"},
  onKeyEvent: function(e , s){
		hotkey($.event.fix(e));
  },
  value: startingValue
});

var resultWindow = CodeMirror.fromTextArea(document.getElementById("result"), {
  lineNumbers: false,
  gutter: true,
  lineWrapping: true,
  readOnly: true,
  mode: "text/x-groovy"
});
//resultWindow.setSize( width: 600, height: 150 );

function populateEditor(txt) {
	//var txt = "myText - " + objName;
	//editor.replaceSelection(txt);
	var inchar = editor.findWordAt(editor.getCursor());
	editor.replaceRange(txt, inchar.anchor, inchar.head );

	//format();
}

function format() {
  var totalLines = editor.lineCount();  
  editor.autoFormatRange({line:0, ch:0}, {line:totalLines});
}

function getSelection() {
	console.log ( editor.getSelection());
	return editor.getSelection();
}

function submitDsl() {
  console.log(editor.getValue());
  return editor.getValue();
}

function getTemplate(tempName) {
var templateFile = 'templates/'+tempName+'.tmp';
console.log('Inside gettemplate - TemplateName' + templateFile);
getFile ( templateFile );
}

function getExample(name) {
var fileName = 'examples/'+name+'.groovy';
console.log('getExample' + name);
editor.setValue("");
getFile ( fileName );
}

function getFile(fileName) {
$.ajax(fileName, {
dataType: 'text',
success: function (data) {
console.log('Ajax call was sucessfull');
populateEditor (data);
},
error: function(data, textStatus, errorThrown){
console.log('request failed' +
textStatus + ' errorThrown ' + errorThrown);
}
  }); 
}

function runDsl() {
  var data = { "dsl": editor.getValue() };
  resultWindow.setValue( "Sending DSL:\n" + data["dsl"]);
  //var data = { "dsl": 'return "testing..."' };
  $.ajax({
	type: "POST",
	url: "../../../rest/v1.0/server/dsl",
	dataType: 'Object',
	contentType: 'application/json; charset=utf-8',
	data: JSON.stringify(data),
	success: function (data) {
	  testing = data;
	  console.log(testing);
	  //document.getElementById('result').innerHTML = testing.responseText;
	  resultWindow.setValue( testing.responseText );
	},
	error: function (data, testStatus, errorThrown) {
	  testing = data;
	  console.log(testing);
	  keyname = Object.keys(JSON.parse(testing.responseText))[0];
	  textToShow = JSON.parse(testing.responseText)[keyname];
	  if (keyname == "error") textToShow = textToShow.message;
	  t=typeof(textToShow);
	  //if (t=="[object]" | t!="string") {textToShow=JSON.stringify(textToShow)};
	  if (t=="[object]") {textToShow=JSON.stringify(textToShow,null,'\t')};
	  if (t!="string") {textToShow=JSON.stringify(textToShow,null,'\t')};
	  resultWindow.setValue( textToShow );
	  //resultWindow.setValue( testing.responseText);
	}
  });
}  

function setSelectOptions(list, optionString) {
  var inchar = editor.findWordAt(editor.getCursor());
  var word = editor.getRange(inchar.anchor, inchar.head);
  console.log(optionString+"---"+JSON.stringify(inchar)+"---"+JSON.stringify(word));
   if (optionString.indexOf(word) == 0) list.push(optionString);
}

function getHelp() {
var sel = getSelection();
if (sel){
var data = { "dsl": sel, "describe": "true" };
//var data = { "dsl": "step", "describe": "true" };
$.ajax({
  type: "POST",
  url: "../../../rest/v1.0/server/dsl",
  dataType: 'Object',
  contentType: 'application/json; charset=utf-8',
  data: JSON.stringify(data),
  /*
  success: function (data) {
	testing = data;
	console.log(testing);
  }
  */
success: function (data) {
  testing = data;
  console.log(testing);
  document.getElementById('result').innerHTML = JSON.parse(testing.responseText).value;
  resultWindow.setValue( JSON.parse(testing.responseText).value );
},
error: function (data, testStatus, errorThrown) {
  testing = data;
  console.log(testing);
  resultWindow.setValue( JSON.parse(testing.responseText).value );
}	  
});
} else {
	resultWindow.setValue(`\
Welcome to EF DSL Editor

Enter your DSL commands and press "Submit DSL" to run

Press <ctrl>-SPACE to list available DSL commands
- Type first few letters of command to filter

Use the "Examples" pull down to load sample DSL

Select a DSL command and press ? button to get help on the command

Buttons
- File Open... open a client-side DSL file
- File Save... save a client-side DSL file
- Undo
- Erase results window content
- Format the DSL window
- Help

To insert a subprocedure step, press the "Insert Subprocedure Step" button.  This will populate the "Choose a Project" pull down menu. Choose the procedure project.  This will populate the "Choose a Procedure" pull down menu.  Select the desired procedure. The step template will appear in the editor.
	`);
}
}	
$('#editControls a').click(function (e) {
	switch ($(this).data('role')) {
	 case 'undo':
		console.log($(this).data('role'));
		editor.undo();
		break;
	 case 'fileOpen':
		console.log($(this).data('role'));
		document.getElementById('_loadFile').click();
		break;
	 case 'fileSave':
		console.log($(this).data('role'));
		console.log(editor.getValue());
		save(editor.getValue(), 'dsl.groovy' );
		break;
	 case 'justifyFull':
		console.log($(this).data('role'));
		format();
		break;
	 case 'help':
		console.log($(this).data('role'));
		getHelp();
		break;
	 case 'clear':
		console.log($(this).data('role'));
		resultWindow.setValue( "" );
		break;
	 default:
		console.log($(this).data('role'));
		break;
	}
	//updateEditor();
});

var project = "";
var procedure = "";

function getProjects(){
	// Clean list of earlier entries
	$("#selectProject > option").remove();
	var select = document.getElementById("selectProject");
	var el = document.createElement("option");
	el.textContent = "Choose a Project";
	select.appendChild(el);

	// Get project list
	$.getJSON("../../../rest/v1.0/projects",
	 function() {
				  console.log( "projects success" );
				})
	.done(function(projectResponse) {
		for(var i = 0; i < projectResponse.project.length; i++) {
			var opt;
			if (projectResponse.project[i].pluginKey) {
				opt = "/plugins/" + projectResponse.project[i].pluginKey + "/project";
			} else {
				opt = projectResponse.project[i].projectName;
			}
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			select.appendChild(el);
		}
	})
	  .fail(function() {
		console.log( "project error" );
	  })
	  .always(function() {
		console.log( "project complete" );
	  });   
}

function getProcedures() {
	// Clean list of earlier entries
	$("#selectProcedure > option").remove();
	var select = document.getElementById("selectProcedure");
	var el = document.createElement("option");
	el.textContent = "Choose a Procedure";
	select.appendChild(el);

	var procedures = [];
	$.getJSON("../../../rest/v1.0/projects/"+project+"/procedures",
	 function() {
				  console.log( "procedures success" );
				})
	.done(function(procedureResponse) {
		for (var procIndex in procedureResponse.procedure) {
			procedures.push(procedureResponse.procedure[procIndex].procedureName);
		}
		var select = document.getElementById("selectProcedure");
		for(var i = 0; i < procedures.length; i++) {
			var opt = procedures[i];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			select.appendChild(el);
	}
	  })
	  .fail(function() {
		console.log( "project error" );
	  })
	  .always(function() {
		console.log( "project complete" );
	  });
}

function insertSubprocedure() {
	$.getJSON("../../../rest/v1.0/projects/"+project+"/procedures/"+procedure+"/formalParameters",
	 function() {
				  console.log( "steps success" );
				})
	.done(function(paramResponse) {
		var stepTemplate=""
		stepTemplate += "step \'name\',\n";
		stepTemplate += "  subproject : \'"+project+"\',\n";
		stepTemplate += "  subprocedure : \'"+procedure+"\'";
		
		// Only if parameters present
		if (paramResponse.formalParameter) {
			stepTemplate += ",\n";
			stepTemplate += "  actualParameter : [\n";
			for (var paramIndex in paramResponse.formalParameter) {
				stepTemplate += "    " + paramResponse.formalParameter[paramIndex].formalParameterName +
					": \'" + paramResponse.formalParameter[paramIndex].defaultValue + "\',";
				if (paramResponse.formalParameter[paramIndex].required=="1") {
					stepTemplate +=	"  \/\/ required\n"
				} else {
					stepTemplate +=	"\n"
				}
			}		
			stepTemplate += "  ]\n";
		}
		
		editor.replaceSelection(stepTemplate)
	  })
	  .fail(function() {
		console.log( "project error" );
	  })
	  .always(function() {
		console.log( "project complete" );
	  });
}


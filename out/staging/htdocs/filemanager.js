function save( text, name ) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

function load( event, editor ) {
	var input = event.target;
	var reader = new FileReader();

	reader.onload = function() {
		var text = reader.result;
		editor.setValue(text);
	};

	reader.readAsText(input.files[0]);
}


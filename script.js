/*jslint sloppy: true, vars: true, white: true, browser: true, devel: true */      

function convert2diagram(userinput,sep,box_style) {

  var page_default = {
    "page_width" : "800",
    "page_height" : "600"
  };
  var box_default = {
    "id": "11",
    "value" : "TextValue",
    "parent" : "1",
    "x" : "10",
    "y" : "10",
    "width" : "120",
    "height" : "60",
    "box_style" : "",
    "box_style_geo" : ""
  };
  var linesArray = userinput.split("\n");
  var y = 10;
  var id = 11;
  var box_array = [];


  // ADD HEADER:
  
  box_array.push(tmpl("tpl-page-header", page_default));

  var box_data = box_default;
  
  // ADD BOXES IN LOOP:
  for (var i = 0; i < linesArray.length; i++) {
    //start a line
    box_data["y"] = y; 
    var x = 10;
    // split data into cells 
    var cellsArray = linesArray[i].split(sep);
    for (var j = 0; j < cellsArray.length; j++) {
      //only create boxes with content:
      if (cellsArray[j]) {
        box_data["value"] = cellsArray[j];
        box_data["x"] = x;
        box_data["id"] = id;
        box_data["box_style"] = box_style;
        box_data["box_style_geo"] = box_style;
        id = id + 1;
        var box_content = tmpl("tpl-textbox", box_data);
        box_array.push(box_content);
      };
      //Also advance X if no box was created here:
      x = x + 160; 
    } 
    //next line
    y = y + 100;
  };         

  // ADD FOOTER:
  box_array.push(tmpl("tpl-page-footer", {}))

  // JOIN IT ALL:
  var result = box_array.join("\n");
  
  return result;
}

// Downloadify, see Github Project Page http://github.com/dcneiner/Downloadify 

function load(swfPath,downloadImagePath){

	Downloadify.create('downloadify',{

			filename: function() {
				return document.getElementById('filename').value;
			},

			data: function() { 
        var userinput = document.getElementById('data').value;
        var sep = document.getElementById('sep').value;
        var box_style = document.getElementById('box_style').value;
        //alert(userinput);
        var diagramcode = convert2diagram(userinput,sep,box_style);
        //alert(diagramcode);
				return diagramcode;
			},

			onComplete: function() { alert('Now open a diagram at www.diagram.ly and choose "import" from the "file" menu.'); },
			onCancel: function() { alert('You have cancelled the saving of this file.'); },
			onError: function() { alert('You must put something in the File Contents or there will be nothing to save!'); },

			swf: swfPath,
			downloadImage: downloadImagePath,			
			width: 100,
			height: 30,
			transparent: true,
			append: false
	});
}

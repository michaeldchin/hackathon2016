$(document).ready(function () {
    // JSON cannot be loaded from a local file
    // Hosted the example JSON on a free website
    // $.getJSON("https://api.myjson.com/bins/3ofhy", function(json) {
    $.getJSON("https://api.myjson.com/bins/odwy", function(json) {
        drawTable(json);
    });    


});
$('ul.dropdown-menu li#3ofhy').click(function(e) 
{ 
    console.log(e);
    $.getJSON("https://api.myjson.com/bins/3ofhy", function(json) {
        $('.temprow').remove();
        $('.detail').remove();
        drawTable(json);
    });  
});
$('ul.dropdown-menu li#odwy').click(function(e) 
{ 
    console.log(e);
    $.getJSON("https://api.myjson.com/bins/odwy", function(json) {
        $('.temprow').remove();
        $('.detail').remove();
        drawTable(json);
    });  
});
$('ul.dropdown-menu li#3o056').click(function(e) 
{ 
    console.log(e);
    $.getJSON("https://api.myjson.com/bins/3o056", function(json) {
        $('.temprow').remove();
        $('.detail').remove();
        drawTable(json);
    });  
});


// $("#json-sources li#odwy").ready(function () {
//     $.getJSON("https://api.myjson.com/bins/odwy", function(json) {
//         drawTable(json);
//     });    
// });
// $("#json-sources li#3ofhy").ready(function () { 
//     $.getJSON("https://api.myjson.com/bins/3ofhy", function(json) {
//         drawTable(json);
//     });    
// });
function drawTable(data) {
    var gst_avg_obj = {};
	
    for (var i = 0; i < data.info.length; i++) {
        if (data.info[i].LEVEL_CD == "R" && data.info[i].LEVEL_VALUE == "GST")
		{
            gst_avg_obj.gst_nv_obj_per = data.info[i].RTL_PER_OBJ;
			gst_avg_obj.gst_nv_per_py = data.info[i].PY_PER;
			gst_avg_obj.gst_nv_turn = data.info[i].TURN_RATE;
			gst_avg_obj.gst_ls_pen_per = data.info[i].LEASE_PER;
			gst_avg_obj.gst_tcuv_obj_per = data.info[i].TCUV_PER_OBJ;
		}
    }

    for (var i = 0; i < data.info.length; i++) {

        drawRow(data.info[i], i, gst_avg_obj.gst_nv_obj_per);
        addDetails(data.info[i], i, gst_avg_obj);
    }
}

function drawRow(rowData, num, gst_avg) {
    var row = $("<tr class=\"temprow\"/>");

    $("#dataTable").append(row);
    row.append($("<td><a href='#details_" +num+ "'>" + rowData.ENTITY_NAME + "</a></td>"));
    row.append($("<td id='row_" + num + "'>" + rowData.RTL_PER_OBJ + "</td>"));
 

    // if less than average red
    if(rowData.RTL_PER_OBJ < gst_avg) {
        var colornum = Math.floor((rowData.RTL_PER_OBJ / gst_avg) *255);
        colornum = Math.floor(colornum*(195/255)) + 20;
        $("#row_" + num).css({'background-color': 'rgba(255,'+colornum+','+colornum+',1)'});
    } else if(rowData.RTL_PER_OBJ > gst_avg) { // if greater than average: green
        var colornum = Math.floor((gst_avg / rowData.RTL_PER_OBJ) *255);
        colornum = Math.floor(colornum*(195/255)) + 20;
        $("#row_" + num).css({'background-color': 'rgba('+colornum+',255,'+colornum+',1)'});
    }
    else {
        $("#row_" + num).css({"background-color": "rgba(255,255,255,1)"});
    }
}

function addDetails(rowData, num, gst_avg_object) {

    $("#mainBody").append(
        "<div class='container detail' data-role='page' id='details_" +num+ "'> \
            <h1>" + rowData.ENTITY_NAME + "</h1> <br> \
            <a href='#home' class='btn btn-default btn-block'>Home</a> \
            <div data-role='body' class='row'> \
                <div class='col-xs-6'> \
                    <h2>New Vehicle Sales</h2> \
                        <p>Today: " + rowData.RTL_TODAY_SLS + "</p> \
                        <p>MTD: " + rowData.RTL_MTD_TODAY + "</p> \
                        <p>% GST: " + rowData.RTL_PER_GST + "</p> \
                        <p>Obj: " + rowData.RTL_OBJECTIVE + "</p> \
                        <p>+/-: " + rowData.RTL_OBJ_DELTA + "</p> \
                        <p id='nv-obj-per_" + num + "'>Obj %: " + rowData.RTL_PER_OBJ + "</p> \
                        <p>PGM: " + rowData.PGM_SLS_MTD + "</p> \
                        <p>PY: " + rowData.PREV_RTL_MTD + "</p> \
                        <p id='nv-per-py_" + num + "'>% PY: " + rowData.PY_PER + "</p> \
                        <p id='nv-turn_'" + num + "'>TURN: " + rowData.TURN_RATE + "</p> \
                </div> \
                <div class='col-xs-6'> \
                    <h2>Stock</h2> \
                        <p>2015: " + rowData.STK_PREV + "</p> \
                        <p>2016: " + rowData.STK_CUR + "</p> \
                        <p>2017: " + rowData.STK_NEXT + "</p> \
                        <p>Total: " + rowData.CUR_STK + "</p> \
                </div> \
                <div class='col-xs-6'> \
                    <h2>Lease Sales</h2> \
                        <p>MTD: " + rowData.LEASE_MTD_TODAY + "</p> \
                        <p id='ls-pen-per_" + num + "'>Pen %: " + rowData.LEASE_PER + "</p> \
                </div> \
                <div class='col-xs-6'> \
                    <h2>TCUV Sales</h2> \
                        <p>MTD: " + rowData.TCUV_MTD_TODAY + "</p> \
                        <p>Obj: " + rowData.TCUV_OBJECTIVE + "</p> \
                        <p id='tcuv-obj-per_" + num + "'>Obj %: " + rowData.TCUV_PER_OBJ + "</p> \
                </div> \
            </div> \
        </div>"
    );
	
	if(rowData.RTL_PER_OBJ < gst_avg_object.gst_nv_obj_per)
		$("#nv-obj-per_" + num).css({"color": "#FF0000"});
	if(rowData.PY_PER < gst_avg_object.gst_nv_per_py)
		$("#nv-per-py_" + num).css({"color": "#FF0000"});
	if(rowData.TURN_RATE < gst_avg_object.gst_nv_turn)
		$("#nv-turn_" + num).css({"color": "#FF0000"});
	if(rowData.LEASE_PER < gst_avg_object.gst_ls_pen_per)
		$("#ls-pen-per_" + num).css({"color": "#FF0000"});
	if(rowData.TCUV_PER_OBJ < gst_avg_object.gst_tcuv_obj_per)
		$("#tcuv-obj-per_" + num).css({"color": "#FF0000"});


}


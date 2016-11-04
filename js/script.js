
$(document).ready(function () {
    // JSON cannot be loaded from a local file
    // Hosted the example JSON on a free website
    $.getJSON("https://api.myjson.com/bins/3ofhy", function(json) {
        drawTable(json);
    });    

    function drawTable(data) {

        for (var i = 0; i < data.info.length; i++) {
            drawRow(data.info[i], i);
            addDetails(data.info[i], i);
        }
    }

    function drawRow(rowData, num) {
        var gst_avg = 3.6;
        var row = $("<tr />");

        $("#dataTable").append(row);
        row.append($("<td><a href='#details_" +num+ "'>" + rowData.ENTITY_NAME + "</a></td>"));
        row.append($("<td id='row_" + num + "'>" + rowData.RTL_PER_OBJ + "</td>"));
     

        // if less than average red
        if(rowData.RTL_PER_OBJ < gst_avg) {
            var colornum = Math.floor((rowData.RTL_PER_OBJ / gst_avg) *255);
            console.log(colornum);
            console.log('rgba(255,'+colornum+','+colornum+',1)');
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

    function addDetails(rowData, num) {
        console.log("addDetails " + num);

        $("#mainBody").append(
            "<div class='container' data-role='page' id='details_" +num+ "'> \
                <h1>" + rowData.ENTITY_NAME + "</h1> <br> \
                <a href='#home' class='btn btn-primary btn-block'>Home</a> \
                <div data-role='body' class='row'> \
                    <div class='col-xs-6'> \
                        <h2>New Vehicle Sales</h2> \
                            <p>Today: " + rowData.RTL_TODAY_SLS + "</p> \
                            <p>MTD: " + rowData.RTL_MTD_TODAY + "</p> \
                            <p>% GST: " + rowData.RTL_PER_GST + "</p> \
                            <p>Obj: " + rowData.RTL_OBJECTIVE + "</p> \
                            <p>+/-: " + rowData.RTL_OBJ_DELTA + "</p> \
                            <p>Obj %: " + rowData.RTL_PER_OBJ + "</p> \
                            <p>PGM: " + rowData.PGM_SLS_MTD + "</p> \
                            <p>PY: " + rowData.PREV_RTL_MTD + "</p> \
                            <p>% PY: " + rowData.PY_PER + "</p> \
                            <p>TURN: " + rowData.TURN_RATE + "</p> \
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
                            <p>Pen %: " + rowData.LEASE_PER + "</p> \
                    </div> \
                    <div class='col-xs-6'> \
                        <h2>TCUV Sales</h2> \
                            <p>MTD: " + rowData.TCUV_MTD_TODAY + "</p> \
                            <p>Obj: " + rowData.TCUV_OBJECTIVE + "</p> \
                            <p>Obj %: " + rowData.TCUV_PER_OBJ + "</p> \
                    </div> \
                </div> \
            </div>"
        );


    }

});
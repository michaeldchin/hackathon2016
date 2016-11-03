
$(document).ready(function () {

    // JSON cannot be loaded from a local file
    // Hosted the example JSON on a free website
    $.getJSON("https://api.myjson.com/bins/3ofhy", function(json) {
        drawTable(json); 
    });

    

    function drawTable(data) {
        for (var i = 0; i < data.info.length; i++) {
            drawRow(data.info[i]);
        }
    }

    function drawRow(rowData) {
        var row = $("<tr />")
        $("#dataTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
        row.append($("<td>" + rowData.ENTITY_NAME + "</td>"));
        row.append($("<td>" + rowData.RTL_TODAY_SLS + "</td>"));
        row.append($("<td>" + rowData.RTL_MTD_TODAY + "</td>"));
        row.append($("<td>" + rowData.RTL_PER_GST + "</td>"));
        row.append($("<td>" + rowData.RTL_OBJECTIVE + "</td>"));
        row.append($("<td>" + rowData.RTL_OBJ_DELTA + "</td>"));
        row.append($("<td>" + rowData.RTL_PER_OBJ + "</td>"));
        row.append($("<td>" + rowData.PGM_SLS_MTD + "</td>"));
        row.append($("<td>" + rowData.PREV_RTL_MTD + "</td>"));
        row.append($("<td>" + rowData.PY_PER + "</td>"));
        row.append($("<td>" + rowData.TURN_RATE + "</td>"));
        row.append($("<td>" + rowData.STK_PREV + "</td>"));
        row.append($("<td>" + rowData.STK_CUR + "</td>"));
        row.append($("<td>" + rowData.STK_NEXT + "</td>"));
        row.append($("<td>" + rowData.CUR_STK + "</td>"));
        row.append($("<td>" + rowData.LEASE_MTD_TODAY + "</td>"));
        row.append($("<td>" + rowData.LEASE_PER + "</td>"));
        row.append($("<td>" + rowData.TCUV_MTD_TODAY + "</td>"));
        row.append($("<td>" + rowData.TCUV_OBJECTIVE + "</td>"));
        row.append($("<td>" + rowData.TCUV_PER_OBJ + "</td>"));
    }
});

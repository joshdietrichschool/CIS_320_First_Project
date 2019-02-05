console.log("Hi, this is a test.");

function updateTable() {
    var url = "api/name_list_get";

    $.getJSON(url, null, function resultHandler(result) {
        $('#datatable tbody').html('<tr><td>' + result[0].id + '</td>' +
            '<td>' + result[0].first + '</td>' +
            '<td>' + result[0].last + '</td>' +
            '<td>' + result[0].email + '</td>' +
            '<td>' + result[0].phone + '</td>' +
            '<td>' + result[0].birthday + '</td></tr>');
       for(var i=1; i<result.length; i++) {
           $('#datatable tbody').append('<tr><td>' + result[i].id + '</td>' +
               '<td>' + result[i].first + '</td>' +
               '<td>' + result[i].last + '</td>' +
               '<td>' + result[i].email + '</td>' +
               '<td>' + result[i].phone + '</td>' +
               '<td>' + result[i].birthday + '</td></tr>');
       }
    });
}

updateTable();
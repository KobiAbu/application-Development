$(document).ready(async function () {
    $.ajax({
        url: "/getUserData",
        success: function (response) {
            const header = document.getElementById('personalName');
            header.innerHTML = 'welcome ' + response.userName + " to your personal area"
            var tableBody = $("table tbody");

            response.orders.forEach(function (order) {
                var row = $("<tr>");
                row.append($("<td>").text(order[0]._id));
                console.log(order[0])

                row.append($("<td>").text(order[0].items.length));

                row.append($("<td>").text(order[0].totalAmount));

                tableBody.append(row);
            });
        }
    });

})
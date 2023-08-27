async function getAllItems() {
    const url = 'http://localhost:8082/getItems'
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url,
            contentType: 'application/json',
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}
async function getSpecificItems(list) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: 'http://localhost:8082/search',
            data: JSON.stringify(list),
            contentType: 'application/json',
            success: function (got) {
                console.log(got)
                resolve(got);
            },
            error: function (error) {
                console.log("error");
                reject(error);
            }
        });
    });
}

export { getAllItems, getSpecificItems}
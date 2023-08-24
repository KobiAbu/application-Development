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

export { getAllItems }
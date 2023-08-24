function renderItems(items) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    let currentRow = null;
    items.forEach((item, index) => {
        const image = `assets/img/2.jpeg`;
        const price = item.price;
        const productName = item.productName;

        const col = `
        <div class="col">
            <div><img class="img-thumbnail img-fluid d-block w-100 fit-cover" style="height: 333px;"
                    src="${image}" width="456" height="100" alt="100">
                <div class="py-4">
                    <h4>${productName}</h4>
                    <p>$ ${price}</p><button class="btn btn-primary" type="button">Add to Cart</button>
                </div>
            </div>
        </div>`;

        if (index % 3 === 0) {
            currentRow = document.createElement('div');
            currentRow.classList.add('row', 'gy-4', 'row-cols-1', 'row-cols-md-2', 'row-cols-xl-3');
            container.appendChild(currentRow);
        }

        if (currentRow) {
            currentRow.innerHTML += col;
        }

    })
}

export { renderItems };
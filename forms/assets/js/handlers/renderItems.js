function renderItems(items) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    let currentRow = null;
    
    items.forEach((item, index) => {
        const image = `assets/img/` + item.PhotoFileName;
        const price = item.price;
        const productName = item.productName;
        const productId = item._id;
        console.log(productId) // Get the product ID
        
        const col = `
        <div class="col">
            <div><img class="img-thumbnail img-fluid d-block w-100 fit-cover" style="height: 333px;"
                    src="${image}" width="456" height="100" alt="100">
                <div class="py-4">
                    <h4>${productName}</h4>
                    <p>$ ${price}</p><button class="btn btn-primary add-to-cart-btn" type="button" data-id="${productId}">Add to Cart</button>
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
    });

    // Add event listeners to the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    // Now you have access to the product ID, and you can perform actions like adding the item to the cart
    // For example: Add the item to localStorage, update the UI, etc.
    
    // Retrieve the cart from local storage
        const products = JSON.parse(localStorage.getItem('products'));
        

        // Push the new ID to the cart array
        products.push(productId);

        // Update the cart in local storage
        localStorage.setItem('products', JSON.stringify(products));
}

export { renderItems };

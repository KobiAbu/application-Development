$(document).ready(async function () {
    const products = JSON.parse(localStorage.getItem('products'));
    let total = 0;
    await getProducts(products);

    async function getProducts(products) {
        const cartTable = document.getElementById('cartTable');
        cartTable.innerHTML = '';
        const itemList = []

        // Create an array to store the promises
        const promises = products.map(async product => {
            const url = `http://localhost:8082/getItemById/${product}`;

            try {
                const data = await $.ajax({
                    type: "GET",
                    url,
                    ContentType: "application/json"
                });

                total += data.price;
                itemList.push(data)
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${data.productName}</td>
                    <td class="cart-price">$${data.price.toFixed(2)}</td>
                    <td>1</td> <!-- Quantity placeholder -->
                    <td><button class="remove-btn" data-id="${data._id}">Remove</button></td>`;
                cartTable.appendChild(row);
            } catch (error) {
                console.log(error.responseText);
            }
        });

        // Wait for all promises to resolve
        await Promise.all(promises);
        localStorage.setItem('prdList', JSON.stringify(itemList))
        document.getElementById('total').innerHTML = `Total: $${total.toFixed(2)}`;
        localStorage.setItem('total', JSON.stringify(total))
    }

    // Attach event listeners to "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCartAndUpdate);
    });

    function removeFromCartAndUpdate(event) {
        let flag = false
        const button = event.target;
        const row = button.closest('tr');
        row.remove();
        let arr = [];
        let arr2 = [];
        let products = JSON.parse(localStorage.getItem('products'));
        // products.forEach((product) => {
        //     if (product == button.getAttribute('data-id')&&!flag) {
        //         flag = true
        //     }
        //     else
        //     {
        //         arr.push(product)
        //     }
        // })

        arr = products.filter(product => product === button.getAttribute('data-id'));
        arr2 = products.filter(product => product !== button.getAttribute('data-id'));
        for (let i = 0; i < arr.length - 1; i++) {
            arr2.push(arr[i])
        }
        localStorage.setItem('products', JSON.stringify(arr2));
        updateTotal();
    }

    function updateTotal() {
        let total = 0;
        const prices = document.querySelectorAll('.cart-price');

        prices.forEach(priceElement => {
            total += parseFloat(priceElement.textContent.replace('$', ''));
        });

        const totalElement = document.getElementById('total');
        totalElement.innerHTML = `Total: $${total.toFixed(2)}`;
    }
    const checkout = document.getElementById('checkout');
    checkout.addEventListener('click', function () {

        const items = JSON.parse(localStorage.getItem('prdList'))
        const total = JSON.parse(localStorage.getItem('total'))
        console.log(total)
        if (total > 0) {

            //hard coded change it
            const userName = '64ebba9d462e9deb48fee0e3'
            const url = `http://localhost:8082/getUserById/${userName}`;
            $.ajax({
                url: url,
                success: function (response) {
                    $.ajax({
                        type: "POST",
                        url: "/createOrder",
                        data:
                        {
                            user: response,
                            items: items,
                            totalAmount: total
                        },
                        success: function (response) {
                            const arr = [];
                            localStorage.setItem('products', JSON.stringify(arr));
                            localStorage.setItem('prdList', JSON.stringify(arr));

                            window.location.href = "./success.html";
                            console.log("hey")
                        }
                    });
                }, error: function (xhr, textStatus, errorThrown) {
                    console.log("Error:", xhr.responseText);
                }
            });

        }
        else { alert("your cart is empty") }
    });


});
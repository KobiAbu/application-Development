import { getAllItems, getSpecificItems } from "./ajax/getAllItems.js";
import { renderItems } from "./handlers/renderItems.js";

$(document).ready(async function () {
    const items = await getAllItems();
    localStorage.setItem('items', JSON.stringify(items));
    renderItems(items);

    $('#price-range').change(function (e) {
        e.preventDefault();
        helper()
    });
    $('#gender').change(function (e) {

        e.preventDefault();
        helper()
    });
    $('#type').change(function (e) {

        e.preventDefault();
        helper()
    });
    async function helper() {
        const data = {}
        const priceValue = $('#price-range').val();
        if (priceValue) {
            data.price = parseInt(priceValue)
        }
        const genderValue = $('#gender').val();
        if (genderValue) {
            data.gender = genderValue
        }
        const typeValue = $('#type').val();
        if (typeValue) {
            data.type = typeValue
        }
        const newItems = await getSpecificItems(data);
        console.log(newItems)
        renderItems(newItems)
    }
});

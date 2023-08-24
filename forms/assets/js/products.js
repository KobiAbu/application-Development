import { getAllItems } from "./ajax/getAllItems.js";
import { renderItems } from "./handlers/renderItems.js";

$(document).ready(async function () {
    const items = await getAllItems();
    localStorage.setItem('items', JSON.stringify(items));
    renderItems(items);

    $('#price-range').change(function (e) {
        e.preventDefault();
        console.log(e.target.value)
    });
});

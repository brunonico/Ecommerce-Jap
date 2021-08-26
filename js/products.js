function showProducts(array) {
    let content = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

        content +=
            `<div class="list-group-item list-group-item-action">
                <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name + `</h4>
                        <strong class="text-muted">` + products.cost + " " + products.currency + `</strong>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">` + products.description + `</p>
                    <strong class="text-muted">` + products.soldCount + ` unidades vendidas. </strong> 
                    </div>
                </div>
            </div>
            </div>
            <br>
                `

    }

    document.getElementById("prod-list-container").innerHTML = content;

}

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(data => {
            showProducts(data);
        }
        )
});

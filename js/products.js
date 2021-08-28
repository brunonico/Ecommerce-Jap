let minPrice = undefined;
let maxPrice = undefined;
var productsArray = [];


function showProducts(array) {

    let content = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];


        if (((minPrice == undefined) || (minPrice != undefined && parseInt(products.cost) >= minPrice))
            && ((maxPrice == undefined) || (maxPrice != undefined && parseInt(products.cost) <= maxPrice))) {
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
    }
    document.getElementById("prod-list-container").innerHTML = content;
}



document.getElementById("filter").addEventListener("click", function () {
    minPrice = document.getElementById("minimum").value;
    maxPrice = document.getElementById("maximum").value;

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
        minPrice = parseInt(minPrice);
    }

    else {
        minPrice = undefined;
    }
    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
        maxPrice = parseInt(maxPrice);
    }
    else {
        maxPrice = undefined;
    }
    showProducts(productsArray);
});

document.getElementById("erase").addEventListener("click", function(){
    document.getElementById("minimum").value = "";
    document.getElementById("maximum").value = "";

    minPrice = undefined;
    maxPrice = undefined;

    showProducts(productsArray);
});


document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then((data) => {
            productsArray = data;

            showProducts(productsArray)
        }
        )
});

let minPrice = undefined;
let maxPrice = undefined;

var currentProductsArray = [];
var currentSortCriteriaProducts = undefined;
const ORDER_ASC_BY_PRICE = "^USD";
const ORDER_DESC_BY_PRICE = "USD";
const ORDER_BY_PROD_SALES = "Relevancia.";

let searchProd = undefined;

function sortProducts(criteria, array) {
    let results = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        results = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        results = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SALES) {
        results = array.sort(function (a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });
    }

    return results;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentProductsArray = sortProducts(sortCriteria, productsArray);
    showProducts(currentProductsArray);
}


function showProducts(arreglo) {

    let content = "";
    if (arreglo.length == 0) {
        document.getElementById("prod-list-container").innerHTML = null;
    } else {
        for (let i = 0; i < arreglo.length; i++) {
            let products = arreglo[i];

            if (((minPrice == undefined) || (minPrice != undefined && parseInt(products.cost) >= minPrice))
                && ((maxPrice == undefined) || (maxPrice != undefined && parseInt(products.cost) <= maxPrice))) {

                content +=
                    `<a href= "product-info.html?cost=` + products.cost + `" class="list-group-item list-group-item-action">
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
                    </a>
            <br>
                `
            }

            document.getElementById("prod-list-container").innerHTML = content;
        }
    }
}





document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then((data) => {
            productsArray = data;

            showProducts(productsArray);
        });

    document.getElementById("sortAscPrice").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
    });

    document.getElementById("sortDescPrice").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE, productsArray);
    });

    document.getElementById("sortBySales").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_SALES, productsArray);
    });
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

    document.getElementById("erase").addEventListener("click", function () {
        document.getElementById("minimum").value = "";
        document.getElementById("maximum").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProducts(productsArray);
    });


    document.getElementById("search").addEventListener("keyup", (e) => {
        searchProd = document.getElementById("search").value;

        searched(searchProd, productsArray)

    });

});


function searched(a, b) {
    let newArray = [];
    b.forEach(element => {
        if (element.name.toLowerCase().indexOf(a) != -1 || element.description.toLowerCase().indexOf(a) != -1) {
            newArray.push(element);
        }
    });
    showProducts(newArray);
}
document.addEventListener("DOMContentLoaded", function (e) {
    fetch("https://japdevdep.github.io/ecommerce-api/cart/654.json")
        .then(res => res.json())
        .then(info => {
            let cartArray = info.articles;
            showChart(cartArray)
        })
});


function showChart(cartArray) {

    let cartContent = ``;

    for (let i = 0; i < cartArray.length; i++) {
        let articulo = cartArray[i];
        let convertedValue = conversion(articulo.currency, articulo.unitCost);
        if (getParam() == 1 || getParam() == 1000) {
            cartContent +=
                `<div class="card border bg-light" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4 d-flex flex-wrap align-items-center">
                        <img
                            src="${articulo.src}"
                            alt="..."
                            class="img-thumbnail"
                        />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${articulo.name}</h5>
                                <p class="cartPrice">Precio unitario: ${articulo.currency == 'UYU' ? '$' : 'u$s'} <span class="unitPrice">${articulo.unitCost}</span></p>
                                <p class="card-text"><input class="inputCount" id="count${i}" min="1" type="number" onchange="subtotalCalc(${convertedValue},${i})" value="${articulo.count}"> Cantidad </p>
                                <div class="d-flex w-25 justify-content-between">
                                    <div>Subtotal:$ </div>
                                    <div id="subtotal${i}" class="subtotals" style="font-weight:bold;"> ${convertedValue * articulo.count}</div>
                                </div>
                            <button href="#!" class="btn btn-outline-danger btn-sm deleteButton ">Eliminar</button>
                            </div>                
                        </div>
                    </div>
                </div>`
        }
    }
    $("#kardec").append(cartContent);


    finalCost()
    $(".deleteButton").click(function () {
        $(this).parents(".card").remove();
        finalCost()
    });
}





function conversion(currency, cost) {
    if (currency == 'USD') {
        return cost * 45
    }
    else {
        return cost;
    }
}
$("#shippingText").html($("input:checked").val() + "%");

$(".custom-control-input").change(function () {
    $("#shippingText").html($("input:checked").val() + "%");
    finalCost()
})


function subtotalCalc(unitCost, i) {
    let count = parseInt(document.getElementById(`count${i}`).value);
    let subTot = parseInt(unitCost) * count;
    document.getElementById(`subtotal${i}`).innerHTML = subTot;
    finalCost()
}

function finalCost() {
    let allCartProducts = document.getElementsByClassName("subtotals");
    let total = 0;
    for (let i = 0; i < allCartProducts.length; i++) {
        total += parseInt(allCartProducts[i].innerHTML)
    }
    document.getElementById("productCostText").innerHTML = '$ ' + total;
    let shippingToPay = (total * $("input:checked").val()) / 100;
    let totalToPay = total + shippingToPay;
    $("#totalCostText").html('$ ' + totalToPay);
    $("#amount-container").html('$ ' + totalToPay)
}

function getParam() {
    let actualUrl = window.location.href;
    let urlArray = actualUrl.split("=");
    return urlArray[1];
}

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(CART_BUY_URL)
        .then(rep => rep.json())
        .then(datos => {
            $("#completarCompra").click(function () {
                alert(datos.msg);
                window.location.href = "home.html";
            });
        });
});



function feedingChart() {
    let productAdded = sessionStorage.getItem("newProductAdded");
    let productAddedContent = " ";
    if (productAdded) {
        let productAddedInfo = JSON.parse(productAdded);
        let newProductConverted = conversion(productAddedInfo.newProductCurrency, productAddedInfo.newProductCost)
        productAddedContent = `
        <div class="card border bg-light" style="max-width: 503px;">
            <div class="row g-0">
                <div class="col-md-4 d-flex flex-wrap align-items-center">
                <img
                    src="${productAddedInfo.newProductImgSrc}"
                    alt="..."
                    class="img-thumbnail"
                />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${productAddedInfo.newProductname}</h5>
                        <p class="cartPrice">Precio unitario: ${productAddedInfo.newProductCurrency == 'UYU' ? '$' : 'u$s'} <span class="unitPrice">${productAddedInfo.newProductCost}</span></p>
                        <p class="card-text"><input class="inputCount" id="count5" min="1" type="number" onchange="subtotalCalc(${newProductConverted},5)" value="1"> Cantidad </p>
                        <div class="d-flex w-25 justify-content-between">
                            <div>Subtotal:$ </div>
                            <div id="subtotal5" class="subtotals" style="font-weight:bold;"> ${newProductConverted}</div>
                        </div>
                        <button href="#!" class="btn btn-outline-danger btn-sm anotherDeleteButton ">Eliminar</button>
                    </div>                
                </div>
            </div>
        </div>
        `
        $("#kardec").append(productAddedContent);
        finalCost();
        $(".anotherDeleteButton").click(function () {
            $(this).parents(".card").remove();
            sessionStorage.removeItem("newProductAdded")
            finalCost()
        });
    }
}
feedingChart();

$("#makePayment").on("submit", function() {
    $("#paymentData").html(`<p>¡Datos correctos!</p>`)
})
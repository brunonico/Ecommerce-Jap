document.addEventListener("DOMContentLoaded", function (e) {
    fetch("https://japdevdep.github.io/ecommerce-api/cart/654.json")
        .then(res => res.json())
        .then(info => {
            fetch(PRODUCTS_URL)
                .then(resp => resp.json())
                .then((prodArray) => {
                    let cartArray = info.articles;
                    showChart(cartArray)
                    addProduct(prodArray)
                })
        })
});


function showChart(cartArray) {

    let cartContent = ``;

    for (let i = 0; i < cartArray.length; i++) {
        let articulo = cartArray[i];
        let convertedValue = conversion(articulo.currency, articulo.unitCost);
        if (getParam("id") == 1) {
            cartContent +=
                `
            <div class="card col-md-auto border bg-light">               
                    <div style="min-height: 100px">
                        <img class="img-thumbnail" src="${articulo.src}" alt="Card image cap" width="124px" height="124px">
                    </div>
                    <div class="card-body col-md-7">
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
`
        }
    }
    $("#kardec").append(cartContent);

    
    finalCost()
    $(".deleteButton").click(function () {
        $(this).parents(".card").remove();
        finalCost()
    });
}

function addProduct(array) {
    let newProductadded = "";
    for (let i = 0; i < array.length; i++) {
        let newProduct = array[i];
        let newProductConverted = conversion(newProduct.currency, newProduct.cost);
        if (getParam("id") == newProduct.cost) {
            newProductadded += `
            
            <div class="card col-md-auto border bg-light">               
                    <div style="min-height: 100px">
                        <img class="img-thumbnail" src="${newProduct.imgSrc}" alt="Card image cap" width="124px" height="124px">
                    </div>
                    <div class="card-body col-md-7">
                        <h5 class="card-title">${newProduct.name}</h5>
                        <p class="cartPrice">Precio unitario: ${newProduct.currency == 'UYU' ? '$' : 'u$s'} <span class="unitPrice">${newProduct.cost}</span></p>
                        <p class="card-text"><input class="inputCount" id="count${i+2}" min="1" type="number" onchange="subtotalCalc(${newProductConverted},${i+2})" value="1"> Cantidad </p>
                        <div class="d-flex w-25 justify-content-between">
                            <div>Subtotal:$ </div>
                            <div id="subtotal${i+2}" class="subtotals" style="font-weight:bold;"> ${newProductConverted}</div>
                        </div>
                        <button href="#!" class="btn btn-outline-danger btn-sm deleteButton ">Eliminar</button>
                    </div>                
            </div>`
        }

    }
    $("#kardec").append(newProductadded);
    finalCost();
    
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
}


function getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}




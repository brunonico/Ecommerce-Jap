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
    $("#kardec").append(cartContent);

    $(".deleteButton").click(function () {
        $(this).parents(".card").remove();
        finalCost()
    });
    finalCost()
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






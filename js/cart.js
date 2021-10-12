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

        cartContent +=
            `<div class="card cartCard">      
                <img class="img-thumbnail h-50 w-50" src="${articulo.src}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${articulo.name}</h5>
                    <div class="cartPrice">Precio unitario: ${articulo.currency == 'UYU' ? '$' : 'u$s'} <span class="unitPrice">${articulo.unitCost}</span></div>   
                    <p class="card-text"><input class="inputCount" id="count${i}" type="number" onchange="subtotalCalc(${articulo.unitCost},${i})" value="${articulo.count}"> Cantidad </p>          
                    <div id="subtotal${i}" class="total" style="font-weight:bold;"> ${articulo.currency == 'UYU' ? '$' : 'u$s'} ${articulo.unitCost}</div>
                    <button href="#!" class="deleteButton"><i class="fas fa-minus"></i></button>
                </div>  
            </div>     
`

    }


    $("#kardec").append(cartContent);

    $(".deleteButton").click(function () {
        $(this).parents(".card").remove();
    });
    $(".inputCount").change(function () {
        var actualInput = $(this).val()
        $(".thePrice").replaceWith(actualInput);
    })

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


function subtotalCalc (unitCost, i) {
    let count = parseInt(document.getElementById(`count${i}`).value);

    let subTot = unitCost * count;
    document.getElementById(`subtotal${i}`).innerHTML = subTot;

}
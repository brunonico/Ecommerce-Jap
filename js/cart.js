//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    fetch("https://japdevdep.github.io/ecommerce-api/cart/654.json")
        .then(res => res.json())
        .then(info =>
            showChart(info))
});


function showChart(param) {
    let articulo = param.articles;
    let cartContent = ``;
    let cost=[];
    for (let i = 0; i < articulo.length; i++) {

        cartContent +=
            `<div class="card">      

                <img class="img-thumbnail h-50 w-50" src="${articulo[i].src}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${articulo[i].name}</h5>
                    <p class="card-text"><input class="inputCount" type="number" value="${articulo[i].count}"> Cantidad </p>
                    <div class="cartPrice">${articulo[i].currency == 'UYU' ? '$' : 'u$s'} <span id="thePrice">${articulo[i].unitCost}</span></div>
                    
                    <button href="#!" class="deleteButton"><i class="fas fa-minus"></i></button>
                </div>  
            </div>     
`
        cost.push(articulo[i].unitCost);
    }
    $("#kardec").append(cartContent);
    console.log(cost)
    $(".deleteButton").click(function () {
        $(this).parents(".card").remove();
    });
}

    // $("#productCostText").html($(".subtotal").text());
    // $("#shippingText").html($("input:checked").val() + "%");
    // var shippingCost = ($("input:checked").val() / 100) * parseInt($(".subtotal").text());
    // $("#totalCostText").html(shippingCost + parseInt($(".subtotal").text()))

    // $("#inputCount").change(function () {
    //     var actualInput = $("#inputCount").val() * articulo.unitCost;
    //     let newSubTotal = `<td>${actualInput} ${articulo.currency}</td>`
    //     document.getElementById("subtotal").innerHTML = newSubTotal;
    //     document.getElementById("productCostText").innerHTML = newSubTotal;
    // })


    // $("input").on("click", function () {
    //     $("#shippingText").html($("input:checked").val() + "%");
    //     $("#totalCostText").html(($("input:checked").val() / 100) * parseInt($("#productCostText").text()) + parseInt($("#productCostText").text()))
    // });




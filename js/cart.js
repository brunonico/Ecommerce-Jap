//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(CART_INFO_URL)
        .then(res => res.json())
        .then(info =>
            showChart(info))
});


function showChart(param) {
    let articulo =  param.articles[0];
    
    
    let cartContent= `          
    
    
    <tr>
        <td>${articulo.name}</td>
        <td><img class="d-block w-25 img-thumbnail" id="cartImg" src="${articulo.src}" alt="Card image cap"></td>
        <td><input class="inputCount" type="number" value="${articulo.count}"></td>
        <td>${articulo.unitCost} ${articulo.currency}</td>
        <td>${articulo.unitCost*articulo.count} ${articulo.currency}</td>
        <td><button href="#!" class="btn btn-danger">Borrar item</button></td>
    </tr>`

    $("#cartTable").append(cartContent);




}
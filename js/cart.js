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
    
    $("#cartImg").attr('src',articulo.src);
}
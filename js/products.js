//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProducts(productsArray);
            
        }
    })
}); 

//obtengo el json y lo transformo en un array

function showProducts(productsArray) {

    let content = "";
    for (let i = 0; i < productsArray.length; i++) {
        let products = productsArray[i];
        //itero en ese array para agregarle su contenido a los parámetros del html
        content +=
            `<div class="list-group-item list-group-item-action">
            <div class="row">
            <div class="col-3">
                <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ products.name +`</h4>
                    <strong class="text-muted">` + products.cost + " " + products.currency + `</strong>
                </div>
                <p class="mb-1">` + products.description + `</p>
            </div>
        </div>
        </div>
        <br>
            `


    }

    document.getElementById("prod-list-container").innerHTML = content;

    //utilizando dom, inserto el contenido en la id 
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    fetch(PRODUCTS_URL)
        .then(response => response.json())  // se me guardan los datos en el response y ejecuto response.json, transformando la respuesta a formato json
        .then(data => { //data es el array 

            let content = ""; //string que formará el contenido de la página
            for (let i = 0; i < data.length; i++) {
                let products = data[i]; /* iteramos en el array para sacar los datos que necesitamos y los almacenamos en la variable products. Luego, a partir de ella accederemos a los atributos
                que colocaremos en el html */

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
                    <p class="mb-1">` + products.description + `</p>
                </div>
            </div>
            </div>
            <br>
                `


            }

            document.getElementById("prod-list-container").innerHTML = content; //le asignamos el valor content al id prod-list-container a través de DOM

        })
})




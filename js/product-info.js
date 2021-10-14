let commentArray = [];
let yourName = localStorage.getItem("inputName");
let googleForComment = localStorage.getItem("googleName");
let relatedProductsArray = [];

googleForComment != null ? document.getElementById("yourName").innerHTML = googleForComment : document.getElementById("yourName").innerHTML = yourName;

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



document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCT_INFO_URL)
        .then(response => response.json())
        .then((data) => {
            fetch(PRODUCTS_URL)
                .then(res => res.json())
                .then((dataProd) => {
                    showRelatedProducts(data, dataProd)
                    showInfo(data, dataProd)
                })
        })
});


document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(response => response.json())
        .then((results) => {
            showComments(results)
        })
});


function showInfo(arreglo, arregloProd) {
    var paramProduct = getParam("cost");

    if (paramProduct == 13500) {
        let infoContent = "";

        $("#arrayName").append(arreglo.name);
        $("#arrayCategory").append(arreglo.category)
        $("#carouselActive").attr("src", arreglo.images[0])

        for (let i = 1; i < arreglo.images.length; i++) {
            infoContent += `<div class="carousel-item">
                            <img src="`+ arreglo.images[i] + `" class="d-block w-100" alt="Chevrolet Onix">
                        </div> `
        };

        $(".carousel-inner").append(infoContent);
        $("#arrayDescription").append(arreglo.description);
        $("#arraySoldCount").append(arreglo.soldCount);
        $("#arrayPrice").append("****" + arreglo.cost + " " + arreglo.currency + "****")
        let aTagForAdd = `<a class="fas fa-shopping-cart" href="#" id="addToChart" onclick="addToChartFunction(${arregloProd, arreglo.soldCount})"style="color:black ">Agregar
        al carrito</a> `;
        $("#addToChart").html(aTagForAdd);
    } else {
        for (let i = 1; i < arregloProd.length; i++) {
            if (paramProduct == arregloProd[i].cost) {
                $("#arrayName").append(arregloProd[i].name);
                $("#arrayCategory").append('Autos')
                let oneImage = ` <div id="carrousel-images" class="carousel slide carousel-fade" data-ride="carousel">
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                <img id="carouselActive" src="${arregloProd[i].imgSrc}" class="d-block w-100" alt="${arregloProd[i].name}">
                                                </div>
                                            </div>
                                         </div>`

                document.getElementById("carrousel-images").innerHTML = oneImage;
                $("#arrayDescription").append(arregloProd[i].description);
                $("#arraySoldCount").append(arregloProd[i].soldCount);
                $("#arrayPrice").append("****" + arregloProd[i].cost + " " + arregloProd[i].currency + "****")
                let aTagForAdd = `<a class="fas fa-shopping-cart" href="#" id="addToChart" onclick="addToChartFunction(${arregloProd, arregloProd[i].soldCount})"style="color:black ">Agregar
        al carrito</a> `;
                $("#addToChart").html(aTagForAdd);
            }
        }
    }
}

function showComments(anArray) {
    let commentContent = "";

    anArray.forEach(function (comment) {
        let calification = "";
        commentContent +=
            ` <sub>` + comment.dateTime + `</sub>
              <p class="font-weight-bold">` + comment.user + `</p>
              <p>` + addStars(comment.score, calification) + `</p>
              <p>` + comment.description + `</p> <hr>`;
    });
    document.getElementById("commentContainer").innerHTML = commentContent;
}

$("#sendComment").click(function () {
    let d = new Date();
    let dateOfTheComment = d.getFullYear() + "-" + (d.getMonth() <= 9 ? "0" + d.getMonth() : d.getMonth()) + "-" + (d.getDay() <= 9 ? "0" + d.getDay() : d.getDay()) + " " + (d.getHours() <= 9 ? "0" + d.getHours() : d.getHours()) + ":" + d.getMinutes() + ":" + d.getSeconds();
    let commentary = document.getElementById("commentary").value;
    let commentName = localStorage.getItem("inputName");
    let radioValue = document.querySelector('input[name=stars]:checked');
    radioValue != null ? radioValue = radioValue.value : alert('Publicado sin calificación');

    let commentStars = "";

    let newCommentary = "";
    if (googleForComment != null) {
        newCommentary +=
            ` <sub>` + dateOfTheComment + `</sub>
                <p class="font-weight-bold">` + googleForComment + `</p>
                <p>` + addStars(radioValue, commentStars) + `</p>
                <p>` + commentary + `</p> <hr>`;
    } else {
        newCommentary += ` <sub>` + dateOfTheComment + `</sub>
                         <p class="font-weight-bold">` + commentName + `</p>
                        <p> `+ addStars(radioValue, commentStars) + ` </p>
                        <p>` + commentary + `</p> <hr>`
    };

    if (radioValue != null) {
        $("#addComment").append(newCommentary)
        $("#commentary").val(" ");
    }

})

function addStars(amount, textToAppend) {
    for (let i = 1; i <= amount; i++) {
        textToAppend += `<span class = "fa fa-star checked"></span>`;
    }
    for (let i = amount; i <= 4; i++) {
        textToAppend += `<span class = "fa fa-star"></span>`;
    };
    return textToAppend;
}

function showRelatedProducts(data, dataProd) {
    relatedProductsArray = data.relatedProducts;
    let relatedProduct = "";

    for (let i = 0; i <= dataProd.length; i++) {
        if (relatedProductsArray.includes(i)) {
            relatedProduct =
                `<div class="card">
                      <img class="card-img-top" src="  ${dataProd[i].imgSrc}">
                      <div class="card-body">
                          <h4 class="card-title"> ${dataProd[i].name} </h4>
                          <p class="card-text">${dataProd[i].description}</p>
                          <p class="card-text">USD ${dataProd[i].cost}</p> 
                          <a class="fas fa-shopping-cart" href="cart.html" style="color:black ">Agregar</a> 
                      </div>
                </div> `

            $("#relatedProducts").append(relatedProduct);
        }
    }
}


// export function addToChartFunction(array, value) {
//     window.location.href = "cart.html";
//     let newProductOnChart = ``;
//     for (let i = 0; i < array.length; i++) {
//         let convertedValue = conversion(articulo.currency, articulo.unitCost)
//         if (array[i].cost == value) {
//             newProductOnChart = `
//             <div class="card col-md-auto border bg-light">               
//                     <div style="min-height: 100px">
//                         <img class="img-thumbnail" src="${array[i].imgSrc}" alt="Card image cap" width="124px" height="124px">
//                     </div>
//                     <div class="card-body col-md-7">
//                         <h5 class="card-title">${array[i].name}</h5>
//                         <p class="cartPrice">Precio unitario: ${array[i].currency == 'UYU' ? '$' : 'u$s'} <span class="unitPrice">${value}</span></p>
//                         <p class="card-text"><input class="inputCount" id="count${i + 2}" min="1" type="number" onchange="subtotalCalc(${convertedValue},${i + 2})" value="1"> Cantidad </p>
//                         <div class="d-flex w-25 justify-content-between">
//                             <div>Subtotal:$ </div>
//                             <div id="subtotal${i + 2}" class="subtotals" style="font-weight:bold;"> ${convertedValue}</div>
//                         </div>
//                         <button href="#!" class="btn btn-outline-danger btn-sm deleteButton ">Eliminar</button>
//                     </div>                
//             </div>
// ` ;
//         }
//         $("#kardec").append(newProductOnChart);
//     }
// }

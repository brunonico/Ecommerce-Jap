let commentArray = [];
let yourName = localStorage.getItem("inputName");
let googleForComment = localStorage.getItem("googleName");
let relatedProductsArray = [];

googleForComment != null ? document.getElementById("yourName").innerHTML = googleForComment : document.getElementById("yourName").innerHTML = yourName;

function getParam() {
    let actualUrl = window.location.href;
    let urlArray = actualUrl.split("=");
    return urlArray[1];
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
    var paramProduct = getParam();

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
        let aTagForAdd = `<a class="fas fa-shopping-cart" href="cart.html?id=13500" id="addToChart" style="color:black">Agregar
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
                let aTagForAdd = `<a class="fas fa-shopping-cart" href="cart.html?id=${arregloProd[i].cost}" id="addToChart" style="color:black ">Agregar
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
                          <a class="fas fa-shopping-cart" href="cart.html?id="${dataProd[i].cost}"" style="color:black ">Agregar</a> 
                      </div>
                </div> `

            $("#relatedProducts").append(relatedProduct);
        }
    }
}

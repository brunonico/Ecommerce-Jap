let commentArray = [];
let yourName = localStorage.getItem("inputName");
document.getElementById("yourName").innerHTML = yourName;

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCT_INFO_URL)
        .then(response => response.json())
        .then((data) => {
            showInfo(data)
        })
});
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCT_INFO_COMMENTS_URL)
        .then(response => response.json())
        .then((results) => {
            showComments(results)
        })
});

function showInfo(arreglo) {
    let infoContent = "";

    infoContent += `
    <div class="container-fluid"> 
        <div class="d-flex w-100 justify-content-between">
            <h1>`+ arreglo.name + ` </h1>
            <h1> Categoría <a href="category-info.html">` + arreglo.category + ` </a></h1>
        </div>
        <hr>
        <div style="padding-right: 20rem">
            <div id="carrousel-images" class="carousel slide carousel-fade" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="`+ arreglo.images[0] + `" class="d-block w-100" alt="Chevrolet Onix">
                    </div>
                    <div class="carousel-item">
                        <img src="`+ arreglo.images[1] + `" class="d-block w-100" alt="Chevrolet Onix">
                    </div>
                    <div class="carousel-item">
                        <img src="`+ arreglo.images[2] + `" class="d-block w-100" alt="Chevrolet Onix">
                    </div>
                    <div class="carousel-item">
                        <img src="`+ arreglo.images[3] + `" class="d-block w-100" alt="Chevrolet Onix">
                    </div>
                    <div class="carousel-item">
                        <img src="`+ arreglo.images[4] + `" class="d-block w-100" alt="Chevrolet Onix">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carrousel-images" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Prev</span>
                </a>
                <a class="carousel-control-next" href="#carrousel-images" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>        <br>        <hr>
        <h2><strong>Descripción</strong></h2>        <hr>
        <p>`+ arreglo.description + `</p>
        <h3>`+ arreglo.soldCount + ` unidades vendidas.<h3>
        <p>¡La tuya podría ser la próxima!</p>        <br>
        <div class="alert-success" role="alert">        <br>
        <h2 class="alert-heading text-center">Precio 0km, modelo 2012</h2>
        <p class="text-center">**`+ arreglo.cost + " " + arreglo.currency + `**</p>
        <br>        </div>                </div>

    `  
    document.getElementById("productInfoContainer").innerHTML = infoContent;
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

document.getElementById("sendComment").onclick = function () {
    let d = new Date();
    let dateOfTheComment = d.getFullYear() + "-" + (d.getMonth() <= 9 ? "0" + d.getMonth() : d.getMonth()) + "-" + (d.getDay() <= 9 ? "0" + d.getDay() : d.getDay()) + " " + (d.getHours() <=9 ? "0" + d.getHours():d.getHours()) + ":" + d.getMinutes() + ":" + d.getSeconds();
    let commentary = document.getElementById("commentary").value;
    let commentName = localStorage.getItem("inputName");
    let radioValue = document.querySelector('input[name=stars]:checked');
    radioValue != null ? radioValue = radioValue.value :  alert('Publicado sin calificación');
    
    let commentStars = "";
 
    let newCommentary = "";
    newCommentary = ` <sub>` + dateOfTheComment + `</sub>
    <p class="font-weight-bold">` + commentName + `</p>
    <p> `+  addStars(radioValue, commentStars) +` </p>
    <p>` + commentary + `</p> <hr>
    <div class="col" id="addComment">`
        ;

    document.getElementById("addComment").innerHTML = newCommentary;
    document.getElementById("commentary").value = "";

}

function addStars(amount,textToAppend){
    for (let i = 1; i <= amount; i++) {
        textToAppend += `<span class = "fa fa-star checked"></span>`;
    }
    for (let i = amount; i <= 4; i++) {
        textToAppend += `<span class = "fa fa-star"></span>`;
    } ; 
    return textToAppend;
}

const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}


//acorte lineas en el init js al pasar código al html. Queda más prolijo ya que ahora solamente es necesario insertar uno de los dos nombres guardados.

document.addEventListener("DOMContentLoaded", function (e) {
  let savedName = localStorage.getItem("inputLogin");
  let googleSavedName = localStorage.getItem("googleName");
  let insertName = "";
  console.log(googleSavedName)
  if (googleSavedName != null) {
    insertName = googleSavedName;
  } else {
    if (savedName != null) {
      insertName = savedName;
    } else {
      insertName = "No ha ingresado usuario"
    }
  }
  document.getElementById("dropdownMenuButton").innerHTML = insertName;
  document.getElementById("logout").onclick = function () {
    localStorage.clear();
    sessionStorage.clear();
  }

  let savedImage = localStorage.getItem("image");
  $("#profileImage").attr('src',savedImage)

  if (!savedImage){
    $("#profileImage").attr('src',"img/profile-default.jpg")
    $("#output").attr('src',"img/profile-default.jpg")
  }

});


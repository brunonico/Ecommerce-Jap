
document.addEventListener("DOMContentLoaded", function (e) {

    $("#saveData").click(function () {
        localStorage.removeItem("inputLogin");
        localStorage.setItem("inputLogin", $("#username").val())
        let names = $("#names").val();
        let surnames = $("#surnames").val();
        let inputAddress = $("#inputAddress").val();
        let inputCelular = $("#inputCelular").val();
        let inputEmail = $("#inputEmail").val();
        localStorage.setItem
        localStorage.setItem(userInfo, JSON.stringify({
            names: names,
            surnames: surnames,
            inputAddress: inputAddress,
            inputCelular: inputCelular,
            inputEmail: inputEmail
        }))
    });

    let userInfo = "userInfo";

    let saveDataJson = localStorage.getItem("userInfo");
    if (saveDataJson) {
        let saveUser = JSON.parse(saveDataJson)
        $("#names").val(saveUser.names);
        $("#surnames").val(saveUser.surnames);
        $("#inputAddress").val(saveUser.inputAddress);
        $("#inputCelular").val(saveUser.inputCelular);
        $("#inputEmail").val(saveUser.inputEmail);
    }

    let inputLogin = localStorage.getItem("inputLogin");
    let newName = localStorage.getItem("newUser");
    let newEmail = localStorage.getItem("newEmail")
    if (inputLogin) {
        $("#username").val(inputLogin)
    } if (newName) {
        $("#username").val(newName);
        $("#inputEmail").val(newEmail);
    }


});

var loadFile = function(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);

    image.addEventListener("load",function(){
        var imgCanvas = document.createElement("canvas");
        imgContext = imgCanvas.getContext("2d");
        imgCanvas.width = image.width;
        imgCanvas.height = image.height;

        imgContext.drawImage(image, 0, 0, image.width, image.height);
        var imgAsDataURL = imgCanvas.toDataURL("image/png");

        try {
            localStorage.setItem("image", imgAsDataURL);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    });
  };
  let savedImage = localStorage.getItem("image");
  $("#output").attr('src',savedImage)
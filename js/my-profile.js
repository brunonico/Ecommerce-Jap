
document.addEventListener("DOMContentLoaded", function (e) {

    $("#saveData").click(function () {
        sessionStorage.clear();
        localStorage.setItem("inputLogin", $("#username").val())
        let names = $("#names").val();
        let surnames = $("#surnames").val();
        let inputAddress = $("#inputAddress").val();
        let inputCelular = $("#inputCelular").val();
        let inputEmail = $("#inputEmail").val();
        localStorage.setItem
        sessionStorage.setItem(userInfo, JSON.stringify({
            names: names,
            surnames: surnames,
            inputAddress: inputAddress,
            inputCelular: inputCelular,
            inputEmail: inputEmail
        }))
    });

    let userInfo = "userInfo";

    let saveDataJson = sessionStorage.getItem("userInfo");
    if (saveDataJson) {
        let saveUser = JSON.parse(saveDataJson)
        $("#names").val(saveUser.names);
        $("#surnames").val(saveUser.surnames);
        $("#inputAddress").val(saveUser.inputAddress);
        $("#inputCelular").val(saveUser.inputCelular);
        $("#inputEmail").val(saveUser.inputEmail);
    }

    let inputLogin = localStorage.getItem("inputLogin");
    let newName = sessionStorage.getItem("newUser");
    let newEmail = sessionStorage.getItem("newEmail")
    if (inputLogin) {
        $("#username").val(inputLogin)
    } if (newName) {
        $("#username").val(newName);
        $("#inputEmail").val(newEmail);
    }


});


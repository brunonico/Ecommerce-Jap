
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enterBtn").addEventListener("click", function (e) {

        let inputUser = document.getElementById("username");
        let inputPass = document.getElementById("password");
        let fulFilled = true;


        if (inputUser.value === '' || inputPass.value === '') {
            fulFilled = false;
            alert("Debes ingresar tus datos para continuar.");
        }

        if (fulFilled) {
            window.location = 'home.html';
        }

    });

});

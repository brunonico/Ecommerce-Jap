
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enterBtn").onclick = function () {
        let inputUsername = document.getElementById("inputLogin").value;
        localStorage.setItem("inputLogin", inputUsername);
    }
    document.getElementById("newBtnSubmit").onclick = function () {
        let inputNewUser = document.getElementById("newUser").value;
        localStorage.setItem("newUser", inputNewUser);
        let inputNewEmail = document.getElementById("newEmail").value;
        localStorage.setItem("newEmail", inputNewEmail);
    }
});

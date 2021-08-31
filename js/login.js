
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enterBtn").onclick = function () {
        let name = document.getElementById("inputName").value;
        localStorage.setItem("inputName", name);
    }
    document.getElementById("googleBtn").onclick = function () {
        let nameGoogle = profile.getName();
        localStorage.setItem("profile", nameGoogle);        
    }
});

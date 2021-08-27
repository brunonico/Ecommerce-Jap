
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enterBtn").onclick = function() { 
        let name = document.getElementById("inputName").value;
        sessionStorage.setItem ("inputName", name)
    }
});

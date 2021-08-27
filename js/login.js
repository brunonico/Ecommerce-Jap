
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("enterBtn").onclick = function() { 
        let name = document.getElementById("inputName").value;
        localStorage.setItem ("inputName", name)
    }
});

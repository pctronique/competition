function loadConfig() {
    document.getElementById("checkBlur").checked = tabIsBlur();
}

function addBtConfig() {
    document.getElementById("valider").addEventListener("click", function(e) {
        configTab.blur = document.getElementById("checkBlur").checked ? 1 : 0;
        saveLocalSGBD();
    });
    document.getElementById("annuler").addEventListener("click", function(e) {
        loadConfig();
    });
}

function config() {
    if ("id" in sessionTab) {
        if(sessionTab.roleId == 2) {
            fetch_txt("./templates/config.html").then(function (response) {
                document.getElementById("def_body").innerHTML = response;
                loadConfig();
                addBtConfig();
            });
        } else {
            window.location.href = "./";
        }
    } else {
        window.location.href = "./../?ind=conn";
    }
}
function config() {
    if ("id" in sessionTab) {
        if(sessionTab.roleId == 2) {
            fetch_txt("./templates/config.html").then(function (response) {
            document.getElementById("def_body").innerHTML = response;
            });
        } else {
            window.location.href = "./";
        }
    } else {
        window.location.href = "./../?ind=conn";
    }
  }
function modifierMenu() {
    /*if("id" in sessionTab) {
        let insc = document.getElementById("session-insc-admin");
        let conn = document.getElementById("session-conn-deconn");
        insc.href = "./admin_game";
        insc.innerHTML = "admin";
        conn.href = "./?ind=decon";
        conn.innerHTML = "déconnexion";
    }*/
}

function menu() {
    fetch_txt('./templates/menu.html').then(function(response) {
        document.getElementById("def_menu").innerHTML = response;
        modifierMenu();
    });
}
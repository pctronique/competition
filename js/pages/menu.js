function modifierMenu() {
  if ("id" in sessionTab) {
    let insc = document.getElementById("session-insc-admin");
    let conn = document.getElementById("session-conn-deconn");
    insc.href = "./admin_game";
    insc.innerHTML = '<i class="bi bi-wallet-fill"></i>admin';
    conn.href = "./?ind=decon";
    conn.innerHTML = '<i class="bi bi-unlock-fill"></i>déconnexion';
  }
}

function menu() {
  fetch_txt("./templates/menu.html").then(function (response) {
    document.getElementById("def_menu").innerHTML = response;
    modifierMenu();
  });
}

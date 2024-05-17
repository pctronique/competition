function modifierMenu() {
  if ("id" in sessionTab) {
    let insc = document.getElementById("session-insc-admin");
    let conn = document.getElementById("session-conn-deconn");
    let insc0 = document.getElementById("session-insc-admin-0");
    let conn0 = document.getElementById("session-conn-deconn-0");
    insc.href = "./admin_game";
    insc.innerHTML = '<i class="bi bi-wallet-fill"></i>admin';
    conn.href = "./?ind=decon";
    conn.innerHTML = '<i class="bi bi-unlock-fill"></i>déconnexion';
    insc0.href = "./admin_game";
    insc0.innerHTML = '<i class="bi bi-wallet-fill"></i>admin';
    conn0.href = "./?ind=decon";
    conn0.innerHTML = '<i class="bi bi-unlock-fill"></i>déconnexion';
  }
}

function menu() {
  fetch_txt("./templates/menu.html").then(function (response) {
    document.getElementById("def_menu").innerHTML = response;
    modifierMenu();
  });
}

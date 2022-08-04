function modifierMenu() {
  if (sessionTab.roleId == 2) {
    document.querySelectorAll(".for-admin").forEach((element) => {
      element.style.display = "flex";
    });
  }
}

function menu() {
  if ("id" in sessionTab) {
    fetch_txt("./templates/menu.html").then(function (response) {
      document.getElementById("def_menu").innerHTML = response;
      modifierMenu();
    });
  } else {
    window.location.href = "./../?ind=conn";
  }
}

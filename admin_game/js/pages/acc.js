function acc() {
  if ("id" in sessionTab) {
    fetch_txt("./templates/acc.html").then(function (response) {
      document.getElementById("def_body").innerHTML = response;
      if (sessionTab.roleId == 2) {
        document.querySelectorAll(".for-admin").forEach((element) => {
          element.style.display = "flex";
        });
      }
    });
  } else {
    window.location.href = "./../?ind=conn";
  }
}

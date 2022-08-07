function footer() {
    fetch_txt("./templates/footer.html").then(function (response) {
      document.getElementById("def_footer").innerHTML = response;
      modifierMenu();
    });
}
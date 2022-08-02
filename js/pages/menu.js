function menu() {
    fetch_txt('./pages/menu.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
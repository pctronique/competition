function connexion() {
    fetch_txt('./pages/connexion.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
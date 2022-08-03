function acc() {
    fetch_txt('./pages/acc.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
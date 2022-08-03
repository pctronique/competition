function acc() {
    fetch_txt('./templates/acc.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
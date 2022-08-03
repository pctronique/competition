function information() {
    fetch_txt('./templates/information.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
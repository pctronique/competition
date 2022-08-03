function users() {
    fetch_txt('./pages/users.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
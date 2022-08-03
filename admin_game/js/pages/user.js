function user() {
    fetch_txt('./pages/user.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
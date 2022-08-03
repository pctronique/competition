function user() {
    fetch_txt('./templates/user.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
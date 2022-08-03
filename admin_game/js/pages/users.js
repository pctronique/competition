function users() {
    fetch_txt('./templates/users.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
    });
}
function acc() {
    if("id" in sessionTab) {
        fetch_txt('./templates/acc.html').then(function(response) {
            document.getElementById("def_body").innerHTML = response;
        });
    } else {
        window.location.href = './../?ind=conn';
    }
}
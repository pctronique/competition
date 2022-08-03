function user() {
    if("id" in sessionTab) {
        fetch_txt('./templates/user.html').then(function(response) {
            document.getElementById("def_body").innerHTML = response;
            document.getElementById('floatingInputLogin').value = sessionTab.speudo;
        });
    } else {
        window.location.href = './../?ind=conn';
    }
}
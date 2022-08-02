function urlGetName(name) {
    var url = new URL(document.location.href);
    return url.searchParams.get(name);
}

let indexPg = urlGetName("ind");
document.getElementById("def_body").innerHTML = "";
if(indexPg != undefined && indexPg.trim() != "") {
    if(indexPg == "insc") {
        menu();
        inscription();
    } else if(indexPg == "conn") {
        connexion();
    } else {
        menu();
        acc();
    }
} else {
    menu();
    acc();
}
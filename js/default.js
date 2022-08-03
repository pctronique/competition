let indexPg = urlGetName("ind");
document.getElementById("def_menu").innerHTML = "";
document.getElementById("def_body").innerHTML = "";
if(indexPg != undefined && indexPg.trim() != "") {
    if(indexPg == "insc") {
        menu();
        inscription();
    } else if(indexPg == "conn") {
        menu();
        connexion();
    } else if(indexPg == "decon") {
        deconnexion();
    } else if(indexPg == "info") {
        menu();
        information();
    } else {
        menu();
        acc();
    }
} else {
    menu();
    acc();
}
let indexPg = urlGetName("ind");
document.getElementById("def_body").innerHTML = "";
if(indexPg != undefined && indexPg.trim() != "") {
    if(indexPg == "insc") {
        menu();
        inscription();
    } else if(indexPg == "conn") {
        connexion();
    } else if(indexPg == "decon") {
        deconnexion();
    } else  {
        menu();
        acc();
    }
} else {
    menu();
    acc();
}
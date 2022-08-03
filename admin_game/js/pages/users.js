function addRowUsers(user) {
    return '<tr id="annuaire_'+user.id+'">'+
    '<td>'+user.speudo+'</td>'+
    '<td></td>'+
    '<td></td>'+
    '<td><img src="./img/icons8-modifier.svg" class="modif" alt="modifier" /></th>'+
    '<td><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>'+
    '</tr>';
}

function loadlistUsers() {
    document.getElementById('list_users').innerHTML = "";
    let tabReverse = gameTab.reverse();
    tabReverse.forEach(element => {
        document.getElementById('list_users').innerHTML += addRowConcours(element);
    });
    addEventAll();
}

function users() {
    if("id" in sessionTab) {
        fetch_txt('./templates/users.html').then(function(response) {
            document.getElementById("def_body").innerHTML = response;
        });
    } else {
        window.location.href = './../?ind=conn';
    }
}
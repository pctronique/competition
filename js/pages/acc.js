function displayCard(game) {
    return '<div class="card" style="width: 18rem;">'+
                '<img src="'+game.image+'" class="card-img-top" alt="...">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">'+game.name+'</h5>'+
                    '<p class="card-text">'+game.description+'</p>'+
                    '<a href="./?ind=info&id='+game.id+'" class="btn btn-primary">Go somewhere</a>'+
                '</div>'+
            '</div>';

}

function displayAllCard() {
    let sectionCard = document.getElementById('list-concours');
    sectionCard.innerHTML = "";
    gameTab.forEach(element => {
        sectionCard.innerHTML += displayCard(element);
    });
}

function activeBtAcc() {
    document.querySelectorAll(".btConcours").forEach(element => {
        
    });
}


function acc() {
    fetch_txt('./templates/acc.html').then(function(response) {
        document.getElementById("def_body").innerHTML += response;
        activeBtAcc();
        displayAllCard();
    });
}
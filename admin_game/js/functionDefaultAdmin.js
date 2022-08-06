function addPopoverInfo(game, validate) {
    let title = "Information";
    let info = "Début : "+displayDate(game.dateStart)+' <br /> '+"fin : "+displayDate(game.dateEnd);
    let imgSrc = "./../img/icons8-red-square-96.svg";
    let alt = "fini";
    if (validate == 1) {
        imgSrc = "./../img/icons8-blue-square-96.svg";
        alt = "n'a pas commencé";
      } else if (validate == 2) {
        imgSrc = "./../img/icons8-green-square-96.svg";
        alt = "en cours";
      }
    return '<div '+
    'data-bs-toggle="popover" data-bs-html="true" data-bs-title="'+title+'" data-bs-content="'+info+'"'+
    '><img class="img-validate" src="'+imgSrc+'" alt="'+alt+'" /></div>';
}

function activePopover() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}
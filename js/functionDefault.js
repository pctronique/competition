function sortTable(idTabe, idth, f){
    let n = $('#'+idth).prevAll().length;
	var rows = $('#'+idTabe+' tbody  tr').get();

	rows.sort(function(a, b) {

		var A = getVal(a);
		var B = getVal(b);

		if(A < B) {
			return -1*f;
		}
		if(A > B) {
			return 1*f;
		}
		return 0;
	});

	function getVal(elm){
		var v = $(elm).children('td').eq(n).text().toUpperCase();
		if($.isNumeric(v)){
			v = parseInt(v,10);
		}
		return v;
	}

	$.each(rows, function(index, row) {
		$('#'+idTabe).children('tbody').append(row);
	});
}

function reverseTab(tab) {
  if(tab != undefined) {
    let tabReverse = [];
    for (let index = 0; index < tab.length; index++) {
      const element = tab[index];
      tabReverse.push(element);
    }
    return tabReverse.reverse();
  }
}

function findLogin(speudo) {
	for (let index = 0; index < utilisateurTab.length; index++) {
	  if (utilisateurTab[index].speudo == speudo) {
		return index;
	  }
	}
	return -1;
}

function findGameAndUser(idGame) {
	for (let index = 0; index < gameUserTab.length; index++) {
	  if (idGame == gameUserTab[index].gameId && sessionTab.id == gameUserTab[index].userId) {
		return false;
	  }
	}
	return true;
}

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

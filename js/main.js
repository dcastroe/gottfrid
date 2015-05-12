var chMap, chMaplenght, isBlank, isBlankCounter, nonBlankTemplate;

String.prototype.replaceAt = function (index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}

$(document).ready(function() {
	showPage();	
});

function lolcoppter() {
	console.log("lol");
	var rofl = document.getElementById('rofl').innerHTML;
		chMap = [
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 43, 78],
			[14, 15, 16, 17, 18, 19, 20, 21, 22, 59, 61]
		],
		chMapLength = chMap.length,
		isBlank = true,
		isBlankCounter = 1,
		nonBlankTemplate = ['R', 'O', 'F', 'L', ':', 'R', 'O', 'F', 'L', 'L', 'L'];
		
	setInterval(doRofl, 80);

	function doRofl() {
		for(var i = 0; i < chMapLength; i++) {
			isBlank = !!(2 & isBlankCounter++);  
			for(var j = 0; j < chMap[i].length; j++) {
				var chReplace;
				if(!isBlank) {
					chReplace = ' ';                
				} else {
					chReplace = nonBlankTemplate[j];                
				}  
				rofl = rofl.replaceAt(chMap[i][j], chReplace);
			}
			document.getElementById('rofl').innerHTML = rofl;
		}  
	}		
}


function showPage() {
	$('#menu li a').click(function() {
		var page = $(this).attr('href');
		$("#content").slideUp();

		window.setTimeout(function() {
			$.get(page, function(data) {
				$("#content").html(data);
				$("#content").slideDown();

				if(page == 'conditions.html'){
					lolcoppter();
				} else if(page == 'contact.html') {
					validate();
				}
			});
		}, 500);
		return false;
	});
}

function validate() {
	$('#send').click(function(e) {

		var em = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var r = em.exec(document.getElementById("email").value);
		var phonepat = /[0-9-()+]{9}/;
		var result = phonepat.exec(document.getElementById("tfn").value);
	
		if($('input').val() == '') {
			alert("Ditt meddelande har inte skickats.");
		} else if(r && result) {
			$("#email, #tfn").css('outline', '2px solid green');
			alert("Tack! Ditt meddelande har skickats.");
			window.location.href="index.html";
		} else if (!r ) {
			$("#email").css('outline', '1px solid red');
			alert("Ogiltig email angivit.");
		} else if(!result) {
			$("#tfn").css('outline', '1px solid red');
			alert("Ogiltig telefonnummer angivit.");
		}  
		
		e.preventDefault();
	});
}


var chMap, chMaplenght, isBlank, isBlankCounter, nonBlankTemplate;

String.prototype.replaceAt = function (index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}


$(document).ready(function() {
	showPage();
});

function lolcoppter() {
	var rofl = document.getElementById('rofl').innerHTML;
		chMap = [
			[0, 1, 2, 3, 4, 5, 6, 7, 8, 43, 78],
			[14, 15, 16, 17, 18, 19, 20, 21, 22, 59, 61]
		],
		chMapLength = chMap.length,
		isBlank = true,
		isBlankCounter = 1,
		nonBlankTemplate = ['R', 'O', 'F', 'L', ':', 'R', 'O', 'F', 'L', 'L', 'L'];
		

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

	setInterval(doRofl, 80);	
}

function showPage() {
	$('#menu li a').click(function() {
		var page = $(this).attr('href');
		$("#content").slideUp();

		window.setTimeout(function() {
			var request = new XMLHttpRequest();
			request.open("GET", page, true);
			request.send();
			request.onreadystatechange = function() {
				if(request.readyState == 4 && request.status == 200) {
					document.getElementById("content").innerHTML = request.responseText;
					$("#content").slideDown();
				}
			}
		}, 500);
		return false;
		if(page == 'conditions.html'){
			lolcoppter();
		}
	});
}

function sendForm() {
	if(validatephone()) {
		if(document.getElementById("name").value == "") {
			alert("Ditt meddelande har inte skickats.");
		} else {
			alert("Tack! Ditt meddelande har skickats.");
			window.location.href="index.html";
		} 
	} else {
		alert("Ditt meddelande har inte skickats.");
	}

	function validatephone() {
		return validateemail();
		function validateemail() {
			var em = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			var r = em.exec(document.getElementById("email").value);
			if(!r) {
				$("#email").css('outline', '1px solid red');
			} else if (r) {
				$("#email").css('outline', '2px solid green');
			} 
			else {
				var phonepat = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;
				var result = phonepat.exec(document.getElementById("tfn").value);
				if(!result) $("#tfn").css('outline', '1px solid red');
				if(result) $("#tfn").css('outline', '2px solid green');
				if(!result) return false;
				else return true;
			}
		}
	}
}
let xhr = new XMLHttpRequest();
let div_verbes = document.getElementById("liste_verbes");
let div_input = document.getElementById("input");

// la ligne suivante est à décommenter après écriture de creer_interface
document.body.onload = creer_interface;

function creer_interface() {
  let sequence_input = document.createElement("input");
  sequence_input.setAttribute("type", "text");
  sequence_input.setAttribute("placeholder", "Entrez une sequence");
  sequence_input.style.display = "block";
  sequence_input.addEventListener("input", function() {
  		charger_verbes(sequence_input.value, 'seq');
  	})
  div_input.appendChild(sequence_input);

  
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVZœ";
  for (var i = 0; i < 24; i++) {
  	let lettre_input = document.createElement("input");
  	lettre_input.setAttribute("type", "button");
  	let lettre = alphabet.charAt(i);
  	lettre_input.setAttribute("value", lettre);
  	lettre_input.addEventListener("click", function() {
  		charger_verbes(lettre_input.value, 'init');
  	})
  	div_input.appendChild(lettre_input);
  }

  let effacer_input = document.createElement("input");
  effacer_input.setAttribute("type", "button");
  effacer_input.setAttribute("value", "Effacer la liste");
  effacer_input.addEventListener("click", function() {
  		div_verbes.innerHTML = "";
  		sequence_input.value = null;
  	})
  div_input.appendChild(effacer_input);



}

function callback_basique() {
  let xhrJSON = JSON.parse(xhr.responseText);
  console.log(xhrJSON);
}

function callback() {
  let xhrJSON = JSON.parse(xhr.responseText);
  div_verbes.innerHTML = "";
  for (var i = 0; i < xhrJSON.length; i++) {
  	let p = document.createElement("p");
  	p.innerHTML = xhrJSON[i].libelle;
  	div_verbes.appendChild(p);
  }
}

function charger_verbes(lettre,type) {
  let url = "./php/recherche.php?lettre=" + lettre + "&type=" + type;
  xhr.open("GET", url, true);
  xhr.addEventListener("load",callback);
  xhr.send(null);
}

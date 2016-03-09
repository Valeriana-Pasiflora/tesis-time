var images = ["http://imgs.xkcd.com/comics/grownups.png ",
			  "http://imgs.xkcd.com/comics/circuit_diagram.png",
			  "http://imgs.xkcd.com/comics/angular_momentum.jpg",
			  "http://imgs.xkcd.com/comics/self_description.png ",
			  "http://imgs.xkcd.com/comics/alternative_energy_revolution.jpg"];
var scores = [];

var times = [];

var counter = 0;

var start = new Date().getTime();

var data = [];

var userName = "";



document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '49') {
        change(1);
    }
    else if (e.keyCode == '50') {
        change(2);
    }
    else if (e.keyCode == '51') {
        change(3);
    }
    else if (e.keyCode == '52') {
        change(4);
    }
    else if (e.keyCode == '53') {
        change(5);
    }

}


function startQuiz()
{
	userName = document.getElementById("user").value;
	if(userName)
	{
		console.log("User name: " + userName);
		document.getElementById("main").setAttribute("class", "");
		document.getElementById("input").setAttribute("class", "hidden");
		start = new Date().getTime();
	}
	else
	{
		alert("El usuario no debe estar vacio.")
	}

}

function change(number)
{

	console.log(number);
	counter++;
	var end = new Date().getTime();
	var took = end - start;
	times.push(took);
	scores.push(number);


	var result = {};
	result["time"] = took;
	result["score"] = number;
	result["image"] = document.getElementById("image").src;

	data.push(result);

	console.log("Image took " + took + " milliseconds.") ;
	start = new Date().getTime();

	if(counter < images.length)
	{
		document.getElementById("image").src = images[counter];

	}
	else
	{
		var myNode = document.getElementById("main");
		while (myNode.firstChild) {
    		myNode.removeChild(myNode.firstChild);
		}
		printResults();
	}
}

function printResults()
{
	var results = document.getElementById('results');
	var table = document.createElement('table');
	var thead = document.createElement('thead');
	var titles = document.createElement('tr');


	var name = document.createElement('p');
	name.innerText = "Resultados para el usuario: " + userName;

	results.appendChild(name);

	var imageTitle = document.createElement('th');
	imageTitle.innerText = "Imagen";
	titles.appendChild(imageTitle);

	var scoreTitle = document.createElement('th');
	scoreTitle.innerText = "Respuesta";
	titles.appendChild(scoreTitle);

	var timeTitle = document.createElement('th');
	timeTitle.innerText = "Tiempo";
	titles.appendChild(timeTitle);

	table.appendChild(titles);

	data.forEach(function(element){
		console.log(element);
		var row = document.createElement('tr');
		var imageCell = document.createElement('td');
		imageCell.innerText = element["image"];
		row.appendChild(imageCell);

		var scoreCell = document.createElement('td');
		scoreCell.innerText = element["score"];
		row.appendChild(scoreCell);

		var timeCell = document.createElement('td');
		timeCell.innerText = Number(element["time"] / 1000).toFixed(2);
		row.appendChild(timeCell);
		//console.log(table);
		//console.log(row);

		table.appendChild(row);
	});

	results.appendChild(table);
}
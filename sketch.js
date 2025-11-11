createCanvas(window.width, window.height);
var golem1, golem2;
var heads = ['c', 'ch', 'l']
var bodies = ['f', 's', 'r']
var limbs = ['s', 'c', 'f']

var fight_timer;

var states = ["title", "battle", "end"]

var state = states[0];
var winner;
let battleMusic;
let introMusic;
let cheering;

function setup() {
	document.addEventListener('keydown', function(ev){
	console.log(ev.which);
	if (ev.key === ' ') {
		if (state == "title") {
			state = "battle"
			battleMusic.play()
			startScene()
		} else if(state == "end"){
			state = "title"
			battleMusic.stop();
		}
	}
	
	});

	battleMusic = loadSound("battle_music.mp3")
	
	battleMusic.amp(0.3)
	cheering = loadSound("cheering.wav")
	cheering.amp(0.3)
}

function title() {
	fill("white")
	textAlign(CENTER)
	textSize(30)
	text("HEAR YE HEAR YE HERE'S SOME TEXT ABOUT BUILDING YOUR BEAST", width/2, height/2) 
	text("PRESS THE SPACEBAR TO CONTINUE", width/2, height/2 + 50) 
	

}

function startScene() {
	var name = heads[Math.floor(Math.random() * 3)] + bodies[Math.floor(Math.random() * 3)] + limbs[Math.floor(Math.random() * 3)]
	var char1 = name in characters ? characters[name] : "Unknown";

	name = heads[Math.floor(Math.random() * 3)] + bodies[Math.floor(Math.random() * 3)] + limbs[Math.floor(Math.random() * 3)]
	var char2 = name in characters ? characters[name] : "Unknown";
	// console.log(name)

	initiateGolems(char1, char2);
	battleMusic.loop()

}


function update() {
	background('black');
	switch(state) {
		case "title":
			title();
			break;
		case "battle":
			battle();
			break;
		case "end":
			announceWinner();
			break;
	}
	
}



function battle() {
	golem1.display()
	golem2.display()

	if (golem1.hit) {
		golem2.take_damage(golem1.punch())
		golem1.hit = false;
		print(golem2.health)
	}

	if (golem2.hit) {
		golem1.take_damage(golem2.punch())
		golem2.hit = false;
		print(golem1.health)
	}

	if (!golem1.alive || !golem2.alive) {
		if (golem1.alive) {
			winner = golem1.player
		} else {
			winner = golem2.player
		}
		
		resetScene()
		state = "end"

		
		cheering.play()
		// cheering.noLoop()
		
	}
}

function announceWinner() {
	text("WINNER:", width/2, height/2) 
	text("Player "+ winner, width/2, height/2 + 50) 
	print("winner")
}

function resetScene() {
	golem1.sprite.delete()
	console.log(golem1.sprite)
	golem2.sprite.delete()
	// startScene()
}

function get(obj, key, value) {
	return key in obj ? obj[key] : value;
}

function initiateGolems(char1, char2) {
	let rand_turn = Math.floor(Math.random() * 2);
	golem1 = new Golem(1,rand_turn, char1)
	golem2 = new Golem(2,1-rand_turn, char2)
}
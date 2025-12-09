createCanvas(window.width, window.height);
var golem1, golem2;
var heads = ['c', 'h', 'l']
var bodies = ['f', 's', 'r']
var limbs = ['s', 'c', 'f']

var fight_timer;

var states = ["title", "battle", "end"]

var state = states[0];
var winner;
let battleMusic;
let selectMusic;
let introMusic;
let cheering;
let win = [];
let titlescreen;
let fire_ani;
let fire;
let end_timer;

function setup() {
	selectMusic = loadSound("Selection.mp3")
	battleMusic = loadSound("battle_music.mp3")
	selectMusic = loadSound("Selection.mp3")
	battleMusic.amp(0.3)
	selectMusic.amp(0.3);
	titlescreen = loadImage("win/title.png")
	cheering = loadSound("cheering.wav")
	cheering.amp(0.3)
	win.push(loadImage("win/p1.png"))
	win.push(loadImage("win/p2.png"))
	fire_ani = loadAni('load/f1.png', 4);
	fire_ani.frameDelay+=5;
	// fire_ani.scale *= -1
	fire = new Sprite(width/2, height/2)
	fire.addAnimation("fire", fire_ani)
	
	
	document.addEventListener('keydown', function(ev){
	// console.log(ev.which);
	if (ev.key === ' ') {
		if (state == "title") {
			state = "battle"
			battleMusic.setVolume(0.3, 0, 0);
			battleMusic.play()
			selectMusic.stop()
			fire.delete()
			startScene()
		}
	} else if (ev.key === 'c') {
		getPort();
	} else if (ev.key === 'r') {
		selectMusic.stop()
		selectMusic.loop();
	}
	
	});

}

function title() {
	// image(titlescreen, 0, 0, width, height, 0, 0, win.width, win.height)
	// animation(fire_ani, width/2, height/2)
	

}

function startScene() {
	if (input_thing != null) {
		var name = input_thing.substring(0, 3);
	} else {
		name = heads[Math.floor(Math.random() * 3)] + bodies[Math.floor(Math.random() * 3)] + limbs[Math.floor(Math.random() * 3)]
	}
	
	console.log(name)
	var char1 = name in characters ? characters[name] : "Unknown";

	if (input_thing != null) {
		var name = input_thing.substring(3);
	} else {
		name = heads[Math.floor(Math.random() * 3)] + bodies[Math.floor(Math.random() * 3)] + limbs[Math.floor(Math.random() * 3)]
	}
	// name = input_thing.substring(3)
	// console.log(name)
	// name = heads[Math.floor(Math.random() * 3)] + bodies[Math.floor(Math.random() * 3)] + limbs[Math.floor(Math.random() * 3)]
	var char2 = name in characters ? characters[name] : "Unknown";
	console.log(char2)

	initiateGolems(char1, char2);
	battleMusic.loop()

}


function update() {
	background('black');
	switch(state) {
		case "setup":
			connecter();
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
		battleMusic.setVolume(0, 7, 0)
		end_timer = setTimeout(()=>{
			state = "title"
			fire = new Sprite(width/2, height/2)
			// fire_ani.scale *= -1
			fire.addAnimation("fire", fire_ani)
			
			battleMusic.stop();
			selectMusic.loop()
		},10000)
		
		cheering.play()
		
	}
}

function announceWinner() {
	push()
	if (winner == 1) {
		image(win[0], 0, 0, width, height, 0, 0, win.width, win.height)
	} else {
		image(win[1], 0, 0, width, height, 0, 0, win.width, win.height)
	}
	pop()
}

function resetScene() {
	golem1.sprite.delete() 
	golem2.sprite.delete()
}

function get(obj, key, value) {
	return key in obj ? obj[key] : value;
}

function initiateGolems(char1, char2) {
	let rand_turn = Math.floor(Math.random() * 2);
	golem1 = new Golem(1,rand_turn, char1)
	golem2 = new Golem(2,1-rand_turn, char2)
}
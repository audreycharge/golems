createCanvas(window.width, window.height);
var golem1, golem2;
var heads = ['c', 'ch', 'l']
var bodies = ['f', 's', 'r']
var limbs = ['s', 'c', 'f']

var fight_timer;


function setup() {

	var name = heads[Math.floor(Math.random() * 3)] + bodies[Math.floor(Math.random() * 3)] + limbs[Math.floor(Math.random() * 3)]
	var char1 = name in characters ? characters[name] : "Unknown";

	name = heads[Math.floor(Math.random() * 3)] + bodies[Math.floor(Math.random() * 3)] + limbs[Math.floor(Math.random() * 3)]
	var char2 = name in characters ? characters[name] : "Unknown";
	// console.log(name)

	initiateGolems(char1, char2);


}


function update() {
	background('black');
	golem1.display()
	golem2.display()
	
}

function resetScene() {
	golem1.delete();
	golem2.delete();
}

function get(obj, key, value) {
	return key in obj ? obj[key] : value;
}

function initiateGolems(char1, char2) {
	let rand_turn = Math.floor(Math.random() * 2);
	golem1 = new Golem(1,rand_turn, char1)
	golem2 = new Golem(2,1-rand_turn, char2)
}
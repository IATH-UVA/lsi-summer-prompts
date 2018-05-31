var bubble1 = {
	x: 300,
	y: 200,
	diameter: 50
	display: function () {
		stroke (255);
		strokeWeight(3);
		noFill();
		ellipse(this.x,this.y, 50, 50);
	},
	move: function () {
		this.x = this.x + random(-1,1);
		this.y = this.y + random(-1,1);

	}
}

function setup () {
	createCanvas(600,600);

}
function draw () {
	background(0, 10, 50);
	bubble1.display();
	bubble1.move();
}
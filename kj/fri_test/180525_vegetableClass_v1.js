class Vegetable {
	
	constructor(vegColor, vegShape, vegCost) {
		this.vegColor = vegColor;
		this.vegShape = vegShape;
		this.vegCost = vegCost;
	}

	display() {
		stroke (0);
		fill (vegColor);
		if (this.vegShape = round) {
			ellipse (width/2, height/2, vegCost, vegCost);
		}
		else if (this.vegShape = square) {
			rect (width/2, height/2, vegCost, vegCost)
		}
	}


}


const beet = new Vegetable (color(50, 100, 150), 'round', 3.54);

console.log(beet.vegCost);
const buildColors = (exclude) => ['red','green','blue','yellow'].filter(c => c !== exclude);

const randCol = (exclude) => Array.from(buildColors(exclude))[Math.floor(Math.random() * 3)];

const squared = (n) => Math.pow(n,2);

const radiiDistance = (c1, c2) => Math.sqrt(squared(c1.x - c2.x) + squared(c1.y - c2.y));

const collides = (c1, c2) => (radiiDistance(c1,c2) <= c1.r + c2.r);

const circleObj = (x, y, r) => {
	return {
		x:x,
		y:y,
		r:r,
	}
};

export { buildColors, randCol, squared, radiiDistance, collides, circleObj };
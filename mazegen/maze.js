/**
 * Default model of a maze
 * 
 * @param args the set of settings of a personalized maze
 */
function Maze(args) {
	const defaults = {
		width: 4,
		height: 4,
		startendpos: 'diagonal',
		color: '#000000',
		backgroundColor: '#FFFFFF',
		solveColor: '#cc3737',
		paths: 1,
	}

	const settings = Object.assign({}, defaults, args);

	this.matrix = [];
	this.wallsRemoved = 0;
	this.width = parseInt(settings['width'], 10);
	this.height = parseInt(settings['height'], 10);
	this.paths = parseInt(settings['paths'], 10);
	this.entryNodes = this.getEntryNodes(settings['startendpos']);
	this.color = settings['color'];
	this.backgroundColor = settings['backgroundColor'];
    this.solveColor = settings['solveColor'];
    this.maxWallsRemove = 5;
}

/**
 * Generates the complete structure of a maze.
 */
Maze.prototype.generate = function() {

	let nodes = this.generateNodes();
	nodes = this.parseMaze(nodes);
	this.getMatrix(nodes);
	this.removeMazeWalls();
}

/**
 * Generates the initial nodes of a maze
 */
Maze.prototype.generateNodes = function() {
	const count = this.width * this.height;
	let nodes = [];

	for (let i = 0; i < count; i++) {
		// visited, nswe
		nodes[i] = "01111";
	}

	return nodes;
}

/**
 * Maps out the nodes of the maze
 * 
 * @param nodes the nodes of the maze
 */
Maze.prototype.parseMaze = function(nodes) {

	const mazeSize = nodes.length;
	const positionIndex = { 'n': 1, 's': 2, 'w': 3, 'e': 4, };
	const oppositeIndex = { 'n': 2, 's': 1, 'w': 4, 'e': 3 };

	let moveNodes = [];
	let visited = 0;
	let position = parseInt(Math.floor(Math.random() * nodes.length), 10);

	// Set start node visited.
	nodes[position] = replaceAt(nodes[position], 0, 1);

	while (visited < (mazeSize - 1)) {

		let next = this.getNeighbours(position);
		let directions = Object.keys(next).filter(function(key) {
			return (-1 !== next[key]) && !stringVal(this[next[key]], 0);
		}, nodes);

		if (directions.length) {
			++visited;

			if (1 < directions.length) {
				moveNodes.push(position);
			}

			let direction = directions[Math.floor(Math.random() * directions.length)];

			// Update current position
			nodes[position] = replaceAt(nodes[position], positionIndex[direction], 0);
			// Set new position
			position = next[direction];

			// Update next position
			nodes[position] = replaceAt(nodes[position], oppositeIndex[direction], 0);
			nodes[position] = replaceAt(nodes[position], 0, 1);
		} else {
			if (!moveNodes.length) {
				break;
			}

			position = moveNodes.pop();
		}
	}

	return nodes;
}

/**
 * Applies the mapped nodes of a maze onto an actual matrix.
 * 
 * @param nodes the nodes of the maze
 */
Maze.prototype.getMatrix = function(nodes) {
	const mazeSize = this.width * this.height;

	// Add the complete maze in a matrix
	// where 1 is a wall and 0 is a corridor.

	let row1 = '';
	let row2 = '';

	if (nodes.length !== mazeSize) {
		return;
	}

	for (let i = 0; i < mazeSize; i++) {
		row1 += !row1.length ? '1' : '';
		row2 += !row2.length ? '1' : '';

		if (stringVal(nodes[i], 1)) {
			row1 += '11';
			if (stringVal(nodes[i], 4)) {
				row2 += '01';
			} else {
				row2 += '00';
			}
		} else {
			let hasAbove = nodes.hasOwnProperty(i - this.width);
			let above = hasAbove && stringVal(nodes[i - this.width], 4);
			let hasNext = nodes.hasOwnProperty(i + 1);
			let next = hasNext && stringVal(nodes[i + 1], 1);

			if (stringVal(nodes[i], 4)) {
				row1 += '01';
				row2 += '01';
			} else if (next || above) {
				row1 += '01';
				row2 += '00';
			} else {
				row1 += '00';
				row2 += '00';
			}
		}

		if (0 === ((i + 1) % this.width)) {
			this.matrix.push(row1);
			this.matrix.push(row2);
			row1 = '';
			row2 = '';
		}
	}

	// Add closing row
	this.matrix.push('1'.repeat((this.width * 2) + 1));
}

/**
 * Fetches the positions of the start and end of the maze.
 * 
 * @param access the entry type of the maze
 */
Maze.prototype.getEntryNodes = function(access) {
	const y = ((this.height * 2) + 1) - 2;
	const x = ((this.width * 2) + 1) - 2;

	let entryNodes = {};

	if ('diagonal' === access) {
		entryNodes.start = { 'x': 1, 'y': 1, 'gate': { 'x': 0, 'y': 1 } };
		entryNodes.end = { 'x': x, 'y': y, 'gate': { 'x': x + 1, 'y': y } };
	}

	if ('horizontal' === access || 'vertical' === access) {
		let xy = ('horizontal' === access) ? y : x;
		xy = ((xy - 1) / 2);
		let even = (xy % 2 === 0);
		xy = even ? xy + 1 : xy;

		let start_x = ('horizontal' === access) ? 1 : xy;
		let start_y = ('horizontal' === access) ? xy : 1;
		let end_x = ('horizontal' === access) ? x : (even ? start_x : start_x + 2);
		let end_y = ('horizontal' === access) ? (even ? start_y : start_y + 2) : y;
		let startgate = ('horizontal' === access) ? { 'x': 0, 'y': start_y } : { 'x': start_x, 'y': 0 };
		let endgate = ('horizontal' === access) ? { 'x': x + 1, 'y': end_y } : { 'x': end_x, 'y': y + 1 };

		entryNodes.start = { 'x': start_x, 'y': start_y, 'gate': startgate };
		entryNodes.end = { 'x': end_x, 'y': end_y, 'gate': endgate };
	}

	return entryNodes;
}

/**
 * Fetches unvisited neighbours of a node
 * 
 * @param pos the position of a node
 */
Maze.prototype.getNeighbours = function(pos) {
	return {
		'n': (0 <= (pos - this.width)) ? pos - this.width : -1,
		's': ((this.width * this.height) > (pos + this.width)) ? pos + this.width : -1,
		'w': ((0 < pos) && (0 !== (pos % this.width))) ? pos - 1 : -1,
		'e': (0 !== ((pos + 1) % this.width)) ? pos + 1 : -1,
	};
}

/**
 * Removes walls based on recursive backtracker algorithm.
 *  
 * @param row the row where to remove walls
 * @param index the node where to remove walls
 */
Maze.prototype.removeWall = function(row, index) {
	// Remove wall if possible.
	const evenRow = (row % 2 === 0);
	const evenIndex = (index % 2 === 0);
	const wall = stringVal(this.matrix[row], index);

	if (!evenRow && evenIndex) {
		// Uneven row and even column
		const hasTop = (row - 2 > 0) && (1 === stringVal(this.matrix[row - 2], index));
		const hasBottom = (row + 2 < this.matrix.length) && (1 === stringVal(this.matrix[row + 2], index));

		if (hasTop && hasBottom) {
			this.matrix[row] = replaceAt(this.matrix[row], index, '0');
			return true;
		} else if (!hasTop && hasBottom) {
			const left = 1 === stringVal(this.matrix[row - 1], index - 1);
			const right = 1 === stringVal(this.matrix[row - 1], index + 1);
			if (left || right) {
				this.matrix[row] = replaceAt(this.matrix[row], index, '0');
				return true;
			}
		} else if (!hasBottom && hasTop) {
			const left = 1 === stringVal(this.matrix[row + 1], index - 1);
			const right = 1 === stringVal(this.matrix[row + 1], index + 1);
			if (left || right) {
				this.matrix[row] = replaceAt(this.matrix[row], index, '0');
				return true;
			}
		}
	} else if (evenRow && !evenIndex) {
		// Even row and uneven column
		const hasLeft = 1 === stringVal(this.matrix[row], index - 2);
		const hasRight = 1 === stringVal(this.matrix[row], index + 2);

		if (hasLeft && hasRight) {
			this.matrix[row] = replaceAt(this.matrix[row], index, '0');
			return true;
		} else if (!hasLeft && hasRight) {
			const top = 1 === stringVal(this.matrix[row - 1], index - 1);
			const bottom = 1 === stringVal(this.matrix[row + 1], index - 1);
			if (top || bottom) {
				this.matrix[row] = replaceAt(this.matrix[row], index, '0');
				return true;
			}
		} else if (!hasRight && hasLeft) {
			const top = 1 === stringVal(this.matrix[row - 1], index + 1);
			const bottom = 1 === stringVal(this.matrix[row + 1], index + 1);
			if (top || bottom) {
				this.matrix[row] = replaceAt(this.matrix[row], index, '0');
				return true;
			}
		}
	}

	return false;
}

/**
 * Removes walls that allow multiple solutions.
 */
Maze.prototype.removeMazeWalls = function() {

	const min = 1;
    const max = this.matrix.length - 1;
    var maxTries = this.maxWallsRemove;
	let tries = 0;

	while (tries < maxTries) {
		tries++;

		// Did we reached the goal
		if (this.wallsRemoved >= this.paths-1) {
			break;
		}

		// Get random row from matrix
		let y = Math.floor(Math.random() * (max - min + 1)) + min;
		y = (y === max) ? y - 1 : y;

		let walls = [];
		let row = this.matrix[y];

		// Get walls from random row
		for (let i = 0; i < row.length; i++) {
			if (i === 0 || i === row.length - 1) {
				continue;
			}

			const wall = stringVal(row, i);
			if (wall) {
				walls.push(i);
			}
		}

		// Shuffle walls randomly
		shuffleArray(walls);

		// Try breaking a wall for this row.
		for (let i = 0; i < walls.length; i++) {
			if (this.removeWall(y, walls[i])) {

				// Wall can be broken
				this.wallsRemoved++;
				break;
			}
		}
	}
}

/**
 * Draws the finalized maze onto the canvas.
 */
Maze.prototype.draw = function() {

    var canvas = document.getElementById('mazecanvas');

	canvas.width = 505;
	canvas.height = 505;

	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Add background
	ctx.fillStyle = this.backgroundColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Set maze color
	ctx.fillStyle = this.color;

	const row_count = this.matrix.length;
	const gateEntry = getEntryNode(this.entryNodes, 'start', true);
	const gateExit = getEntryNode(this.entryNodes, 'end', true);

	for (let i = 0; i < row_count; i++) {
		let row_length = this.matrix[i].length;
		for (let j = 0; j < row_length; j++) {
			if (gateEntry && gateExit) {
				if ((j === gateEntry.x) && (i === gateEntry.y)) {
					continue;
				}
				if ((j === gateExit.x) && (i === gateExit.y)) {
					continue;
				}
			}
			let pixel = parseInt(this.matrix[i].charAt(j), 10);
			if (pixel) {
				ctx.fillRect((j * 5), (i * 5), 5, 5);
			}
		}
	}
}
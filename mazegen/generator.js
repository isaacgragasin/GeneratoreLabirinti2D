var mazeNodes = {};
var solved = false;

/**
 * Initializes generation and drawing of a maze based on inputted settings.
 * keeps track of the nodes of the maze.
 */
function generateMaze(){
    getParams();

    const settings = {
		width: getInputIntVal('width', 4),
		height: getInputIntVal('height', 4),
		paths: getInputIntVal('path', 1),
        startendpos: 'diagonal',
        color: '#000000',
		backgroudColor: '#FFFFFF',
        solveColor: '#cc3737',
        
    }

	var entry = document.getElementById('startendpos');
	if (entry) {
		settings['startendpos'] = entry.options[entry.selectedIndex].value;
    }
    
    const maze = new Maze(settings);
	maze.generate();
    maze.draw();
    solved = false;

    mazeNodes = {};
	if (maze.matrix.length) {
		mazeNodes = maze;
	}
}

/**
 * Traces the solution(s) of the maze.
 */
function showSolution(){
}
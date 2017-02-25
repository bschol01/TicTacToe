// Tic Tac Toe
var Agent = function () {

};

/*Selects and returns the move that the agent is going to make. */
Agent.prototype.selectMove = function(board) {
	var player;
	var temp = 0;
	var scores = [];
	var move = 1;
	this.depth = 0;
	
	if (board.playerOne) this.player = true;
	
	for (var i = 1; i < 10; i++) {
	this.X = board.X.slice();
	this.O = board.O.slice();
	
		if (this.checkCellFree(i, this.X, this.O)) {
			scores.push(this.minimax(i, this.player, this.depth, board, this.X, this.O));
		} else {
			scores.push(-60);
		}
	}
	
	var temp = scores[0];
	for (var i = 1; i < scores.length; i++) {
		if (board.playerOne) {
			if ((temp >= scores[i] || temp == -60)&& scores[i] != -60 ) {
				temp = scores[i];
				move = i + 1;
			}
		} else {
			if ((temp <= scores[i] || temp == -60) && scores[i] != -60) {
				temp = scores[i];
				move = i + 1;
			}
		}
	}
	return move;
};

// Scores the outcomes of the possible moves and returns them
Agent.prototype.minimax = function(currentMove, player, depth, board, X, O) {
	var maxBestScore = -10;
	var minBestScore = 10;
	finished = this.checkMove(currentMove, this.player, X, O);
	
	if (finished != 0) {
	return this.score(this.player, finished, depth);
	}
	
	for (var i = 1; i < 10; i++) {
		if (this.checkCellFree(i, X, O)) {
			outcome = this.minimax(i, this.player, depth + 1, board, X, O);
			if (X%2 == 1) X.pop();
			else O.pop();
			
			if (outcome <= maxBestScore) maxBestScore = outcome;
			if (outcome >= minBestScore) minBestScore = outcome;
		}
	}
	if (board.playerOne) return maxBestScore;
	else return  minBestScore;
	
};

// Scores the current move based on the depth of the tree and which player won first
Agent.prototype.score = function(player, endGame, depth) {
	
		var score;
		
		switch(endGame) {
			case 1:
				score = (10 - depth);
				break;
			case 2:
				score = (-10 - depth);
				break;
			case 3:
				score =  (0 - depth);
				break;
		}
		
		return score;
};

// Checks to make sure that the current move is valid
Agent.prototype.checkMove = function (cell, player, X, O) {
    if (this.checkCellFree(cell, X, O)) {
        this.player ? X.push(cell) : O.push(cell);
        this.player = !this.player;
    }
    return this.checkGameOver(X, O);
};

// Checks if the game is over
Agent.prototype.checkGameOver = function (X, O) {
    var Xwin = false;
    var Owin = false;
    var draw = false;
    if (X.length > 2) {
        for (var i = 0; i < X.length - 2; i++) {
            for (var j = i + 1; j < X.length - 1; j++) {
                for (var k = j + 1; k < X.length; k++) {
                    if (X[i] + X[j] + X[k] === 15) Xwin = true;
                }
            }
        }
    }
    if (O.length > 2) {
        for (var i = 0; i < O.length - 2; i++) {
            for (var j = i + 1; j < O.length - 1; j++) {
                for (var k = j + 1; k < O.length; k++) {
                    if (O[i] + O[j] + O[k] === 15) Owin = true;
                }
            }
        }
    }
    if (X.length + O.length === 9) draw = true;
    if (Xwin) return 1;
    if (Owin) return 2;
    if (draw) return 3;
    return 0;
};

// Checks if the current cell is available
Agent.prototype.checkCellFree = function (cell, X, O) {
    if (X.indexOf(cell) < 0 && O.indexOf(cell) < 0) return true;
    else return false;
};
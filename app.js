
  // Creates a new game instance, new board, and new players
  function Game() {

      this.player1 = new Player('X');
      this.player2 = new Player('O');
      this.board = new Board();
  }

  // This sets the turn without relying on an incrementing counter
  Game.prototype.nextPlayer = function() {
      game.board.checkWinner();
      game.currentPlayer === game.player1 ? game.currentPlayer = game.player2 : game.currentPlayer = game.player1;
  };


  // `Game.prototype.init` kicks off a new game with a board and two players
  Game.prototype.init = function() {
    this.currentPlayer = this.player1;
    $(game.board.$cells).click(function(event){
      game.board.makeMove();
    });
  };

  // Constructs a player object and assigns a team
  function Player(team) {
    this.team = team;
    this.cellId = null;
  }

  // Creates a new board object on game creation, and also
  // creates a null array to hold moves
  function Board() {   
    
    this.moveArr = [null, null, null, null, null, null, null, null, null];  

    this.$cells = $('.box');
     $('#reset').click(function(event){
      game.board.resetBoard();
    });  
   }

  // Sets a square to player 'team', stores the move 
  // in the move array, and prevents square from being
  // reset with another move
  Board.prototype.makeMove = function() {

    if($(event.target).html() === '&nbsp;'){
      $(event.target).text(game.currentPlayer.team);
      var currentCell = parseInt(event.target.id)
      this.moveArr[currentCell] = game.currentPlayer.team
        game.nextPlayer();
          } else { 
            alert("This square is already taken!");
          }
  };
  // Array which holds the winning conditipns for the board
  Board.prototype.winCond = [
        
        [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]
    ];
  // Checks the board for winning combinations against the value
  // of the players 'team'
  Board.prototype.checkWinner = function() {
      var hasWon = false;
      for (var i = 0; i < this.winCond.length; i++) {
          if (game.board.moveArr[this.winCond[i][0]] === (game.currentPlayer.team)&&
              game.board.moveArr[this.winCond[i][1]] === (game.currentPlayer.team) &&
              game.board.moveArr[this.winCond[i][2]] === (game.currentPlayer.team))
              hasWon = true;
      }
      if (hasWon) {alert("Player "+ game.currentPlayer.team + " has won!")}
  };


  // Generic function to reset the board to its initial state,
  // will be called by the button as a hard reset, and by the
  // winner check 
  Board.prototype.resetBoard = function() {
     game.board.$cells.html('&nbsp;');
  };

  // Start the game!
  var game = new Game();
  game.init();
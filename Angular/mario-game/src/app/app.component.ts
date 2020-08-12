import { Component, HostListener, OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class AppComponent implements OnInit {

  title = 'mario-game';
  rowLength = 0;
  columnLength = 0;
  matrix;
  marioPos;
  greenSprites = [];
  movesCount = 0;

  handleKeyboardEvent(event: KeyboardEvent) {
    this.moveMario(event.keyCode);
  }

  constructor() {
    
  }

  ngOnInit() {
    this.drawboard();
  }

  //Form the board with the dimensions given by the user . Place mario in the middle
  drawboard() {
    let rows = prompt('Please enter proper board width');
    this.rowLength = Number(rows);
    if (isNaN(this.rowLength) || this.rowLength <= 0) window.location.reload();

    let columns = prompt('Please enter proper board height');
    this.columnLength = Number(columns);
    if (isNaN(this.columnLength) || this.columnLength <= 0) window.location.reload();

    this.matrix = Array(this.rowLength).fill(0).map(() => Array(this.columnLength).fill(0));
    this.marioPos = [(this.matrix.length / 2), (this.matrix[0].length / 2)];
    this.matrix[this.marioPos[0]][this.marioPos[1]] = 2;
    this.placeGreenSprites();
  }

  //ontrols mario movement .Also check the current game status & counts the moves
  moveMario(keyCode) {
    if(keyCode === 37) {
      if (this.marioPos[1] === 0) return;
      this.matrix[this.marioPos[0]][this.marioPos[1]] = 0;
      this.marioPos[1] = this.marioPos[1] - 1;
      if (this.matrix[this.marioPos[0]][this.marioPos[1]] === 1) this.greenSprites.pop();
      this.matrix[this.marioPos[0]][this.marioPos[1]] = 2;
      this.movesCount++;
    }
    if(keyCode === 38) {
      if (this.marioPos[0] === 0) return;
      this.matrix[this.marioPos[0]][this.marioPos[1]] = 0;
      this.marioPos[0] = this.marioPos[0] - 1;
      if (this.matrix[this.marioPos[0]][this.marioPos[1]] === 1) this.greenSprites.pop();
      this.matrix[this.marioPos[0]][this.marioPos[1]] = 2;
      this.movesCount++;
    }
    if(keyCode === 39) {
      if (this.marioPos[1] === this.matrix[0].length - 1) return;
      this.matrix[this.marioPos[0]][this.marioPos[1]] = 0;
      this.marioPos[1] = this.marioPos[1] + 1;
      if (this.matrix[this.marioPos[0]][this.marioPos[1]] === 1) this.greenSprites.pop();
      this.matrix[this.marioPos[0]][this.marioPos[1]] = 2;
      this.movesCount++;
    }
    if(keyCode === 40) {
      if (this.marioPos[0] === this.matrix.length - 1) return;
      this.matrix[this.marioPos[0]][this.marioPos[1]] = 0;
      this.marioPos[0] = this.marioPos[0] + 1;
      if (this.matrix[this.marioPos[0]][this.marioPos[1]] === 1) this.greenSprites.pop();
      this.matrix[this.marioPos[0]][this.marioPos[1]] = 2;
      this.movesCount++;
    }
    //If no more sprouts are left
    if (this.greenSprites.length <= 0) {
      setTimeout(() => {
        alert(`Game over. Total moves to save princess: ${this.movesCount}`);
        window.location.reload();
      }, 1);
    }
  } 

  //Randomly places 10 green sprites throughout the board
  placeGreenSprites() {

    while(this.greenSprites.length <= 10) {
      let rowIndex = Math.floor(Math.random() * 10);
      let colIndex = Math.floor(Math.random() * 10);

      if (this.greenSprites.findIndex(sprite => {
        if ((sprite.x === rowIndex && sprite.y === colIndex) || (sprite.x === this.marioPos[0] && sprite.y === this.marioPos[1])) return true;
      }) === -1 ) {
        this.greenSprites.push({x: rowIndex, y: colIndex});
      }
    }
    this.greenSprites.forEach(sprite => this.matrix[sprite.x][sprite.y] = 1);

  }
}

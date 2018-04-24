# gridLoS

Line of Sight builder for targeting systems. Not so much intended for computing visibility but for detecting which cells are targetable or not.

See demo.

## Installation

With npm:
    npm i gridlos
  
In the browser:
```javascript
    <script src="gridLoS.js"></script>
```
The variable `gridLoS` will be exposed. 

## Usage
```javascript
    let gridLoS = require('gridLoS');

    let userCell = {x: 0, y: 0};
    let cells = [
        {x: 0, y: 0},
        {x: 1, y: 0, block: true},
        {x: 2, y: 0},
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
    ];
    gridLoS.make(cells, userCell, 2);
```
`gridLoS.make` process the given cells and alter the property `visible`, marking if their are targetable or not.

### Settings

There are some settings you can alter before computing the cells.
```javascript
    gridLoS.settings({
        cellObstacleProp: "block",
        cellVisibleProp: "visible",
        cellWidth: 32,
        cellHeight: 32
    });
```
### From Maps
```javascript
    let map = [
        [0,1,0],
        [0,0,0],
        [0,0,0]
    ];
    let userCell = {x: 0, y: 0};
    let cells = gridLoS.mapToCells(map);
    gridLoS.make(cells, userCell, 2);
```
### Functions

* `settings({})`  

* `make(cells, playerPosition, range)`  
`range` being arbritarily how far the player should be able to "see" the cells.  
Return value: `{ intersectingCells, cellsInShadow, polylines, cells }`

* `mapToCells([])`  
Convert a readable map of cells (0: passable, 1: obstacle) to cell objects.

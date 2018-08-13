window.onload = function () {
    let cellW = 28, cellH = 28;
    gridLoS.settings({
        async: true,
        asyncDelay: 0,
        cellVisibleProp: "isVisible",
        cellObstacleProp: "isObstacle",
        cellWidth: cellW,
        cellHeight: cellH
    });

    let map = [
        //                             @
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], //@
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let user = { x: 10, y: 10 };
    let showPolygons = false;

    async function draw() {
        let cells = gridLoS.mapToCells(map);
        console.time("make");
        let result = await gridLoS.make(cells, user, 20);
        console.timeEnd("make");
        let polylines = result.polylines;
        let intersectingCells = result.intersectingCells;
        let cellsInShadow = result.cellsInShadow;

        var canvas = document.getElementById("canvas");
        canvas.width = cellW * map[0].length;
        canvas.height = cellH * map.length;

        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cells.forEach(c => {
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = "#424242";
            if (c.x == user.x && c.y == user.y) {
                ctx.fillStyle = "#5882FA";
            } else if (c.isObstacle) {
                ctx.fillStyle = "#000000";
            } else if (intersectingCells.indexOf(c) > -1) {
                ctx.fillStyle = c.isVisible ? "#F2F2F2" : "#A4A4A4";
            } else if (!c.isVisible) {
                ctx.fillStyle = "#848484";
            }
            ctx.fillRect(c.x * cellW, c.y * cellH, cellW, cellH);
            ctx.strokeRect(c.x * cellW, c.y * cellH, cellW, cellH);
        });

        if (showPolygons) {
            ctx.strokeStyle = "#084B8A";
            polylines.forEach(poly => {
                poly.forEach(line => {
                    let start = line[0];
                    let end = line[1];
                    ctx.beginPath();
                    ctx.moveTo(start[0], start[1]);
                    ctx.lineTo(end[0], end[1]);
                    ctx.stroke();
                });
            });
        }
    }

    document.onkeyup = (event) => {
        let x = event.which || event.keyCode;
        let dir = {
            37: "left",
            39: "right",
            40: "down",
            38: "up"
        }[x];
        if (dir === "right") {
            user.x += 1;
        } else if (dir === "left") {
            user.x -= 1;
        } else if (dir === "up") {
            user.y -= 1;
        } else if (dir === "down") {
            user.y += 1;
        }
        draw();
    };

    document.getElementById("check").addEventListener("change", () => {
        showPolygons = !showPolygons;
        draw();
    });

    draw();
};
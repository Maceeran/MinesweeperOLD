function fillTable(){
    var table = document.getElementById("gameTable");
    var i = 0, j = 0;
    var iLimit = parseInt(document.getElementById("height").value);
    var jLimit = parseInt(document.getElementById("width").value);
    document.getElementById("form").style.visibility="hidden";
    document.getElementById("button").style.visibility="hidden";

    var scoreTable = document.getElementById("scoreTable")
    
    var row = scoreTable.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = "Mines:";
    var cell = row.insertCell();
    cell.innerHTML = "";
    cell.setAttribute("id", "mineCountCell");

    while(i<iLimit){
    var row = table.insertRow();
        while(j<jLimit){
            var cell = row.insertCell();
            var button = document.createElement("BUTTON");
            button.setAttribute("class", "cellButton");
            var str = "r" + i + "c" + j;
            button.setAttribute("id",str);
            button.setAttribute("row",i);
            button.setAttribute("col",j);
            button.setAttribute("neighborMines",0);
            button.setAttribute("visited",0);
            if ( Math.random() <  parseFloat(document.getElementById("minerate").value)) {
                button.setAttribute("mine", 1);
                document.getElementById("mineCountCell").innerHTML++;
            }
            else {
                button.setAttribute("mine", 0);
            }
            button.addEventListener("click", minesweeper);
            cell.appendChild(button);
            j++;
        }
        j = 0;
        i++;
    }
    i = 0;
    j = 0;
    
    while(i<iLimit){
        while (j<jLimit){
            var str = "r" + i + "c" + j;
            var button = document.getElementById(str)
            if(button.getAttribute("mine") == 1){
                if(i > 0 && j > 0){
                    str = "r" + (i - 1) + "c" + (j - 1);
                    var button = document.getElementById(str);
                    button.setAttribute("neighborMines", (parseInt(button.getAttribute("neighborMines")) + 1));
                };
                if(i > 0){
                    str = "r" + (i - 1) + "c" + j;
                    var button = document.getElementById(str);
                    button.setAttribute("neighborMines", (parseInt(button.getAttribute("neighborMines")) + 1));
                };
                if(i > 0 && j < jLimit-1){
                    str = "r" + (i - 1) + "c" + (j + 1);
                    var button = document.getElementById(str);
                    button.setAttribute("neighborMines", (parseInt(button.getAttribute("neighborMines")) + 1));
                };
                if(j > 0){
                    str = "r" + i + "c" + (j - 1);
                    var button = document.getElementById(str);
                    button.setAttribute("neighborMines", (parseInt(button.getAttribute("neighborMines")) + 1));
                };
                if(j < jLimit-1){
                    str = "r" + i + "c" + (j + 1);
                    var button = document.getElementById(str);
                    button.setAttribute("neighborMines", (parseInt(button.getAttribute("neighborMines")) + 1));
                };
                if(i < iLimit-1 && j > 0){
                    str = "r" + (i + 1) + "c" + (j - 1);
                    var button = document.getElementById(str);
                    button.setAttribute("neighborMines", (parseInt(button.getAttribute("neighborMines")) + 1));
                };
                if(i < jLimit-1){
                    str = "r" + (i + 1) + "c" + j;
                    var button = document.getElementById(str);
                    button.setAttribute("neighborMines", (parseInt(button.getAttribute("neighborMines")) + 1));
                };
                if(i < iLimit-1 && j <jLimit-1){
                    str = "r" + (i + 1) + "c" + (j + 1);
                    var button = document.getElementById(str);
                    button.setAttribute("neighborMines", (parseInt(button.getAttribute("neighborMines")) + 1));
                };
            };
                j++;
        };
        i++;
        j = 0;
    };
};

function minesweeper(){

    if (this.getAttribute("mine") == 1){
        this.innerHTML = "X";
        this.style.cssText = "background-color: red";
        return; 
    }
    if (this.getAttribute("neighborMines") != 0){
        this.innerHTML = this.getAttribute("neighborMines");
        this.style.cssText = "Background-color: #ccffcc"
        return;
    }
    scanNeighbors(this.getAttribute("row"), this.getAttribute("col"));
};

function scanNeighbors(thisRow, thisCol){
    thisRow = parseInt(thisRow);
    thisCol = parseInt(thisCol);
    var iLimit = parseInt(document.getElementById("height").value);
    var jLimit = parseInt(document.getElementById("width").value);
    var neighborId = "r" + (thisRow) + "c" + (thisCol);
    if (parseInt(document.getElementById(neighborId).getAttribute("visited")) == 1){
        return;
    }
    document.getElementById(neighborId).setAttribute("visited", 1);

    neighborId = "r" + (thisRow - 1) + "c" + (thisCol - 1);
    if (thisRow > 0 && thisCol > 0){
        if (parseInt(document.getElementById(neighborId).getAttribute("neighborMines")) == 0){
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
            scanNeighbors(thisRow - 1, thisCol - 1);
        }
        else{
            document.getElementById(neighborId).innerHTML = document.getElementById(neighborId).getAttribute("neighborMines");
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
        }
    }

    var neighborId = "r" + (thisRow - 1) + "c" + (thisCol);
    if (thisRow > 0){
        if (parseInt(document.getElementById(neighborId).getAttribute("neighborMines")) == 0){
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
            scanNeighbors(thisRow - 1, thisCol);
        }
        else{
            document.getElementById(neighborId).innerHTML = document.getElementById(neighborId).getAttribute("neighborMines");
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
        }
    }

    var neighborId = "r" + (thisRow - 1) + "c" + (thisCol + 1);
    if (thisRow > 0 && thisCol < jLimit-1){
        if (parseInt(document.getElementById(neighborId).getAttribute("neighborMines")) == 0){
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
            scanNeighbors(thisRow - 1, thisCol + 1);
        }
        else{
            document.getElementById(neighborId).innerHTML = document.getElementById(neighborId).getAttribute("neighborMines");
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
        }
    }

    var neighborId = "r" + thisRow + "c" + (thisCol - 1);
    if (thisCol > 0){
        if (parseInt(document.getElementById(neighborId).getAttribute("neighborMines")) == 0){
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
            scanNeighbors(thisRow, thisCol - 1);
        }
        else{
            document.getElementById(neighborId).innerHTML = document.getElementById(neighborId).getAttribute("neighborMines");
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
        }
    }

    var neighborId = "r" + thisRow + "c" + (thisCol + 1);
    if (thisCol < jLimit-1){
        if (parseInt(document.getElementById(neighborId).getAttribute("neighborMines")) == 0){
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
            scanNeighbors(thisRow, thisCol + 1);
        }
        else{
            document.getElementById(neighborId).innerHTML = document.getElementById(neighborId).getAttribute("neighborMines");
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
        }
    }

    var neighborId = "r" + (thisRow + 1) + "c" + (thisCol - 1);
    if (thisRow < iLimit-1 && thisCol > 0){
        if (parseInt(document.getElementById(neighborId).getAttribute("neighborMines")) == 0){
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
            scanNeighbors(thisRow + 1, thisCol - 1);
        }
        else{
            document.getElementById(neighborId).innerHTML = document.getElementById(neighborId).getAttribute("neighborMines");
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
        }
    }

    var neighborId = "r" + (thisRow + 1) + "c" + thisCol;
    if (thisRow < iLimit-1){
        if (parseInt(document.getElementById(neighborId).getAttribute("neighborMines")) == 0){
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
            scanNeighbors(thisRow + 1, thisCol);
        }
        else{
            document.getElementById(neighborId).innerHTML = document.getElementById(neighborId).getAttribute("neighborMines");
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
        }
    }

    var neighborId = "r" + (thisRow + 1) + "c" + (thisCol + 1);
    if (thisRow < iLimit-1 && thisCol < jLimit-1){
        if (parseInt(document.getElementById(neighborId).getAttribute("neighborMines")) == 0){
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
            scanNeighbors(thisRow + 1, thisCol + 1);
        }
        else{
            document.getElementById(neighborId).innerHTML = document.getElementById(neighborId).getAttribute("neighborMines");
            document.getElementById(neighborId).style.cssText = "Background-color: #ccffcc";
        }
    }
}

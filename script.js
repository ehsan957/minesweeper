function generateBoard(c, r) {
    console.log("Hi");
    const body = document.body;
    board = document.createElement("table");
    //board.classList.add("table");
    // board.classList.add("table-bordered");
    for (let i = 0; i < r; i++) {
        tr = board.insertRow();
        for (let j = 0; j < c; j++) {
            td = tr.insertCell();
            td.appendChild(createButtons(i, j));
        }
    }
    body.appendChild(board);

}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function createButtons(x, y) {

    btn = document.createElement("button");
    btn.classList.add("cell");
    
    btn.setAttribute("x", x);
    btn.setAttribute("y", y);
    btn.onclick = function () {
        if(this.getAttribute("mine") == "1"){
            fire = document.createElement('i');
            fire.classList.add("bi");
            fire.classList.add("bi-fire");
            this.appendChild(fire);
            alert("You lose!");
            
        }
        else
            this.textContent = neighborMines(this);
        
    };
    btn.oncontextmenu = function () {
        mark = document.createElement('i');
        mark.classList.add("bi");
        mark.classList.add("bi-flag-fill");
        this.appendChild(mark);
    };
    if(getRandomInt(5)<1){
        btn.setAttribute("mine",1);
    }
    else{
        btn.setAttribute("mine",0);
    }
    return btn;

}
function neighborMines(btn){
    x = parseInt(btn.getAttribute("x"));
    y = parseInt(btn.getAttribute("y"));
    count = 0;
    allButtons = document.getElementsByClassName('cell');
    for (i = 0; i < allButtons.length; i++){
        nodeX = parseInt(allButtons[i].getAttribute("x"));
        nodeY= parseInt(allButtons[i].getAttribute("y"));
        if(Math.abs(x - nodeX) <= 1 & Math.abs(y - nodeY) <= 1){
            if(x==nodeX & y==nodeY){

            }
            else
                count = count + parseInt(allButtons[i].getAttribute("mine"));
        }
    }
    console.log(count);
    return count;
}
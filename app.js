//1- making board
//2- specify bomb squares and valid squars
//3- give each square an id
//4 -listen for click function and checking for bombs in 8 directions of square we clicked
//5- return if game over / is ckecked / flag / total is bigger than 0
//6- if its none of the above conditions check squares around it till find a number(chechSquare function)

document.addEventListener('DOMContentLoaded',() => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let bombAmount = 10;
    let flags = 0;
    let squares = [];
    let isGameOver = false;
    
    //creat board

    function createBoard(){
        //adding bombs and valid squares with array
        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width*width - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);

        //random place for arrays value
        const mixArray = gameArray.sort(() => Math.random() - 0.5);

        //make 100 divs and asing bomb and valid classes to it
        for(let i = 0; i < width*width; i++) {
            let square = document.createElement('div') ;
            square.setAttribute('id', i);
            square.classList.add(mixArray[i]);
            grid.appendChild(square);
            squares.push(square);


        //listen for left click
            square.addEventListener('click',function(e){
                click(square);
            });
            //CTRL and left click
            square.oncontextmenu = function (e) {
                addFlag(square);
                e.preventDefault();
            }
        }


        //add numbers 
        for (let i = 0; i < squares.length; i++){

            let total = 0;
            //special conditions (left/right edge)
            const leftEdge = (i % width === 0);
            const rightEdge = (i % width === width -1);


            //condition for all directions (8 direction)
            if (squares[i].classList.contains('valid')){
                //north west side
                if ( i > 10 && !leftEdge &&  squares[i -1 -width].classList.contains('bomb'))
                total ++;
                //north side
                if ( i > 9 && squares[i -width].classList.contains('bomb'))
                total ++;
                //north east side
                if ( i > 9 && !rightEdge && squares[i +1 -width].classList.contains('bomb'))
                total ++;
                //east (right) side
                if ( i < 99 && !rightEdge && squares[i +1].classList.contains('bomb'))
                total ++;
                //south east side
                if ( i < 89 && !rightEdge && squares[i +1 +width].classList.contains('bomb'))
                total ++;
                //south side
                if (i < 90 && squares[i +width].classList.contains('bomb'))
                total ++;
                //south west side
                if ( i < 90 && !leftEdge && squares[i -1 +width].classList.contains('bomb'))
                total ++;
                //west (left) side
                if ( i > 0 && !leftEdge && squares[i -1 ].classList.contains('bomb'))
                total ++;
                
                squares[i].setAttribute('data', total);
                console.log(squares[i]);
            }



        }

    }
    createBoard();
    //add flag with right click
    function addFlag(square){
     if (isGameOver) 
     return;
     if (!square.classList.contains('checked') && (flags < bombAmount)){
        if(!square.classList.contains('flag')){
            square.classList.add('flag');
            square.innerHTML = '🚩';
            flags ++;
            checkForWin();
            square.classList.add("flagview")

        } else {
            square.classList.remove('flag');
            square.innerHTML = '';
            flags --;
            square.classList.remove("flagview")
        }
     }
    }

    //click function
    function click(square) {

        let currentId = square.id;
        // game over
        if (isGameOver)
         return;
         //flag
        if (square.classList.contains('checked') || square.classList.contains('flag')) 
         return;
        if (square.classList.contains('bomb')) {
            gameOver(square);
        } else {
            let total = square.getAttribute('data');

            if (total != 0 ){
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            
            checkSquare(square, currentId);
            square.classList.add('checked');
        }
        
    }



    //ckecking neighbor squares when square is clicked (8 neighbors)
    function checkSquare(square, currentId){
        const leftEdge = (currentId % width === 0);
        const rightEdge = (currentId % width === width -1);

        setTimeout(() => {
            //north west side
            if (currentId > 10 && !leftEdge){
                const newId = squares[parseInt(currentId) -1 -width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare, newId);
            }
            //north side
            if (currentId > 9){
                const newId = squares[parseInt(currentId) -width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare, newId);
            }
            //north east side
            if (currentId > 9 && !rightEdge){
                const newId = squares[parseInt(currentId) +1 -width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare, newId);
            }
            //east (right) side
            if (currentId < 99 && !rightEdge){
                const newId = squares[parseInt(currentId) +1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare, newId);
            }
            //south east side
            if (currentId < 89 && !rightEdge){
                const newId = squares[parseInt(currentId) +1 +width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare, newId);
            }
            //south side
            if (currentId < 90 ){
                const newId = squares[parseInt(currentId) +width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare, newId);
            }
            //south west side
            if (currentId <90 && !leftEdge){
                const newId = squares[parseInt(currentId) -1 +width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare, newId);
            }
            //west (left) side
            if (currentId > 0 && !leftEdge){
                const newId = squares[parseInt(currentId) -1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare, newId);
            }



        },10);

    }

    //game over
    function gameOver(square){
        alert('You lose');
        isGameOver = true;

        //show bombs when game over
        squares.forEach(square => {
            if (square.classList.contains('bomb')){

                square.innerHTML = '💣';
                square.classList.add("bombview")
                
            }
        });
    }

    //Win
    function checkForWin(){
        let matches = 0;

        for (let i = 0; i < squares.length; i++){
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
                matches ++;
            }
            if (matches === bombAmount){
            alert('You Win');
            isGameOver = true;
            }
        }
    }
});
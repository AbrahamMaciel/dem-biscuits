const $messageBoard = document.querySelector('.message-board');
const $board = document.querySelector('.board');
const $squares = document.querySelectorAll('.square');
const $squaresColors = document.querySelectorAll('.color');

let $firstSquare = null;
let $clickedSquares = 1;
let $turns = 0;

function configureGame() {
    const baseColors = ['#ff6600', '#3333ff', '#ff99cc', 'yellow', '#26ff60', 'salmon', '#26c5ff', '#b326ff'];
    const repeatedColors = baseColors.concat(baseColors);
    randomizeColors($squaresColors, repeatedColors);
    eventHandler($board);
}

function randomizeColors($squaresColors, repeatedColors) {
    const randomizedColors = repeatedColors.sort(function() {
        return 0.5 - Math.random();
    });

    randomizedColors.forEach(function(color, i) {
        $squaresColors[i].style.background = color;
    });
}

function eventHandler($board) {
    $board.onclick = function(e) {
        const $element = e.target;
        
        if ($element.classList.contains('color')) {
            squareClickHandler($element);
        }
    };
}

function showSquareColor($target) {
    $target.style.opacity = 1;
}

function deleteSquare($childSquare) {
    setTimeout(function() {
        $childSquare.parentElement.classList.add('done');
        $childSquare.style.opacity = 0;
        checkStatus();
    }, 500);
}

function hideSquare($square) {
    setTimeout(function() {
        $square.style.opacity = 0;
    }, 500);
}

function sameSquares($firstSquare, $secondSquare) {
    const $firstColor = $firstSquare.style.background;
    const $secondColor = $secondSquare.style.background;

    if($clickedSquares >= 1) {
        $clickedSquares = 0;
        return $firstColor === $secondColor;
    }
    return false;
}

function squareDone($square) {
    return($square.parentElement.classList.contains('done'));
}

function squareClickHandler($currSquare) {
    if(squareDone($currSquare)) {
        return;
    }

    showSquareColor($currSquare);

    if($firstSquare === null) {
        $firstSquare = $currSquare;
    } else {
        // I believe that this one is to avoid ruining the firstSquare when clicking twice
        if($currSquare === $firstSquare) { 
            return; 
        }

        $clickedSquares++;
    
        if(sameSquares($firstSquare, $currSquare)) {
            $turns++;
            deleteSquare($firstSquare);
            deleteSquare($currSquare);
            // checkStatus();
            //if i left this then cypress cant get to the end of the game
        } else {
            $turns++;
            hideSquare($firstSquare);
            hideSquare($currSquare);
        }
        $firstSquare = null;
    }
}

function checkStatus() {
    const doneSquares = document.getElementsByClassName('done').length;
    console.log(doneSquares);
    const test = document.querySelectorAll('.square');
    test.forEach((element)=>{
        console.log(element);
    });
    

    if(doneSquares === 14) {
        setTimeout(()=>{
            endGame();
        }, 1000);
    }
}

function endGame() {
    const results = document.querySelector('.results');

    $messageBoard.classList.remove('hidden');
    $board.classList.add('hidden'); 
    results.textContent = 'Solo te tomo ' + $turns + ' turnos.';
}

configureGame();
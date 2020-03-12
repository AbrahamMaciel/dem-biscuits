const $board = document.querySelector('.board');
const $squares = document.querySelectorAll('.square');
const $squaresColors = document.querySelectorAll('.color');

let $firstSquare = null;
let $clickedSquares = 1;

function configureGame() {
    const baseColors = ['red', 'blue', 'green', 'yellow', '#26ff60', 'salmon', '#26c5ff', '#b326ff'];
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
    console.log('bruh ' + $clickedSquares);

    console.log($firstColor + ' ' + $secondColor);
    if($clickedSquares >= 1) {
        $clickedSquares = 0;
        return $firstColor === $secondColor;
    }
    return false;
}

function squareClickHandler($currSquare) {
    showSquareColor($currSquare);

    if($firstSquare === null) {
        $firstSquare = $currSquare;
    } else {
        // I believe that this one is to avoid ruining the firstSquare when clicking twice
        if($currSquare === $firstSquare) { return; }

        $clickedSquares++;
    
        if(sameSquares($firstSquare, $currSquare)) {
            console.log('bien, boludo bien!');
            deleteSquare($firstSquare);
            deleteSquare($currSquare);
        } else {
            hideSquare($firstSquare);
            hideSquare($currSquare);
        }
        $firstSquare = null;
    }

    if(checkStatus()) {
        endGame();
    }
}

function checkStatus() {
    
}

function endGame() {

}

configureGame();
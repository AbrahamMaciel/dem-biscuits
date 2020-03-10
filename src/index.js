const $board = document.querySelector('.board');
const $squares = document.querySelectorAll('.square');
const $squaresColors = document.querySelectorAll('.color');

function configureGame() {
    const baseColors = ['red', 'blue', 'green', 'yellow', '#26ff60', 'salmon', '#26c5ff', '#b326ff'];
    const repeatedColors = baseColors.concat(baseColors);
    randomizeColors($squaresColors, repeatedColors);
}

function randomizeColors($squaresColors, repeatedColors) {
    const randomizedColors = repeatedColors.sort(function() {
        return 0.5 - Math.random();
    });

    randomizedColors.forEach(function(color, i) {
        $squaresColors[i].style.background = color;
    });
}

configureGame();
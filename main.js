//IMPORTANT: when selecting squares there is a limitation that makes that
//only a square can be pressed every 500ms, that means one has to wait
//until the opacity animation ends to select another square, kinda sucks but
//i can't find a way to solve it without modifying the animation times. 
//Also prevents from people presing squares rapidly and for some reason bugging
//the animations.

const $btn_start = document.querySelector('#btn_start');
var sequence = [];
var playerSequence = [];
var round = 1;

$btn_start.onclick = start_game;


function start_game() {
    playerSequence = [];

    lockStart();
    lockInput();
    updateStatus('machineTurn');
    sequence.push(newColor());
    showSequence(sequence);
    var humanTurnDelay = ((sequence.length+1)*1000);
    
    setTimeout(function() {
        unlockInput();
        updateStatus('humanTurn');
    }, humanTurnDelay);
}

function newColor() {
    new_color = getRandomInt(1,4);
    return new_color;
}

function showSequence(sequence) {
    sequence.forEach(function (item, index) {
        var machineTurnDelay = ((index + 1)*1000);

        setTimeout(function () {
            remarkSquare(item,false);
        }, machineTurnDelay);
    });
}

function remarkSquare(item, flag) {
    square = document.querySelector(`#square-${item}`);
    
    square.style.opacity = 1;
    square.style.borderColor = 'white';

    setTimeout(function() {
        square.style.opacity = .7;
        square.style.borderColor = 'black';
    }, 500);

    if (flag) {
        setTimeout(function () {
            unlockInput();
        }, 500);
    }
}

function lockStart() {
    $btn_start.onclick = function() {
        console.log('There is already a game in progress.');
        alert('There is already a game in progress.');
    }
}

function unlockStart() {
    $btn_start.onclick = function () {
        $container = document.querySelector('.container-fluid');
        round = 0;
        sequence = [];

        let orientation = '141deg';
        let color1 = '#4df1b2 30%';
        let color2 = '#48d3f6 50%';
        let color3 = '#7ce2b2 90%';
        $container.style.backgroundImage = 'linear-gradient(' + orientation + ',' + color1 + ',' + color2 + ',' + color3 + ')';
        
        $btn_start.textContent = 'Start!'

        updateRound();
        start_game();
    }
}

function lockInput() {
    console.log('locking now!');
    const $squares = document.querySelectorAll('.square');
    const $btn_start = document.querySelector('#btn_start');

    $squares.forEach(function($square){
        $square.onclick = function() {
            console.log('locked AF');
        }
    });
}

function unlockInput() {
    console.log('unlocking now!');

    const $squares = document.querySelectorAll('.square');

    $squares.forEach(function(item){
        item.onclick = function(event) {
            playerSequence.push(handleUserInput(event));
            
            if(compareSequences() && (playerSequence.length == sequence.length)) {
                updateStatus('win-msg');
                updateRound();

                setTimeout(function() {
                    start_game();
                }, 1000)
            }
        }
    });
}

function updateRound() {
    round++;
    $round = document.querySelector('.round-counter');

    $round.textContent = 'Round ' + round;
}

function compareSequences() {
    var result = true;

    playerSequence.forEach(function(item, squareIndex) {
        if(JSON.stringify(sequence[squareIndex]) != JSON.stringify(item)){
            lose();
            result = false;
        } else {
            updateStatus('win');
        }
    });

    return result;
}

function updateStatus(newStatus) {
    const $status = document.querySelector('.alert');
    const $message =document.querySelector('.message');

    switch(newStatus) {
        case 'machineTurn':
            $status.className = 'alert alert-primary';
            $status.textContent = 'Machine Turn';
            $message.className = 'message hidden align-middle';
        break;
        case 'humanTurn':
            $status.className = 'alert alert-success';
            $status.textContent = 'Player Turn';
        break;
        case 'lose':
            $status.className = 'alert alert-danger';
            $status.textContent = 'You Lose! Good Day Sir!';
            $message.className = 'message hidden align-middle';
            $btn_start.textContent = 'Start Again';
        break;
        case 'win':
            $status.className = 'alert alert-success';
            $status.textContent = 'You\'re doing great mate!';
        break;
        case 'win-msg':
            $message.className = 'message align-middle'
            $status.className = 'alert alert-success';
            $status.textContent = 'You\'re doing great mate!';
        break;
        default:
            $status.className = 'alert alert-primary';
            $status.textContent = 'Ready';
        break;
    }
}

function handleUserInput(event) {
    const $square = (event.target.id);
    
    lockInput();
    switch($square) {
        case 'square-1':
            remarkSquare(1, true);
            return 1;
        break;
        case 'square-2':
            remarkSquare(2, true);
            return 2;
        break;
        case 'square-3':
            remarkSquare(3, true);
            return 3;
        break;
        case 'square-4':
            remarkSquare(4, true);
            return 4;
        break;
        default:
            console.log('this shouldn\'t be happening');
    }
}

function lose() {
    $container = document.querySelector('.container-fluid');

    updateStatus('lose');
    lockInput();
    unlockStart();

    let orientation = '148deg';
    let color1 = 'rgba(215,39,39,1) 10%';
    let color2 = 'rgba(124,45,49,1) 50%';
    let color3 = 'rgba(37,146,168,1) 93%';
    $container.style.backgroundImage = 'linear-gradient(' + orientation + ',' + color1 + ',' + color2 + ',' + color3 + ')';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const $btn_start = document.querySelector('#btn_start');
var sequenceList = [];

$btn_start.onclick = function(event) {
    start_game(sequenceList);

    event.preventDefault();
};


function start_game(sequence) {
    lockInput();
    updateStatus('machineTurn');
    sequence.push(newColor());
    showSequence(sequence);
    
    setTimeout(function() {
        unlockInput();
        updateStatus('humanTurn');
    }, ((sequence.length+1)*1000));
}

function newColor() {
    new_color = getRandomInt(1,4);
    return new_color;
}

function showSequence(sequence) {
    sequence.forEach(function (item, index) {
        console.log(item, index);

        setTimeout(function () {
            remarkSquare(item);
        }, ((index + 1)*1000));
    });
}

function remarkSquare(item) {
    console.log('remarkando ' + item);
    square = document.querySelector(`#square-${item}`);
    
    square.style.opacity = 1;
    square.style.borderColor = 'white';

    setTimeout(function() {
        square.style.opacity = .7;
        square.style.borderColor = 'black';
    }, 500);
}

function lockInput() {
    console.log('locking now!');
    const $squares = document.querySelectorAll('.square');

    $squares.forEach(function($square){
        $square.onclick = function() {
            console.log('locked AF');
        }
    });
}

function unlockInput() {
    console.log('unlocking now!');

    const $squares = document.querySelectorAll('.square');

    $squares.forEach(function($square){
        $square.onclick = handleUserInput;
    });
}

function updateStatus(newStatus) {
    const $status = document.querySelector('.alert');

    switch(newStatus) {
        case 'machineTurn':
            $status.className = 'alert alert-primary';
            $status.textContent = 'Machine Turn';
        break;
        case 'humanTurn':
            $status.className = 'alert alert-success';
            $status.textContent = 'Player Turn';
        break;
        case 'lost':
            $status.className = 'alert alert-danger';
            $status.textContent = 'You Lose! Good Day Sir!';
        break;
        default:
            $status.className = 'alert alert-primary';
            $status.textContent = 'Ready';
    }

}

function handleUserInput(event) {
    const $square = (event.target.id);
    
    switch($square) {
        case 'square-1':
            remarkSquare(1);
        break;
        case 'square-2':
            remarkSquare(2);
        break;
        case 'square-3':
            remarkSquare(3);
        break;
        case 'square-4':
            remarkSquare(4);
        break;
        default:
            console.log('this shouldn\'t be happening');
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
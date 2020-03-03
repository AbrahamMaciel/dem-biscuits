const secondsHand = document.querySelector('.second-container');
const minutesHand = document.querySelector('.minute-container');
const hoursHand = document.querySelector('.hour-container');

function testHands() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds*6) + 90);
    
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes*6) + 90);

    const hours = now.getHours() % 12 || 12; //This is for 12hrs format
    const hoursDegrees = ((hours*30) + 90);
    
    //Fix for the 0 second bug, thanks thesagittariusme.blogspot!
    if(seconds===0) {
        secondsHand.classList.add('no-transition');
    }
    if(seconds===1) {
        secondsHand.classList.remove('no-transition');
    }
    
    secondsHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minutesHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hoursHand.style.transform = `rotate(${hoursDegrees}deg)`;

    console.log(hours + ':' + minutes + ':' + seconds);
}

setInterval(testHands, 1000);

testHands();
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');
const startSound = document.getElementById('startSound');
const stopSound = document.getElementById('stopSound');

document.getElementById('startBtn').onclick = start;
document.getElementById('pauseBtn').onclick = pause;
document.getElementById('resetBtn').onclick = reset;
document.getElementById('lapBtn').onclick = recordLap;

function start() {
    if (!running) {
        startSound.play(); // Play sound when starting
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        stopSound.play(); // Play sound when stopping
        startSound.pause(); // Stop the start sound if it's playing
        startSound.currentTime = 0; // Reset start sound to the beginning
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    lapsContainer.innerHTML = ''; // Clear lap times
    lapCount = 0; // Reset lap count
    startSound.pause(); // Stop the start sound if it's playing
    startSound.currentTime = 0; // Reset start sound to the beginning
    stopSound.pause(); // Stop the stop sound if it's playing
    stopSound.currentTime = 0; // Reset stop sound to the beginning
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('div');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.innerHTML = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return (time < 10) ? '0' + time : time; // Ensure two-digit format
}

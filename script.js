let timer;
let isRunning = false;
let isWorking = true; 
let workTime = 1500; 
let breakTime = 300; 
let timeLeft = workTime;
const totalWorkTime = 1500;
const totalBreakTime = 300;
let sessionCount = 0;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    isWorking = true;
    timeLeft = workTime;
    document.getElementById('timer-display').textContent = formatTime(timeLeft);
    updateCircle();
    updateStatus();
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer-display').textContent = formatTime(timeLeft);
        updateCircle();
    } else {
        clearInterval(timer);
        isRunning = false;
        if (isWorking) {
            sessionCount++;
            document.getElementById('session-count').textContent = sessionCount;
            alert("Sessão de trabalho completa! Hora de um intervalo.");
            isWorking = false;
            timeLeft = breakTime;
        } else {
            alert("Intervalo completo! Hora de voltar ao trabalho.");
            isWorking = true;
            timeLeft = workTime;
        }
        updateCircle();
        updateStatus();
        startTimer();
    }
}

function updateCircle() {
    const circle = document.getElementById('circle');
    const percentage = ((isWorking ? totalWorkTime - timeLeft : totalBreakTime - timeLeft) / (isWorking ? totalWorkTime : totalBreakTime)) * 100;
    circle.style.background = `conic-gradient(#745ec7 ${percentage}%, transparent ${percentage}%)`;
}

function updateStatus() {
    const status = document.getElementById('status');
    status.textContent = isWorking ? 'Trabalho' : 'Intervalo';
    status.style.color = isWorking ? '#745ec7' : '#FFA500';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('pause-button').addEventListener('click', pauseTimer);
document.getElementById('reset-button').addEventListener('click', resetTimer);

document.getElementById('timer-display').textContent = formatTime(timeLeft);
updateCircle();
updateStatus();

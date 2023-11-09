function validateInput(inputElement) {
  let inputValue = inputElement.value.replace(/\D/g, '');
  formattedValue = inputValue.padStart(2, '0');
  inputElement.value = formattedValue;
  // above code to format the input value from 0 1 2 3  to 00 01 02 03
  let maxValue = parseFloat(inputElement.getAttribute('max'));
  let userInput = parseFloat(inputElement.value);
  if (userInput > maxValue) {
    inputElement.value = maxValue;
  }
  let minValue = parseFloat(inputElement.getAttribute('min'));
  if (userInput < minValue) {
    inputElement.value = minValue;
  }
}

let start = document.getElementById("start");
let reset = document.getElementById("reset");

let min = document.getElementById("min");
let sec = document.getElementById("sec");

// store reference to variable
let startTimer = null;
let isTimerRunning = false;

function timer(){
  if (sec.value == 0 && min.value == 0) {
    sec.value = '00';
    min.value = '00';
    resetTimer();
  }
  else if (sec.value != 0) {
    sec.value = String(sec.value -1 ).padStart(2, '0');
  }
  else if (min.value !=0 && sec.value == 0) {
    sec.value = 59;
    min.value = String(min.value -1 ).padStart(2, '0');
  }
}

function resetTimer(){
  clearInterval(startTimer);
  isTimerRunning = false;
  updatePlayButton();
}

function updatePlayButton() {
  if (isTimerRunning) {
    start.innerHTML = '<span class="material-icons">pause</span>';
    start.classList.remove('play');
    start.classList.add('pause');
  }
  else {
    start.innerHTML = '<span class="material-icons">play_arrow</span>';
    start.classList.remove('pause');
    start.classList.add('play');
  }
}

start.addEventListener('click', function(){
  if (!isTimerRunning) {
    startTimer = setInterval(function (){
      timer();
    }, 1000);
    isTimerRunning = true;
  }
  else{
    resetTimer();
  }
  updatePlayButton();
});

reset.addEventListener('click', function(){
  min.value = '00';
  sec.value = '00';
  resetTimer();
  updatePlayButton();
});
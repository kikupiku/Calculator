function type () {
  let btn = document.querySelector('.button');
  btn.addEventListener('click', () => {
    div.display.textContent(input);
  })
}


function operate(numOne, numTwo) {

}

function add(numOne, numTwo) {
  return numOne + numTwo;
}

function subtract(numOne, numTwo) {
  return numOne - numTwo;
}

function multiply(numOne, numTwo) {
  return numOne * numTwo;
}

function divide(numOne, numTwo) {
  return numOne / numTwo;
}

function play() {
  let press = new Audio();
  press.src = "button-press.mp3";
  press.currentTime = 0;
  press.play();
}

let output = "";
let display = document.querySelector('.display');
let keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('click', (e) => {
  if (!e.target.classList.contains('button')) {
    ;                                 //so that nothing happens when I click a non-button area
  } else {
    switch (e.target.innerHTML) {
    case 'AC':
      display.innerHTML = "0";
      output = "";
      break;
    case '⌫':
      display.innerHTML = output.substring(0, (output.length -1));
      output = display.innerHTML;
      break;
    case '÷':
      output = display.innerHTML + '/';
      break;
    case '×':
      output = display.innerHTML + '*';
      break;
    case '=':
      display.innerHTML = eval(output);
      output = display.innerHTML;
      break;
    case '.':
      if (display.innerHTML.includes('.')) {
        ;
      } else {
        display.innerHTML = display.innerHTML + '.';
        output = display.innerHTML;
      }
      break;
    default:
      output += e.target.innerHTML;
      display.innerHTML = (output.length > 12) ? output.substring(0, 12): output;
      break;
    }
  }
});

function play() {
  let press = new Audio();
  press.src = "button-press.mp3";
  press.currentTime = 0;
  press.play();
}


//
// function operate(numOne, numTwo) {
//   if (output.includes("+")) {
//    return numOne + numTwo;
//  } else if (output.includes("-")) {
//    return numOne - numTwo;
//  } else if (output.includes("*")) {
//    return numOne * numTwo;
//  } else if (output.includes("/")) {
//    return numOne / numTwo;
//   } else {alert ('ERROR');
//   }
// }

// let zero = document.querySelector('#zero');
// let one = document.querySelector('#one');
// let two = document.querySelector('#two');
// let three = document.querySelector('#three');
// let four = document.querySelector('#four');
// let five = document.querySelector('#five');
// let six = document.querySelector('#six');
// let seven = document.querySelector('#seven');
// let eight = document.querySelector('#eight');
// let nine = document.querySelector('#nine');
// let button = document.querySelector('.button');
// let dividing = document.querySelector('#divide');
// let multiplying = document.querySelector('#multiply');
// let adding = document.querySelector('#add');
// let subtracting = document.querySelector('#subtract');

// function inputNumber() {
//   // button.addEventListener('click' () => {
//   //   switch () {
//   //     case
//   //   }
//   // })
//   zero.addEventListener('click', () => {display.innerHTML += 0});
//   one.addEventListener('click', () => {display.innerHTML += 1});
//   two.addEventListener('click', () => {display.innerHTML += 2});
//   three.addEventListener('click', () => {display.innerHTML += 3});
//   four.addEventListener('click', () => {display.innerHTML += 4});
//   five.addEventListener('click', () => {display.innerHTML += 5});
//   six.addEventListener('click', () => {display.innerHTML += 6});
//   seven.addEventListener('click', () => {display.innerHTML += 7});
//   eight.addEventListener('click', () => {display.innerHTML += 8});
//   nine.addEventListener('click', () => {display.innerHTML += 9});
//     output = display.innerHTML;
//     display.innerHTML = (output.length > 12) ? output.substring(0, 12): output;
//     console.log(trimmed);
//     // console.log(trimmed);
//    }

// inputNumber();
// // if (display.textContent.includes(/./g)) {
// //   dot.addEventListener('click', () => {display.innerHTML += ''});
// // }
// dot.addEventListener('click', () => {display.innerHTML += '.'});
//
// // display.textContent = `result: ${output}`;

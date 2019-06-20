let equationSides;
let key;
let output = "";
let friendlyMessage = document.querySelector('h2');
let display = document.querySelector('.display');
let keyboard = document.querySelector('.keyboard');

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('mousedown', playSound);
});

function playSound(argument) {
  let press = new Audio();
  press.src = "button-press.mp3";
  press.currentTime = 0;
  press.play();
}

function setNewState(message, displayContent, newOutput) {
  friendlyMessage.textContent = message;
  display.innerHTML = displayContent;
  output = newOutput;

  display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): display.innerHTML;
}

keyboard.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    switch (e.target.innerHTML) {
    case 'AC':
      setNewState("OK, let's start over.", "0", "");

      break;
    case '÷':
      setNewState("", (output + '/'), (output + '/'))
      break;
    case '×':
      setNewState("", (output + '*'), (output + '*'));
      break;
    case '⌫':
      let howLong = output;
      if (howLong.length === 1) {
        setNewState("A very good place to start...", '0', '');
      } else {
        let oldOutput = output;
        let cutOutput = oldOutput.substring(0, (oldOutput.length - 1));
        setNewState("Let's take that back.", cutOutput, cutOutput);
      }
      break;
    case '=':
      if (output.includes("/0")) {
        setNewState("I see you trying to destroy the world. Not today, Dormammu. Not today.", "0", "");
      } else {
        let oldOutput = output;
        let newOutput = eval(oldOutput);
        setNewState("", newOutput, newOutput);
      }
      break;
    case '.':
      let oldOutput = output;
      let subbedSymbolsOutput = '';
      for (let i = 0; i < oldOutput.length; i++) {
        if (['-', '*', '/'].includes(oldOutput[i])) {
          subbedSymbolsOutput += '+';
        } else {
          subbedSymbolsOutput += oldOutput[i];
        }
      }
      let equationSidesArray = oldOutput.split('+');
      if (equationSidesArray[equationSidesArray.length - 1].includes('.')) {
        setNewState('We have enough dots for now. If we need any more dots, I call.', oldOutput, oldOutput);
      } else {
        setNewState('I guess this dot can slip by. But pay heed, you may enter no more dots for this number.', (oldOutput + '.'), (oldOutput + '.'));
      }
      break;
    default:
      setNewState("", (output + e.target.innerHTML), (output + e.target.innerHTML));
      break;
    }
  }
});

document.addEventListener('keydown', logKey);
function logKey(e) {
  key = `${e.code}`;
  console.log(key);
    switch (key) {
    case 'Numpad0':
    case 'Digit0':
    case 'Numpad1':
    case 'Digit1':
    case 'Numpad2':
    case 'Digit2':
    case 'Numpad3':
    case 'Digit3':
    case 'Numpad4':
    case 'Digit4':
    case 'Numpad5':
    case 'Digit5':
    case 'Numpad6':
    case 'Digit6':
    case 'Numpad7':
    case 'Digit7':
    case 'Numpad8':
    case 'Digit8':
    case 'Numpad9':
    case 'Digit9':
      friendlyMessage.textContent = "";
      let numbah = key.split("").pop();
      console.log(numbah);
      output += numbah;
      display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): output;
      break;
    case 'NumpadAdd':
      friendlyMessage.textContent = "";
      output += '+';
      display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): output;
      break;
    case 'NumpadSubtract':
    case 'Minus':
      friendlyMessage.textContent = "";
      output += '-';
      display.innerHTML = output;
      break;
    case 'NumpadDivide':
      friendlyMessage.textContent = "";
      output += '/';
      display.innerHTML = output;
      break;
    case 'NumpadMultiply':
      friendlyMessage.textContent = "";
      output = output + '*';
      display.innerHTML = output;
      break;
    case 'Backspace':
      let howLong = display.innerHTML;
      if (howLong.length === 1) {
        friendlyMessage.textContent = "Let's just start from the very beginning!";
        display.innerHTML = "0";
        output = "";
      } else {
        friendlyMessage.textContent = "Oopsie, wrong number!";
        let less = output.substring(0, (output.length -1));
        display.innerHTML = less;
        output = display.innerHTML;
        display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): output;
      }
      break;
    case 'NumpadEnter':
    case 'Enter':
      let isItDormammu = display.innerHTML;
      if (isItDormammu.includes("/0")) {
        friendlyMessage.textContent = "I see you trying to destroy the world. Not today, Dormammu. Not today."
        display.innerHTML = "0";
        output = "";
      } else {
        friendlyMessage.textContent = "";
        display.innerHTML = eval(output);
        output = display.innerHTML;
        display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): output;
      }
      break;
    case 'NumpadDecimal':
    case 'Period':
      friendlyMessage.textContent = "";
      if (display.innerHTML.includes('.') && !display.innerHTML.includes("+") && !display.innerHTML.includes("-") && !display.innerHTML.includes("*") && !display.innerHTML.includes("/")) {
        ;
        friendlyMessage.textContent = 'No more dots on the left side of the equation, thank you.';
      } else if (display.innerHTML.includes('.') && (display.innerHTML.includes("+") || display.innerHTML.includes("-") || display.innerHTML.includes("*") || display.innerHTML.includes("/"))) {
        equationSides = display.innerHTML.replace('-', '+').replace('*', '+').replace('/', '+').split('+');
        for (let i = 1; i < equationSides.length; i++) {
          if (equationSides[i].includes('.')) {
            friendlyMessage.textContent = 'We have enough dots for now. If we need any more dots, I call.';
            ;
          } else {
            display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): display.innerHTML + '.';
            output = display.innerHTML;
            friendlyMessage.textContent = 'I guess this dot can slip by. But pay heed, you may enter no more dots for this number.';
          }
        }
      } else {
        display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): display.innerHTML + '.';
        output = display.innerHTML;
      }
      break;
    default:
      break;
    }
  }

// TODO fix the too many numbers display bug, and assign new output variable names

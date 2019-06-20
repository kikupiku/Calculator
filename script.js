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

function setNewState(message, displayContent) {
  friendlyMessage.textContent = message;
  display.innerHTML = displayContent;
  output = (display.innerHTML === "0") ? "" : displayContent;
  display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): display.innerHTML;
}

keyboard.addEventListener('click', (e) => {
  if (e.target.classList.contains('button')) {
    switch (e.target.innerHTML) {
    case 'AC':
      setNewState("OK, let's start over.", "0");
      break;
    case '÷':
      setNewState("", (output + '/'))
      break;
    case '×':
      setNewState("", (output + '*'));
      break;
    case '⌫':
      let howLong = output;
      if (howLong.length === 1) {
        setNewState("A very good place to start...", '0');
      } else {
        let oldOutput = output;
        let cutOutput = oldOutput.substring(0, (oldOutput.length - 1));
        setNewState("Let's take that back.", cutOutput);
      }
      break;
    case '=':
      if (output.includes("/0")) {
        setNewState("I see you trying to destroy the world. Not today, Dormammu. Not today.", "0");
      } else {
        let newOutput = eval(output).toString();
        setNewState("", newOutput);
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
        setNewState('We have enough dots for now. If we need any more dots, I call.', oldOutput);
      } else {
        setNewState('I guess this dot can slip by. But pay heed, you may enter no more dots for this number.', (oldOutput + '.'));
      }
      break;
    default:
      setNewState("", (output + e.target.innerHTML));
      break;
    }
  }
});

document.addEventListener('keydown', logKey);
function logKey(e) {
  key = `${e.code}`;
  console.log(key);
    switch (key) {
    case 'Numpad0': case 'Digit0': case 'Numpad1': case 'Digit1':
    case 'Numpad2': case 'Digit2': case 'Numpad3': case 'Digit3':
    case 'Numpad4': case 'Digit4': case 'Numpad5': case 'Digit5':
    case 'Numpad6': case 'Digit6': case 'Numpad7': case 'Digit7':
    case 'Numpad8': case 'Digit8': case 'Numpad9': case 'Digit9':
      let numbah = key.split("").pop();
      setNewState("", (output + numbah));
      break;
    case 'NumpadAdd':
      setNewState("", (output + '+'));
      break;
    case 'NumpadSubtract': case 'Minus':
      setNewState("", (output + '-'));
      break;
    case 'NumpadDivide': case 'Slash':
      setNewState("", (output + '/'));
      break;
    case 'NumpadMultiply':
      setNewState("", (output + '*'));
      break;
    case 'Backspace':
      let howLong = display.innerHTML;
      if (howLong.length === 1) {
        setNewState("Let's just start from the very beginning!", "0")
      } else {
        let less = output.substring(0, (output.length -1));
        setNewState("Oopsie, a typo!", less);
      }
      break;
    case 'NumpadEnter': case 'Enter':
      let dormammuOrNot = output;
      if (dormammuOrNot.includes("/0")) {
        setNewState("I see you trying to destroy the world. Not today, Dormammu. Not today.", "0");
      } else {
        let newOutput = eval(output).toString();
        setNewState("", newOutput);
      }
      break;
    case 'NumpadDecimal': case 'Period':
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
        setNewState('We have enough dots for now. If we need any more dots, I call.', oldOutput);
      } else {
        setNewState('I guess this dot can slip by. But pay heed, you may enter no more dots for this number.', (oldOutput + '.'));
      }
      break;
    default:
      break;
    }
  }

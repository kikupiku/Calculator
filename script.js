let equationSides;
let key;
let output = "";
let friendlyMessage = document.querySelector('h2');
let display = document.querySelector('.display');
let keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('click', operate);
document.addEventListener('keydown', operate);

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

function operate(e) {
  e.preventDefault();           // don't know why but it prevents weird behavior when combining keyboard and mouse clicks
  let key;

  if (e.code) {
    key = `${e.code}`
  } else if (e.target.classList.contains('button')){
    key = e.target.innerHTML
  }

  if (key) {
    switch (key) {
    case 'Numpad0': case 'Digit0': case '0':
    case 'Numpad1': case 'Digit1': case '1':
    case 'Numpad2': case 'Digit2': case '2':
    case 'Numpad3': case 'Digit3': case '3':
    case 'Numpad4': case 'Digit4': case '4':
    case 'Numpad5': case 'Digit5': case '5':
    case 'Numpad6': case 'Digit6': case '6':
    case 'Numpad7': case 'Digit7': case '7':
    case 'Numpad8': case 'Digit8': case '8':
    case 'Numpad9': case 'Digit9': case '9':
      let numbah = key.split("").pop();
      setNewState("You know that I am called the count, because I really love to...", (output + numbah));
      break;
    case 'NumpadAdd': case '+':
      setNewState("Plus...", (output + '+'));
      break;
    case 'NumpadSubtract': case 'Minus': case '-':
      setNewState("Minus...", (output + '-'));
      break;
    case 'NumpadDivide': case 'Slash': case '÷':
      setNewState("Divided by...", (output + '/'));
      break;
    case 'NumpadMultiply': case '×':
      setNewState("Times...", (output + '*'));
      break;
    case 'Backspace': case '⌫':
      let howLong = display.innerHTML;
      if (howLong.length === 1 || howLong === "0") {
        console.log(output);
        setNewState("Let's just start from the very beginning!", "0")
      } else {
        let less = output.substring(0, (output.length - 1));
        setNewState("Oopsie, a typo!", less);
      }
      break;
    case 'NumpadEnter': case 'Enter': case '=':
      let dormammuOrNot = output;
      if (dormammuOrNot.includes("/0")) {
        setNewState("Nope nope nope nope nope. Non sequitur.", "0");
      } else {
        let newOutput = eval(output).toString();
        setNewState("Roger roger. Your result is...", newOutput);
      }
      break;
    case 'NumpadDecimal': case 'Period': case '.':
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
        setNewState('Told ya, we have enough dots for now. If we need any more dots, I call.', oldOutput);
      } else {
        setNewState('This dot can slip by. But you may enter no more dots for this number.', (oldOutput + '.'));
      }
      break;
    case 'AC': case 'Escape':
      setNewState("OK, let's start over.", "0");
      break;
    }
  }
}

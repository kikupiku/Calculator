let equationSides;
let key;
let output = "";
let friendlyMessage = document.querySelector('h2');
let display = document.querySelector('.display');
let keyboard = document.querySelector('.keyboard');

document.addEventListener('keydown', logKey);

keyboard.addEventListener('click', (e) => {
  if (!e.target.classList.contains('button')) {
    ;                                 //so that nothing happens when I click a non-button area
  } else {
    switch (e.target.innerHTML) {
    case 'AC':
      friendlyMessage.textContent = "OK, let's start over.";
      display.innerHTML = "0";
      output = "";
      break;
    case '÷':
      friendlyMessage.textContent = "";
      output = output + '/';
      display.innerHTML = output;
      break;
    case '×':
      friendlyMessage.textContent = "";
      output = output + '*';
      display.innerHTML = output;
      break;
    case '⌫':
      friendlyMessage.textContent = "Let's take that back.";
      let howLong = display.innerHTML;
      if (howLong.length === 1) {
        display.innerHTML = "0";
        output = "";
      } else {
        output = display.innerHTML;
        friendlyMessage.textContent = "";
        let less = output.substring(0, (output.length -1));
        display.innerHTML = less;
        output = display.innerHTML;
        display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): output;
      }
      break;
    case '=':
      if (display.innerHTML.includes("/0")) {
        friendlyMessage.textContent = "I see you trying to destroy the world. Not today, Dormammu. Not today."
        display.innerHTML = "0";
        output = "";
      } else {
        output = display.innerHTML;
        friendlyMessage.textContent = "";
        display.innerHTML = eval(output);
        output = display.innerHTML;
        display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): output;
      }
      break;
    case '.':
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
            display.innerHTML = display.innerHTML + '.';
            output = display.innerHTML;
            friendlyMessage.textContent = 'I guess this dot can slip by. But pay heed, you may enter no more dots for this number.';
          }
        }
      } else {
        display.innerHTML = display.innerHTML + '.';
        output = display.innerHTML;
      }
      break;
    default:
      friendlyMessage.textContent = "";
      output += e.target.innerHTML;
      display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): output;
      break;
    }
  }
});

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
      display.innerHTML = output;
      break;
    case 'NumpadAdd':
      friendlyMessage.textContent = "";
      output += '+';
      display.innerHTML = output;
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
            display.innerHTML = display.innerHTML + '.';
            output = display.innerHTML;
            friendlyMessage.textContent = 'I guess this dot can slip by. But pay heed, you may enter no more dots for this number.';
          }
        }
      } else {
        display.innerHTML = display.innerHTML + '.';
        output = display.innerHTML;
      }
      break;
    default:
      break;
    }
  }


function play() {
  let press = new Audio();
  press.src = "button-press.mp3";
  press.currentTime = 0;
  press.play();
}

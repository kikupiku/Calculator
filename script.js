let equationSides;
let output = "";
let friendlyMessage = document.querySelector('h2');
let display = document.querySelector('.display');
let keyboard = document.querySelector('.keyboard');
let sign = ["*", "+", "-", "/"];

keyboard.addEventListener('click', (e) => {
  if (!e.target.classList.contains('button')) {
    ;                                 //so that nothing happens when I click a non-button area
  } else {
    switch (e.target.innerHTML) {
    case 'AC':
      friendlyMessage.textContent = "";
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
      friendlyMessage.textContent = "";
      let less = output.substring(0, (output.length -1));
      display.innerHTML = less;
      output = display.innerHTML;
      display.innerHTML = (output.length > 12) ? (output.substring(0, 10) + "…"): output;
      break;
    case '=':
      if (display.innerHTML.includes("/0")) {
        friendlyMessage.textContent = "I see you trying to destroy the world. Not today, Dormammu. Not today."
        display.innerHTML = "0";
        output = "";
      } else if (display.innerHTML = "0"){
        display.innerHTML = "0";
        friendlyMessage.textContent = "Slow down! You have to put in a number first, buddy.";
      } else {
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

function play() {
  let press = new Audio();
  press.src = "button-press.mp3";
  press.currentTime = 0;
  press.play();
}

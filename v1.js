javascript:(function(){
  const motivationalQuestions = [
    "What's one positive thing you accomplished in the last 10 minutes?",
    "How did you make the most of the last 10 minutes to work towards your goals?",
    "What challenges did you face in the last 10 minutes, and how did you overcome them?",
    "In the past 10 minutes, what inspired you or gave you a sense of purpose?",
    "Did you learn something new or gain a valuable insight in the last 10 minutes?",
    "How did you demonstrate determination and resilience in the past 10 minutes?",
    "What small steps did you take in the last 10 minutes to improve your day?",
    "Who supported or motivated you in the last 10 minutes, and how did it help?",
    "What did you do in the last 10 minutes to practice self-care and recharge?",
    "How can you carry the motivation and positivity from the last 10 minutes into the next part of your day?",
    "Keep me motivated",
  ];

  const host = window.location.host;

  let promptField;
  let submitButton;

  let submitPrompt;

  let setText = () => {
    let prev = promptField.value;
    promptField.value = motivationalQuestions[Math.floor(Math.random() * motivationalQuestions.length)];
    return prev;
  }


  const triggerReactOnChangeEvent = (element) => {
  let ev = new Event('change');
  Object.defineProperty(ev, 'target', {writable: false, value: element});
  let reactEventHandlersName = Object.keys(element).filter(key => key.match('Props'));
  element[reactEventHandlersName].onChange(ev);
}

  if(host==="chat.openai.com") {
    promptField = document.querySelector('#prompt-textarea');
    submitButton = [...promptField.parentElement.querySelectorAll('button')].pop();
    submitPrompt = (prev) => {
      let myEvent = new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertText',
        data: 'Your text here',
      });
      promptField.dispatchEvent(myEvent);
      setTimeout(() => {
        submitButton.click();
        promptField.value = prev;
      }, 400);
    };
  }else if(host==="pi.ai") {
    promptField = document.querySelectorAll("textarea")[0];
    submitButton = [...promptField.parentElement.parentElement.querySelectorAll('button')].pop();
    submitPrompt = (prev) => {
      triggerReactOnChangeEvent(promptField);
      setTimeout(() => {
        submitButton.click();
        promptField.value = prev;
      }, 400);
    };
  }else if(host==="claude.ai"){
    setText = () => {
      promptField = [...document.querySelectorAll('div div div fieldSet p')].pop();
      let prev = promptField.innerText;
      promptField.innerText = motivationalQuestions[Math.floor(Math.random() * motivationalQuestions.length)];
      return prev;
    }
    submitPrompt = (prev) => {
      setTimeout(() => {
        submitButton= [...document.querySelectorAll('fieldset button')].pop();
        submitButton.click();
        setTimeout(() => {
          promptField = [...document.querySelectorAll('div div div fieldSet p')].pop();
          promptField.innerText = prev;
          }, 1000);
      }, 400);
    };
  }

  function updatePromptText() {
    let prev = setText();
    submitPrompt(prev);
  }

  let timerSound = 0;
  let timerPrompt = 0;
  let timerVideo = 0;
  const videoTime = 1200000; // 20 minutes in milliseconds
  const waitTime = 600000;
  let mod = 1;
  const max_mod = 10;

  function debouncePrompt() {
    clearTimeout(timerPrompt); 
    // Clear the previous timer
    timerPrompt = setTimeout(updatePromptText, waitTime); 
    // Set a new 10-minute timer
  }


  function debounceSound() {
    clearTimeout(timerSound); 
    // Clear the previous timer
    // timerSound = setTimeout(()=>playBeepSound(mod), waitTime / mod);
    mod = Math.max(max_mod, mod + 2);
     // make time faster
  }

  // function debounceVideo() {
  //   clearTimeout(timerVideo); 
  //   // Clear the previous timer
  //   timerVideo = setTimeout(() => {
  //     window.open('https://www.youtube.com/embed/E5XvUOxL6VQ?si=N6CU_ddd3hSKfVDu');
  //   }, videoTime);
  // }

  const x = document.querySelector('#prompt-textarea');
  if (x) {
    x.addEventListener('input', () => {
      debouncePrompt();
      debounceSound();
      // debounceVideo();
    });
    x.addEventListener('keydown', () => {
      mod = Math.max(1, mod - 1);
    });
  }
  updatePromptText();
})();
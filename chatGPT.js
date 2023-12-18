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
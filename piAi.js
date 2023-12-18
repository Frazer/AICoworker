promptField = document.querySelectorAll("textarea")[0];
submitButton = [...promptField.parentElement.parentElement.querySelectorAll('button')].pop();

let triggerReactOnChangeEvent = (element) => {
  let ev = new Event('change');
  Object.defineProperty(ev, 'target', {writable: false, value: element});
  let reactEventHandlersName = Object.keys(element).filter(key => key.match('Props'));
  element[reactEventHandlersName].onChange(ev);
}
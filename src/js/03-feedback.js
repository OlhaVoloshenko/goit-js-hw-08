import throttle from 'lodash.throttle';

const feedbackFormKey = 'feedback-form-state';

const formElement = document.querySelector('.feedback-form');
const emailElement = formElement.elements.email;
const messageElement = formElement.elements.message;

const savedForm = load(feedbackFormKey) ? load(feedbackFormKey) : { email: '', message: '' };

emailElement.value = savedForm.email;
messageElement.value = savedForm.message;

formElement.addEventListener('input', throttle(onInput, 500));
formElement.addEventListener('submit', onSubmit);

function onInput() {
  savedForm.email = emailElement.value;
  savedForm.message = messageElement.value;
  save(feedbackFormKey, savedForm);
}

function onSubmit(event) {
    event.preventDefault();
  console.log(savedForm);
  formElement.reset();
  localStorage.removeItem(feedbackFormKey);
}

function save(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set fields are incorrect: ', error.message);
  }
}

function load(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get fields are incorrect: ', error.message);
  }
}
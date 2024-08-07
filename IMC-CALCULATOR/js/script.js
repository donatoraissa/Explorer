import { Modal } from "./modal.js"
import { AlertError } from "./alert-error.js"
import { calculateIMC, notNumber, displayResultMessage } from "./utils.js"

const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')

form.onsubmit = event => {
  event.preventDefault()

  const weight = inputWeight.value
  const height = inputHeight.value

  const weightOrHeightIsNotANumber = notNumber(weight) || notNumber(height)

  if(weightOrHeightIsNotANumber) {
    AlertError.open()
    return;
  }

  const result = calculateIMC(weight, height)
  displayResultMessage(result)
}

inputHeight.oninput = () => AlertError.close()
inputWeight.oninput = () => AlertError.close()


// window.addEventListener('input', handleCloseAlertError)
// function handleCloseAlertError(event) {
//   AlertError.close()
// }
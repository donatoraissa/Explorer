export function calculateIMC (weight, height) {
  return ((weight / ((height / 100) ** 2)).toFixed(2))
}

export function notNumber (value) {
  return isNaN(value) || value == ''
}

export function displayResultMessage (result) {
  const message = `Seu IMC é de ${result}`
  
  Modal.message.innerText = message
  Modal.open()
}
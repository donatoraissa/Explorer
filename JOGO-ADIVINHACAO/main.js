const btnTry = document.querySelector("#btnTry")
const bntReset = document.querySelector("#btnReset")
const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")

let randomNumber = Math.round(Math.random() * 10)
let xAttempts = 0

function handleTryClick(event) {
  event.preventDefault()

  const inputNumber = document.querySelector("#inputNumber")

  if(inputNumber.value !== '') {
    if (Number(inputNumber.value) >= 0 && Number(inputNumber.value) <= 10) {
      xAttempts++
    }
    else {
      alert("Número inválido! Escolha um número de 0 até 10.")
    }
  }
  else {
    alert("Você precisa digitar um número.")
  }

  if(Number(inputNumber.value) === randomNumber) {
    toggleScreen()

    screen2.querySelector("h2").innerText = `Acertou em ${xAttempts} tentativas!`
  }

  inputNumber.value = ''
}

function handleResetClick(event) {
  toggleScreen()
  xAttempts = 0
  randomNumber = Math.round(Math.random() * 10)
}

function toggleScreen() {
  screen1.classList.toggle("hide")
  screen2.classList.toggle("hide")
}

function handeRestartEnter (event) {
  if(event.key == 'Enter' && screen1.classList.contains("hide")) {
    handleResetClick()
  }
}

btnTry.addEventListener('click', handleTryClick)
bntReset.addEventListener('click', handleResetClick)

document.addEventListener('keydown', handeRestartEnter)

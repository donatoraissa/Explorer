export const AlertError = {
  alert: document.querySelector('.alert-error'),
  open() {
    AlertError.alert.classList.add('open')
  },
  close() {
    AlertError.alert.classList.remove('open')
  }
}
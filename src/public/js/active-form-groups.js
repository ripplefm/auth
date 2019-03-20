document.addEventListener('DOMContentLoaded', () => {
  const formGroups = document.querySelectorAll('.form-group');

  formGroups.forEach(formGroup => {
    const input = formGroup.querySelector('input');
    formGroup.addEventListener('click', () => input.focus());
    input.addEventListener('focus', () => formGroup.classList.add('active'));
    input.addEventListener('blur', () => formGroup.classList.remove('active'));
  });
});

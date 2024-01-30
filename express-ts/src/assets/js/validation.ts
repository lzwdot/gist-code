class Validation {
  private forms: NodeListOf<HTMLFormElement> =
    document.querySelectorAll('.needs-validation');

  constructor() {
    // Loop over them and prevent submission
    Array.from(this.forms).forEach((form) => {
      form.addEventListener(
        'submit',
        (e) => {
          if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false,
      );
    });
  }
}

export default new Validation();

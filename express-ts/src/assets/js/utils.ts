import { Toast } from 'bootstrap';

export default class Utils {
  static toast(message: string) {
    const toastEl = document.querySelector('#toast');

    if (toastEl) {
      const toast = Toast.getOrCreateInstance(toastEl);
      toastEl.querySelector('.toast-body').innerHTML = message;
      toast.show();
    }
  }
}

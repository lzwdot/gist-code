import { Dropdown } from 'bootstrap';
import Tagify from '@yaireo/tagify';

class Component {
  private components = [
    {
      constructor: Dropdown,
      el: '[data-bs-toggle="dropdown"]',
    },
    {
      constructor: Tagify,
      el: '[data-bs-toggle="tags"]',
    },
  ];

  constructor() {
    this.instanceComs();
  }

  instanceComs() {
    const components = this.components;
    components.forEach((item) => {
      if (this.isComExist(item.el)) {
        new item.constructor(document.querySelector(item.el));
      }
    });
  }

  isComExist(key: string) {
    return document.querySelector(key);
  }
}

export default new Component();

import {
  getContactData,
  getSortContactsStorage,
} from './script/serviceStorage.js';

import * as render from './script/render.js';
import control from './script/control.js';

import './css/normalize.min.css';
import './css/bootstrap.min.css';
import './css/style.css';

const {renderPhoneBook, renderContacts} = render;

const {
  modalControl,
  deleateControl,
  formControl,
  sortContacts,
  handleSortContacts,
  hoverRow,
  editContactControl,
} = control;

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const contacts = getContactData('contacts');
    const {column, isAscending} = getSortContactsStorage();
    const {
      list,
      logo,
      buttonAdd,
      formOverlay,
      buttonDel,
      headerList,
      form,
    } = renderPhoneBook(app, title);

    renderContacts(list, contacts);
    const {closeModal} = modalControl(buttonAdd, formOverlay);

    deleateControl(buttonDel, list);
    formControl(form, list, closeModal, logo);

    handleSortContacts(headerList, list);
    sortContacts(column, list, isAscending);
    hoverRow(list.querySelectorAll('.contact'), logo);
    editContactControl(list);
  };

  init('#app', 'Надежда');
}

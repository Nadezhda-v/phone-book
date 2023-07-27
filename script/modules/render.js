import {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createRow,
  createFooter,
} from './createElements.js';

export const renderContacts = (list, contacts) => {
  const allRow = contacts.map(createRow);
  list.append(...allRow);
};

export const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonsGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3 btn-add',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter(title);

  app.append(header, main, footer);
  header.headerContainer.append(logo);
  main.mainContainer.append(buttonsGroup.btnWrapper, table, overlay);

  return {
    list: table.tbody,
    logo,
    buttonAdd: buttonsGroup.buttons[0],
    formOverlay: overlay,
    form,
    buttonDel: buttonsGroup.buttons[1],
    headerList: table.thead,
  };
};

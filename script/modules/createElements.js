const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  return container;
};

const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');

  const headerContainer = createContainer();
  header.append(headerContainer);

  header.headerContainer = headerContainer;

  return header;
};

const createLogo = (title) => {
  const h1 = document.createElement('h1');
  h1.classList.add('logo');
  h1.textContent = `Телефонный справочник ${title}`;

  return h1;
};

const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContainer();

  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

const createButtonsGroup = (params) => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const buttons = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.className = className;
    button.type = type;
    button.textContent = text;

    return button;
  });

  btnWrapper.append(...buttons);

  return {
    btnWrapper,
    buttons,
  };
};

const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th class='delete'>Удалить</th>
      <th class="col-3 th-cell cell-name">Имя</th>
      <th class="col-3 th-cell cell-surname">Фамилия</th>
      <th class="col-6">Телефон</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;
  table.thead = thead;

  return table;
};

const createForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');

  const form = document.createElement('form');
  form.classList.add('form');
  form.insertAdjacentHTML('beforeend', `
    <button class="close" type="button"></button>
    <h2 class="form-title">Добавить контакт</h2>

    <div class="form-group">
      <label class="form-label" for="name">Имя:</label>
      <input class="form-input" name="name" 
        id="name" type="text" required>
    </div>

    <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input class="form-input" name="surname" 
        id="surname" type="text" required>
    </div>

    <div class="form-group">
      <label class="form-label" for="phone">Телефон:</label>
      <input class="form-input" name="phone" 
        id="phone" type="number" required>
    </div>
  `);

  const buttonsGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    },
  ]);

  overlay.append(form);
  form.append(...buttonsGroup.buttons);

  return {overlay, form};
};

const createRow = ({name: firstName, surname, phone}) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');

  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');

  const buttonDel = document.createElement('button');
  buttonDel.classList.add('del-icon');
  tdDel.append(buttonDel);

  const tdName = document.createElement('td');
  tdName.classList.add('cell-name');
  tdName.textContent = firstName;

  const tdSurname = document.createElement('td');
  tdSurname.classList.add('cell-surname');
  tdSurname.textContent = surname;

  const tdPhone = document.createElement('td');
  tdPhone.classList.add('d-flex', 'justify-content-between', 'td-phone');
  const phoneLink = document.createElement('a');
  phoneLink.href = `${phone}`;
  phoneLink.textContent = phone;

  tr.phoneLink = phoneLink;

  const buttonsGroup = createButtonsGroup([
    {
      className: 'btn btn-primary button-edit',
      type: 'button',
      text: 'Редактировать',
    },
  ]);

  tdPhone.append(phoneLink, ...buttonsGroup.buttons);
  tr.append(
      tdDel,
      tdName,
      tdSurname,
      tdPhone,
  );

  return tr;
};

const createFooter = (title) => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const footerContainer = createContainer();

  const text = document.createElement('span');
  text.textContent = `Все права защищены \u00A9${title}`;

  footer.append(footerContainer);
  footerContainer.append(text);

  return footer;
};

export {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createRow,
  createFooter,
};

const createContainer = (className) => {
  const container = document.createElement('div');
  container.classList.add('container');

  if (className) {
    container.classList.add(className);
  }

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
  const mainContainer = createContainer('main__container');

  main.append(mainContainer);
  main.mainContainer = mainContainer;

  return main;
};

const createButtonsGroup = (params) => {
  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('btn-wrapper');

  const buttons = params.map(({className, type, text, svg}) => {
    const button = document.createElement('button');
    button.className = className;
    button.type = type;
    if (svg) {
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgElement.innerHTML = svg;
      button.appendChild(svgElement);
    } else {
      button.textContent = text;
    }

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
      <th class="col-3">Телефон</th>
      <th class="col-3">Действия</th>
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
        id="name" type="text" maxlength="15" required>
    </div>

    <div class="form-group">
      <label class="form-label" for="surname">Фамилия:</label>
      <input class="form-input" name="surname" 
        id="surname" type="text" maxlength="15" required>
    </div>

    <div class="form-group">
      <label class="form-label" for="phone">Телефон:</label>
      <input class="form-input" name="phone" 
        id="phone" type="text" required>
    </div>
  `);

  const buttonsGroup = createButtonsGroup([
    {
      className: 'btn btn-add mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-cancel',
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
  tdPhone.classList.add('cell-phone');

  const phoneLink = document.createElement('a');
  phoneLink.classList.add('d-block');
  phoneLink.href = `${phone}`;
  phoneLink.textContent = phone;

  const tdActions = document.createElement('td');

  tr.phoneLink = phoneLink;

  const buttonsGroup = createButtonsGroup([
    {
      className: 'btn btn-edit',
      type: 'button',
      svg: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="linear-gradient"
        gradientUnits="userSpaceOnUse"
        x1="2" x2="29.478" y1="16.276" y2="16.276">
        <stop offset="0" stop-color="#0fdcdd"></stop>
        <stop offset="1" stop-color="#46a1e8"></stop>
        </linearGradient>
        <g id="_23_Edit" data-name="23 Edit">
        <path d="m28.6 4.17-.77-.77a3.075 3.075 0 0 0 -4.24 0l-4.6 4.6
        h-13.99a3.009 3.009 0 0 0 -3 3v16a3.009 3.009 0 0 0 3 3
        h16a3.009 3.009 0 0 0 3-3v-13.99l4.6-4.6a3 3 0 0 0 0-4.24
        zm-2.18.64.77.77a1.008 1.008 0 0 1 0 1.42l-.353.353-2.19-2.19.353-.353
        a1.047 1.047 0 0 1 1.42 0zm-3.188 1.768 2.19 2.19-11.522 11.523
        -2.19-2.19zm-12.663 13.211 1.542 1.542-2.831 1.079zm11.431 7.211
        a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1-1v-16a1 1 0 0 1 1-1
        h11.99l-7.39 7.388-.01.012-.008.012-.012.012a.831.831 0 0 0 
        -.19.26l-3.03 6.136a1 1 0 0 0 1.26 1.37l6.62-2.53a.929.929 0 0 0 .35
        -.23l.012-.012.012-.008.008-.012 7.388-7.388z" 
        fill="url(#linear-gradient)" style="fill: rgb(87, 137, 122);">
        </path></g></svg>`,
    },
  ]);

  tdActions.append(...buttonsGroup.buttons);
  tdPhone.append(phoneLink);
  tr.append(
      tdDel,
      tdName,
      tdSurname,
      tdPhone,
      tdActions,
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

'use strict';

{
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

    const buttonClose = form.querySelector('.close');

    return {overlay, form, buttonClose};
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

  const renderContacts = (list, contacts) => {
    const allRow = contacts.map(createRow);
    list.append(...allRow);
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });

      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
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

  const renderPhoneBook = (app, title) => {
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

  // Открытие и закрытие модального окна

  const modalControl = (buttonAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    buttonAdd.addEventListener('click', () => {
      openModal();
    });

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay || target.closest('.close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  // Получение текущего состояния сортировки из localStorage

  const getSortContactsStorage = () =>
    JSON.parse(localStorage.getItem('sortContacts')) || {
      column: '',
      isAscending: '',
    };

  // Обновление состояния сортировки в localStorage

  const setSortContactsStorage = (column, isAscending) => {
    const sortContacts = {column, isAscending};
    localStorage.setItem('sortContacts', JSON.stringify(sortContacts));
  };

  // Сортировка контактов

  const sortContacts = (cellSelector, list, isAscending) => {
    const allData = [];

    [...list.querySelectorAll('.contact')].forEach(row => {
      const textContent = row.querySelector(cellSelector).textContent;
      allData.push({data: textContent, row});
    });

    const newIsAscending = isAscending === undefined ? true : isAscending;

    allData.sort((a, b) => {
      if (newIsAscending) {
        return a.data.localeCompare(b.data);
      } else {
        return b.data.localeCompare(a.data);
      }
    });

    const sortedRows = allData.map(item => item.row);

    list.innerHTML = '';
    list.append(...sortedRows);
    setSortContactsStorage(cellSelector, newIsAscending);
  };

  //  Обработка события клика на заголовке таблицы

  const handleSortContacts = (headerList, list) => {
    let isAscending = false;

    headerList.addEventListener('click', (e) => {
      const cell = e.target.closest('th');

      if (cell.classList.contains('cell-name') ||
        cell.classList.contains('cell-surname')) {
        const cellSelector = '.' + cell.classList[2];
        isAscending = !isAscending;
        sortContacts(cellSelector, list, isAscending);
      }
    });
  };

  // Получение контактов из localStorage

  const getStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data || [];
  };

  // Запись контактов в localStorage

  const setStorage = (key, obj) => {
    const contacts = getStorage(key);
    contacts.push(obj);
    localStorage.setItem(key, JSON.stringify(contacts));
  };

  // Удаление контактов из localStorage

  const removeStorage = (phone) => {
    const key = 'contacts';
    const contacts = getStorage(key);
    const dataIndex = contacts.findIndex(contact => contact.phone === phone);
    contacts.splice(dataIndex, 1);

    localStorage.setItem(key, JSON.stringify(contacts));
  };

  // Добавление контакта на страницу и в localStorage

  const addContactPage = (newContact, list, logo) => {
    const row = createRow(newContact);
    list.append(row);
    hoverRow([row], logo);
    setStorage('contacts', newContact);
  };

  const deleateControl = (buttonDel, list) => {
    /* Появление при нажатии на кнопку 'Удалить'
    скрытого поля и кнопки, имеющих класс delete*/

    buttonDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    // Удаление контактов

    list.addEventListener('click', e => {
      const target = e.target;

      if (target.classList.contains('del-icon')) {
        const contactRow = target.closest('.contact');
        const phone = contactRow.querySelector('.td-phone a').textContent;

        contactRow.remove();
        removeStorage(phone);
      }
    });
  };

  // Заполнение и отправка формы

  const formControl = (form, list, closeModal, logo) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list, logo);

      form.reset();
      closeModal();
    });
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      buttonAdd,
      formOverlay,
      buttonDel,
      headerList,
      form,
    } = renderPhoneBook(app, title);

    const contacts = getStorage('contacts');
    renderContacts(list, contacts);
    hoverRow(list.querySelectorAll('.contact'), logo);

    const {closeModal} = modalControl(buttonAdd, formOverlay);
    deleateControl(buttonDel, list);
    formControl(form, list, closeModal, logo);

    handleSortContacts(headerList, list);

    const {column, isAscending} = getSortContactsStorage();
    sortContacts(column, list, isAscending);
  };

  window.phoneBookInit = init;
}

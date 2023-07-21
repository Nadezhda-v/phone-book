'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

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

    const buttons = params.map(({ className, type, text }) => {
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
        <th class="col-3">Имя</th>
        <th class="col-3">Фамилия</th>
        <th class="col-6">Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

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
        <input lass="form-input" name="name" 
          id="name" type="text" required>
      </div>

      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input lass="form-input" name="surname" 
          id="surname" type="text" required>
      </div>

      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input lass="form-input" name="phone" 
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

    return { overlay, form, buttonClose };
  };

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
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

  const renderContacts = (item, data) => {
    const allRow = data.map(createRow);
    item.append(...allRow);

    return allRow;
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
    })
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
    const form = createForm();
    const footer = createFooter(title);

    app.append(header, main, footer);
    header.headerContainer.append(logo);
    main.mainContainer.append(buttonsGroup.btnWrapper, table, form.overlay);

    return {
      list: table.tbody,
      logo,
      buttonAdd: buttonsGroup.buttons[0],
      formOverlay: form.overlay,
      form: form.form,
      buttonDel: buttonsGroup.buttons[1],
    };
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);

    const { 
      list, 
      logo,
      buttonAdd, 
      formOverlay, 
      buttonDel, 
    } = phoneBook;

    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);

    buttonAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    formOverlay.addEventListener('click', e => {
      const target = e.target;

      if (target === formOverlay || target.closest('.close')) {
        formOverlay.classList.remove('is-visible');
      }
    });

    buttonDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      if (e.target.classList.contains('del-icon')) {
        e.target.closest('.contact').remove();
      };
    });
  };

  window.phoneBookInit = init;
}

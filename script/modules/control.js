import {
  setSortContactsStorage,
  addContactData,
  removeContactData,
  updateContactData,
} from './serviceStorage.js';

import {createRow} from './createElements.js';

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

// Добавление контакта на страницу и в localStorage

const addContactPage = (newContact, list, logo) => {
  const row = createRow(newContact);
  list.append(row);
  hoverRow([row], logo);
  addContactData(newContact);
};

const deleateControl = (buttonDel, list) => {
  /* Появление при нажатии на кнопку 'Удалить'
  скрытого поля и кнопки, имеющих класс delete*/

  buttonDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  document.addEventListener('click', e => {
    const target = e.target;

    if (!target.classList.contains('del-icon') &&
      !list.contains(target) &&
      !buttonDel.contains(target)
    ) {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.remove('is-visible');
      });
    }
  });

  // Удаление контактов

  list.addEventListener('click', e => {
    const target = e.target;

    if (target.classList.contains('del-icon')) {
      const contactRow = target.closest('.contact');
      const phone = contactRow.querySelector('.cell-phone a').textContent;

      contactRow.remove();
      removeContactData(phone);
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

const isValidText = (text) => /^[A-Za-zА-Яа-я]+$/.test(text);

const isValidPhoneNumber = (phone) => /^\d{11}$/.test(phone);

// Валидация контактов при редактировании

const isValidCells = (row) => {
  const newName = row.querySelector('.cell-name').textContent;
  const newSurname = row.querySelector('.cell-surname').textContent;
  const newPhone = row.querySelector('.cell-phone a').textContent;

  return isValidText(newName) &&
    isValidText(newSurname) &&
    isValidPhoneNumber(newPhone);
};

const contactControl = (list) => {
  let activeRow = null;
  let activePhone = null;

  list.addEventListener('click', e => {
    const target = e.target;
    const closestEditButton = target.closest('.button-edit');

    if (closestEditButton) {
      const contactRow = closestEditButton.closest('.contact');
      const sel = window.getSelection();
      sel.removeAllRanges();

      if (activeRow && activeRow !== contactRow) {
        activeRow.contentEditable = false;
      }

      contactRow.contentEditable = true;
      closestEditButton.contentEditable = false;
      const range = document.createRange();
      range.selectNodeContents(contactRow);
      range.collapse(false);
      sel.addRange(range);

      activeRow = contactRow;
      activePhone = activeRow.querySelector('.cell-phone a').textContent;
    }
  });

  list.addEventListener('input', () => {
    if (activeRow) {
      const contactPhoneCell = activeRow.querySelector('.cell-phone a');
      const newPhone = contactPhoneCell.textContent;
      updateContactData(activePhone, activeRow);

      newPhone !== activePhone ? activePhone = newPhone : null;
    }
  });

  list.addEventListener('blur', () => {
    if (activeRow) {
      activeRow.contentEditable = false;
      activeRow = null;
      activePhone = null;
    }
  }, true);
};

export default {
  hoverRow,
  sortContacts,
  handleSortContacts,
  modalControl,
  deleateControl,
  formControl,
  contactControl,
};

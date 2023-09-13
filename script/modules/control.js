import {
  setSortContactsStorage,
  addContactData,
  removeContactData,
  updateContactData,
} from './serviceStorage.js';

import {createRow} from './createElements.js';

import {
  controlInputValue,
  isValidText,
  isValidPhoneNumber,
} from './formValidation.js';

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
    controlInputValue();
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

const handleBlur = (contactRow) => {
  const phoneCell = contactRow.querySelector('.cell-phone');
  const nameCell = contactRow.querySelector('.cell-name');
  const surnameCell = contactRow.querySelector('.cell-surname');
  const phoneHref = contactRow.querySelector('.cell-phone a');

  const newName = nameCell.textContent;
  const newSurname = surnameCell.textContent;
  const newPhone = phoneHref.textContent;
  phoneHref.setAttribute('href', newPhone);

  const isValidName = isValidText(newName);
  const isValidSurname = isValidText(newSurname);
  const isValidPhone = isValidPhoneNumber(newPhone);

  contactRow.classList.remove('table-primary');
  nameCell.contentEditable = false;
  surnameCell.contentEditable = false;
  phoneCell.contentEditable = false;
  phoneHref.contentEditable = false;

  if (isValidName && isValidSurname && isValidPhone) {
    updateContactData(contactRow.prevData.phone, contactRow);
  } else {
    nameCell.textContent = contactRow.prevData.name;
    surnameCell.textContent = contactRow.prevData.surname;
    phoneHref.textContent = contactRow.prevData.phone;
    phoneHref.setAttribute('href', contactRow.prevData.phone);
  }
};

const handleInput = (e, maxLength) => {
  const target = e.target;

  if (e.key === 'Backspace' && target.textContent.length === 0) {
    e.preventDefault();
  }

  if (target.textContent.length >= maxLength && e.key !== 'Backspace') {
    e.preventDefault();
  }
};

const handleEditButton = (e) => {
  const editButton = e.target;
  const contactRow = editButton.closest('.contact');

  const phoneCell = contactRow.querySelector('.cell-phone');
  const nameCell = contactRow.querySelector('.cell-name');
  const surnameCell = contactRow.querySelector('.cell-surname');

  const phoneHref = contactRow.querySelector('.cell-phone a');
  const prevName = nameCell.textContent;
  const prevSurname = surnameCell.textContent;
  const prevPhone = phoneHref.textContent;

  contactRow.classList.add('table-primary');

  nameCell.contentEditable = true;
  surnameCell.contentEditable = true;
  phoneCell.contentEditable = true;
  phoneHref.contentEditable = true;

  nameCell.addEventListener('keydown', (e) => handleInput(e, 15));
  surnameCell.addEventListener('keydown', (e) => handleInput(e, 15));
  phoneCell.addEventListener('keydown', (e) => handleInput(e, 12));

  contactRow.prevData = {
    name: prevName,
    surname: prevSurname,
    phone: prevPhone,
  };

  const cancelEditContact = e => {
    if (!contactRow.contains(e.target)) {
      handleBlur(contactRow);
      document.removeEventListener('click', cancelEditContact);
    }
  };

  document.addEventListener('click', cancelEditContact);
};

const editContactControl = (list) => {
  list.addEventListener('click', e => {
    const target = e.target;
    const closestEditButton = target.closest('.button-edit');

    if (closestEditButton) {
      handleEditButton(e);
    }
  });
};

export default {
  hoverRow,
  sortContacts,
  handleSortContacts,
  modalControl,
  deleateControl,
  formControl,
  editContactControl,
};

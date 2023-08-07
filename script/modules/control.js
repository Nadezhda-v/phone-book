import {
  setSortContactsStorage,
  addContactData,
  removeContactData,
  updateContactData,
  getContactData,
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

// Валидация имени и фамилии при редактировании

const isValidText = (text) => /^[A-Za-zА-Яа-я]+$/.test(text);

// Валидация номера телефона при редактировании

const isValidPhoneNumber = (newPhone) => {
  const isValidPhone = /^\d{11}$/.test(newPhone);
  if (!isValidPhone) {
    return false;
  }

  const data = getContactData('contacts');
  const repeatPhone = data.findIndex(contact => contact.phone === newPhone);
  if (repeatPhone !== -1) {
    return false;
  }

  return true;
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

  if (isValidName) {
    updateContactData(contactRow.prevData.phone, contactRow);
  } else {
    nameCell.textContent = contactRow.prevData.name;
  }

  if (isValidSurname) {
    updateContactData(contactRow.prevData.phone, contactRow);
  } else {
    surnameCell.textContent = contactRow.prevData.surname;
  }

  if (isValidPhone) {
    updateContactData(contactRow.prevData.phone, contactRow);
  } else {
    phoneHref.textContent = contactRow.prevData.phone;
    phoneHref.setAttribute('href', contactRow.prevData.phone);
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

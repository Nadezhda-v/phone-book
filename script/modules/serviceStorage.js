// Получение контактов из localStorage

const getContactData = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data || [];
};

// Запись контактов в localStorage

const setContactData = (data) => {
  localStorage.setItem('contacts', JSON.stringify(data));
};

const addContactData = (contact) => {
  const data = getContactData('contacts');
  data.push(contact);
  setContactData(data);
};

// Удаление контактов из localStorage

const removeContactData = (phone) => {
  const data = getContactData('contacts');
  const dataIndex = data.findIndex(contact => contact.phone === phone);
  data.splice(dataIndex, 1);

  setContactData(data);
};

// Обновление контактов в localStorage после редактирования

const updateContactData = (phone, contactRow) => {
  const data = getContactData('contacts');
  const dataIndex = data.findIndex(contact => contact.phone === phone);

  if (dataIndex !== -1) {
    data[dataIndex].name = contactRow.querySelector('.cell-name')
        .textContent;
    data[dataIndex].surname = contactRow.querySelector('.cell-surname')
        .textContent;
    data[dataIndex].phone = contactRow.querySelector('.cell-phone a')
        .textContent;

    setContactData(data);
  }
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

export {
  getContactData,
  addContactData,
  removeContactData,
  getSortContactsStorage,
  setSortContactsStorage,
  updateContactData,
};

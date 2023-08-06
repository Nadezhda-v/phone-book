// Получение контактов из localStorage

const getContactData = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data || [];
};

// Запись контактов в localStorage

const setContactData = (key, obj) => {
  const contacts = getContactData(key);
  contacts.push(obj);
  localStorage.setItem(key, JSON.stringify(contacts));
};

// Удаление контактов из localStorage

const removeContactData = (phone) => {
  const key = 'contacts';
  const contacts = getContactData(key);
  const dataIndex = contacts.findIndex(contact => contact.phone === phone);
  contacts.splice(dataIndex, 1);

  localStorage.setItem(key, JSON.stringify(contacts));
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
  setContactData,
  removeContactData,
  getSortContactsStorage,
  setSortContactsStorage,
};

import {
  getContactData,
} from './serviceStorage';

const controlInputValue = () => {
  const inputName = document.querySelector('#name');
  const inputSurname = document.querySelector('#surname');
  const inputPhone = document.querySelector('#phone');

  inputName.addEventListener('input', () => {
    inputName.value = inputName.value.replace(/[^а-яА-ЯёЁ]/g, '');
  });

  inputSurname.addEventListener('input', () => {
    inputSurname.value = inputSurname.value.replace(/[^а-яА-ЯёЁ]/g, '');
  });

  inputPhone.addEventListener('input', () => {
    let phone = inputPhone.value.replace(/[^+\d]/g, '');

    // Разрешить ввод только одного символа "+"
    if (phone.includes('+')) {
      phone = phone.replace(/\+/g, '');
      phone = phone.replace(phone.slice(0, 1), 7);
      phone = '+' + phone;
    }

    if (phone.includes('+')) {
      // Если есть символ "+", ограничение длины строки до 12 символов
      inputPhone.value = phone.length > 12 ?
        phone.slice(0, 12) : phone;
    } else {
      // Если нет символа "+", ограничение длины строки до 11 символов
      inputPhone.value = phone.length > 11 ?
        phone.slice(0, 11) : phone;
    }
  });
};

// Валидация имени и фамилии при редактировании

const isValidText = (text) => /^[а-яА-ЯёЁ]+$/.test(text);

// Валидация номера телефона при редактировании

const isValidPhoneNumber = (newPhone) => {
  const isValidPhone = /^\+?\d{11}$/.test(newPhone);
  if (!isValidPhone) {
    return false;
  }

  const data = getContactData('contacts');
  const repeatPhone = data.findIndex(contact => contact.phone === newPhone);
  if (repeatPhone !== -1) {
    console.log(repeatPhone);
    return false;
  }

  return true;
};

export {
  controlInputValue,
  isValidText,
  isValidPhoneNumber,
};

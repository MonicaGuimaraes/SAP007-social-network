import { createRegister } from '../../src/pages/register/page-register.js';

jest.mock('../../src/configurafirebase/exports.js');

it('createRegister é uma função', () => {
  expect(typeof createRegister).toBe('function');
});

describe('registerUser', () => {
  it('Deverá registrar um usuário', () => {
    createRegister.mockResolvedValueOnce();
    const name = 'taize';
    const email = 'taize.onze@gmail.com';
    const password = 'teste123';
    const page = Register();
    const nameInput = page.querySelector('.name');
    const emailInput = page.querySelector('.email');
    const passwordInput = page.querySelector('.password');
    const btnRegister = page.querySelector('#register-button');
    nameInput.value = name;
    emailInput.value = email;
    passwordInput.value = password;
    btnRegister.dispatchEvent(new Event('click'));
    expect(createRegister).toHaveBeenCalledWith(name, email, password);
    expect(createRegister).toHaveBeenCalledTimes(1);
  });
});
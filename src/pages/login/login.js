import { logar, logarGmail } from './authentication.js';
import { errorHandlingGeneral } from '../../components/errorHandling.js';

export const pageLogin = () => {
  const login = document.createElement('div');
  login.setAttribute('class', 'div-login');
  login.innerHTML = `
  <section class="box-form-login">
    <section class="header-page-login">
      <figure class="box-slogan-desktop">
        <img src="./img/imgLogoDesktop.png" alt="Logotype" class="logo-desktop">
      </figure>
      <a href="#about" class="btn-about" id="btn-about"><img src="./img/iconeInterrogacao.png" alt="botão interrogação" class="img-btn-about"></a>
    </section> 
    <section class="login-form-section">
      <figure class="box-slogan-page-login">
        <img src="./img/kfandom.svg" alt="Logotype" class="logo-icon-page-login">
      </figure>  
      <form method="post" class = "form-login flex-direction">
        <input type="email" placeholder="seu@email.com" class="login-area font-size" id="email-area" name="email-area" requered>
        <input type="password" placeholder="Senha" class="login-area font-size" id="password-area" name="password-area" requered>
        <button class="btn-sign-in font-size" id="btn-sign-in">Entrar</button>
        <button class="btn-recover-password font-size" id="btn-recover-password">Esqueci minha senha</button>                
      </form>
      <p class="error text-center font-size" id="user-error"></p> 
      <p class="error text-center font-size" id = "user-error-gmail"></p>
      <p class="our text-center font-size">- ou -</p>
      <section class="section-login-google flex-direction">
        <button class="btn-google text-center font-size" id="btn-google"><img src="./img/G.svg" alt="btn-google" class="img-btn-google">Sign in with Google</button>
      </section>
      <p class="font-size text-center">
        Ainda não tem conta? <a href="#createLogin" id="click-register">Cadastre-se</a>
      </p>
    </section>
  </section>
  <section class="header-desktop">
    <a href="#about">Sobre a rede</a>
  </section>
    `;

  login.querySelector('#btn-about').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#about';
  });

  login.querySelector('#btn-recover-password').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#recover';
  });

  login.querySelector('#btn-sign-in').addEventListener('click', (e) => {
    const inputEmail = login.querySelector('#email-area').value;
    const inputPassword = login.querySelector('#password-area').value;
    const invalidFormat = /\S+@\S+\.\S+/.test(inputEmail);
    const userError = login.querySelector('#user-error');
    e.preventDefault();
    if (!inputEmail || !inputPassword) {
      userError.innerHTML = 'Campos obrigatórios';
      userError.style.display = 'block';
    } else if (!invalidFormat) {
      userError.innerHTML = 'Preencha o campo de email corretamente';
      userError.style.display = 'block';
    } else if (inputEmail && inputPassword && invalidFormat) {
      logar(inputEmail, inputPassword).then(() => {
        window.location.hash = '#feed';
      }).catch((error) => {
        userError.innerHTML = errorHandlingGeneral(error.code);
        userError.style.display = 'block';
      });
    }
  });

  login.querySelector('#btn-google').addEventListener('click', (e) => {
    e.preventDefault();
    const userErrorGmail = login.querySelector('#user-error-gmail');
    logarGmail().then(() => {
      window.location.hash = '#feed';
    }).catch((error) => {
      userErrorGmail.innerHTML = errorHandlingGeneral(error.code);
      userErrorGmail.style.display = 'block';
    });
  });
  return login;
};

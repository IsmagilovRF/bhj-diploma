'use strict';

class Sidebar {

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    document.getElementsByClassName('sidebar-toggle').item(0).onclick = function () {
      const bodySideBar = document.getElementsByClassName('skin-blue sidebar-mini app').item(0);
      bodySideBar.classList.toggle('sidebar-open');
      bodySideBar.classList.toggle('sidebar-collapse');
    };
  };

  static initAuthLinks() {
    // register
    const registerModal = App.getModal( 'register' );
    const registerButton = document.getElementsByClassName('menu-item_register').item(0);
    this.addOpenCloseButtonEvent( registerModal, registerButton );
    registerModal.element.querySelector('button.btn-primary').onclick = function () {
      App.getForm('register').submit();
      // new RegisterForm(document.getElementById('register-form')).submit();
    };
    // login
    const loginModal = App.getModal( 'login' );
    const loginButton = document.getElementsByClassName('menu-item_login').item(0);
    this.addOpenCloseButtonEvent( loginModal, loginButton );
    loginModal.element.querySelector('button.btn-primary').onclick = function () {
      App.getForm('login').submit();
      // new LoginForm(document.getElementById('login-form')).submit();
    };
    // logout
    const logoutButton = document.getElementsByClassName('menu-item_logout').item(0);
    logoutButton.onclick = function () {
      User.logout( {}, response => {
        if ( response && response.success ) {
          User.unsetCurrent();
          App.setState( 'init' );
        }
      });
    };
  };

  static addOpenCloseButtonEvent( modal, openButton ) {
    openButton.onclick = function () {
      modal.open();
    };
    modal.element.querySelector('button.close').onclick = function () { modal.close() };
    modal.element.querySelector('button.pull-left').onclick = function () { modal.close(); };
  };

}

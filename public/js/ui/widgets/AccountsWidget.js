'use strict';

class AccountsWidget {

  constructor( element ) {
    if ( !element ) { throw Error }
    this.element = element;
    this.registerEvents();
    // this.update();
  };

  registerEvents() {
    // create or choose account
    this.element.onclick = event => {
      if ( event.composedPath()[0].classList.contains('create-account') ) {
        App.getModal('createAccount').open();
      } else if ( event.composedPath()[1].classList.contains('account') ) {
        this.onSelectAccount( event.composedPath()[1] );
      }
    }
  };

  update() {
    let currentUser = User.current();
    if ( currentUser ) {
      Entity.list( '/account', currentUser, response => {
        if (response && response.success && response.data) {
          this.clear();
          Array.from(response.data).forEach(element => {
            this.renderItem( element );
          });
          // this.registerEvents();
        }
      });
    }
  };

  clear() {
    let listAccounts = Array.from(document.querySelectorAll('li.account'));
    if ( listAccounts.length > 0 ) {
      listAccounts.forEach(element => {
        element.remove();
      });
    }
  };

  onSelectAccount( element ) {
    let activeAccount = this.element.querySelector('li.active');
    activeAccount ? activeAccount.classList.toggle('active') : '';
    element.classList.toggle('active');
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  getAccountHTML( item ) {
    return `<li class="account" data-id="${ item['id'] }">
              <a href="#">
              <span>${ item['name'] }</span> /
              <span>${ item['sum'] } ₽</span>
              </a>
            </li>`;
  }

  renderItem( item ) {
    let accountPanel = document.getElementsByClassName('accounts-panel').item(0);
    accountPanel.insertAdjacentHTML('beforeend', this.getAccountHTML( item ));
  }
}

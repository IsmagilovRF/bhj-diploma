'use strict';

class CreateTransactionForm extends AsyncForm {

  constructor( element ) {
    super( element );
    this.element = element;
    this.selects = this.element.querySelectorAll('select.accounts-select');
    this.select = this.element.querySelector('select.accounts-select');
    this.renderAccountsList();
  };

  renderAccountsList() {
    // clear old options
    Array.from(this.element.querySelectorAll('option')).forEach( element => {
      element.remove();
    });
    // add new options
    let currentUser = User.current();
    if ( currentUser ) {
      Entity.list( '/account', currentUser, response => {
        if (response && response.success) {
          Array.from( response.data ).forEach( element => {
            let option = document.createElement('option');
            option.value = element.id;
            option.innerHTML = element.name;
            Array.from(this.selects).forEach( element => {
              element.appendChild( option );
            });
          });
        }
      });
    }
  }

  onSubmit( options ) {
    let currentUser = User.current();
    if ( currentUser ) {
      let type = '';
      let account_id = this.select.options[this.select.selectedIndex].value;
      let data = Object.assign({ user_id: currentUser.id, account_id: account_id }, options );
      data.type = (this.element.id === 'new-income-form' ? type = 'income' : type = 'expense');
      Entity.create( '/transaction', data, response => {
        if (response.success && response) {
          if ( type.toUpperCase() == 'INCOME' ) {
            App.getModal('newIncome').close();
          } else {
            App.getModal('newExpense').close();
          }
          super.resetFormData();
          App.update();
          this.renderAccountsList();
        }
      });
    }
  }
}

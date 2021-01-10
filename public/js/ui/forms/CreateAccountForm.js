'use strict';

class CreateAccountForm extends AsyncForm {

  onSubmit( options ) {
    Entity.create( '/account', options, response => {
      if ( response && response.success ) {
        super.resetFormData();
        App.getModal( 'createAccount' ).close();
        App.getForm('createIncome').renderAccountsList();
        App.getForm('createExpense').renderAccountsList();
        App.update();
      }
    })
  }

}

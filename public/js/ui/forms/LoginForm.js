'use strict';

class LoginForm extends AsyncForm {

  onSubmit( options ) {
    User.login( options, response => {
      if ( response && response.success && response.user ) {
        User.setCurrent(response.user);
        super.resetFormData();
        App.setState('user-logged');
        App.getModal('login').close();
      } else {
        console.error();
      }
    });
  };

}

'use strict';

class RegisterForm extends AsyncForm {

  onSubmit( options ) {
    User.register( options, response => {
      if ( response.success && response.user && response.user ) {
        User.setCurrent( response.user );
        super.resetFormData();
        App.setState( 'user-logged' );
        App.getModal( 'register' ).close();
      } else {
        console.error();
      }
    });
  };
}


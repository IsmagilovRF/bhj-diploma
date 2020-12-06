/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */


class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options.data, (err, response) => { //1. Регистрирует пользователя через User.register
			if (response && response.success) {
				this.element.reset(); //2. При успешной регистрации сбрасывает форму
				App.setState("user-logged"); //3. При успешной регистрации задаёт состояние App.setState( 'user-logged' ). То есть мы сразу авторизуем пользователя после успешной регистрации.
				let register = App.getModal("register");
				register.close(); //4. Находит окно, в котором находится форма и закрывает его (через метод Modal.close)
			}
    })
    
  }
}

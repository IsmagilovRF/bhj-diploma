/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */


class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.login(options.data, (err, response) => { //Регистрирует пользователя через User.login
			if (response && response.success) {
				this.element.reset(); //При успешной регистрации сбрасывает форму
				App.setState("user-logged"); //При успешной регистрации задаёт состояние App.setState( 'user-logged' ). То есть мы сразу авторизуем пользователя
				let login = App.getModal("login");
				login.close(); //Находит окно, в котором находится форма и закрывает его (через метод Modal.close)
			}
    })
    
  }
}

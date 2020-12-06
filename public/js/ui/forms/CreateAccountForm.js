/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */

class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    Account.create(options.data, (err, response) => { //Отправляет запрос на создание счёта через Account.create
			if (response && response.success) {
				let formModal = App.getModal("createAccount");
				formModal.close(); //Закрывает окно, в котором находится форма при успешном ответе
				this.element.reset(); //Сбрасывает форму
				App.update(); //и вызывает App.update() при успешном ответе
				App.getWidget("accounts").update()
			} 
		})
  }
}

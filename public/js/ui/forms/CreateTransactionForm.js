/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */

class CreateTransactionForm extends AsyncForm{
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    super(element);
		this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelectList = this.element.querySelector(".accounts-select");

		Account.list(User.current(), (err, response) => {
			if (response.data) {
				accountsSelectList.innerHTML = "";
				response.data.forEach((item) => {
					accountsSelectList.innerHTML += `<option value="${item.id}">${item.name}</option>`;
				})
			} 
    })
    
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
			if (response && (response.success === true)) {
				this.element.reset(); //В случае успешного ответа сбрасывает форму
				const type = options.data.type;
				const modalName = 'new' + type[0].toUpperCase() + type.substr(1);
				let transactionModal = App.getModal(modalName);
				transactionModal.close(); //В случае успешного ответа закрывает всплывающее окно, в котором находится данная форм
				App.update(); //В случае успешного ответа вызывает метод App.update для обновления информации о приложении
			}
    })
    
  }

}
  
/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */


class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
			throw new Error('elem not found. TransactionsWidget');
		}
		this.element = element;
		this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const income = this.element.querySelector(".create-income-button");
		const expense = this.element.querySelector(".create-expense-button");

    //При нажатии на кнопку «Доход» отображает всплывающее окно «Новый доход» (#modal-new-income) с помощью метода App.getModal
		income.addEventListener("click", function () {
			const incomeWindow = App.getModal("newIncome");
			incomeWindow.open();
		});

    //При нажатии на кнопку «Расход» отображает всплывающее окно «Новый доход» (#modal-new-expense) с помощью метода App.getModal
		expense.addEventListener("click", function () {
			const expenceWindow = App.getModal("newExpense");
			expenceWindow.open();
		})

  }
}
/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */


class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
			throw new Error("elem not found. TransactionsPage");
		}
		this.element = element;
		this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAccountButton = this.element.querySelector(".remove-account");

    //При нажатии на кнопку удаления счёта .remove-account, необходимо вызвать метод removeAccount
		removeAccountButton.addEventListener("click", () => {
			this.removeAccount();
		});

		this.element.addEventListener("click", event => {
      //При нажатии на кнопку удаления транзакции .transaction__remove, необходимо вызвать метод removeTransaction и передать туда идентификатор транзакции
			if (event.target.closest(".transaction__remove")) {
				let id = event.target.closest(".transaction__remove").dataset.id;
				this.removeTransaction(id);
			}
		});
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    //Если свойство lastOptions (см. метод render) не задано, метод не должен ничего делать.
    if (!this.lastOptions) {
			return
    }
    //Перед удалением метод должен показать диалоговое окно с текстом «Вы действительно хотите удалить счёт?»
		if (!confirm("Вы действительно хотите удалить счет?")) {
			return
    }
    //Вызывает Account.remove() для удаления счёта. При успехе вызывает App.update() для обновления приложения
		Account.remove(this.lastOptions.account_id, {}, (err, response) => {
			if (response && response.success) {
				this.clear();
				App.update();
			}
		});

  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    //Перед удалением метод должен показать диалоговое окно с текстом «Вы действительно хотите удалить эту транзакцию?»
    if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
      //Для этого вызывает Transaction.remove и в случае успеха вызывает App.update() для обновления приложения
			Transaction.remove(id, {}, (err, response) => {
				if (response && response.success) {
					App.update();
				}
			});
		}
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    //Если объект options не передан, метод не должен работать.
    if (!options) {
			return;
		}
		if (!options.account_id) {
			return;
    }
    //Для работы метода update следует сохранить options в свойство lastOptions.
		this.lastOptions = options;

    //Метод получает данные о счёте через Account.get() и в случае успеха вызывает renderTitle для отрисовки названия счёта
		Account.get(options.account_id, {}, (err, response) => {
			if (response) {
				this.renderTitle(response.data.name);
			}
		});
    //Метод получает список доходов и расходов пользователя через Transaction.list и отрисовывает данные через TransactionsPage.renderTransactions
		Transaction.list(options, (err, response) => {
			if (response.data) {
				this.renderTransactions(response.data);
			}
		});

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]); //Очищает транзакции. Вызывает renderTransactions с пустым массивом
		this.renderTitle('Название счета'); //Вызывает метод renderTitle. Задаёт заголовок счёта: «Название счёта»
		this.lastOptions = null; //Удаляет содержимое из lastOptions
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let newDate = new Date(date);
		let months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ];
		let month = months[newDate.getMonth()];
		let day = newDate.getDate();
		let year = newDate.getFullYear();
		let hours = newDate.getHours();
		let minutes = newDate.getMinutes();

		function formatTime(int) {
			if (int < 10) {
				return "0" + int;
			} else {
				return int;
			}
		};
		return `${day} ${month} ${year} г. в ${formatTime(hours)}:${formatTime(minutes)}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    const id = item.id;
		const type = item.type;
		const name = item.name;
		const date = this.formatDate(item.created_at);
		const sum = item.sum;
		return `
      <div class="transaction transaction_${type} row">
          <div class="col-md-7 transaction__details">
              <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
              </div>
              <div class="transaction__info">
                  <h4 class="transaction__title">${name}</h4>
                  <div class="transaction__date">${date}</div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="transaction__summ">
                  ${sum} <span class="currency">₽</span>
              </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${id}">
                <i class="fa fa-trash"></i>
              </button>
          </div>
      </div>
    `;

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */

  renderTransactions( data ) {
    
    const element = this.element.querySelector(".content");
		if (data) {
			element.innerHTML = "";
			for (let i = 0; i < data.length; i++) {
				element.innerHTML += this.getTransactionHTML(data[i]);
			}
    }
    
  }
}
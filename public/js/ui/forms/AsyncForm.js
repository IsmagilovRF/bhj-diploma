/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */


class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('element not found')
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы. В момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', e => {
      if (this.element.checkValidity()) {
        e.preventDefault();
				this.submit();
      }
    })
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    let formData = new FormData(this.element);
    let data = {};
    let entries = formData.entries();

    for (let elem of entries) {
      let key = elem[0];
			let value = elem[1];
			data[key] = value;
    }
    
    return data;
  }

  onSubmit( options ) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
		let options = {};
		options.url = this.element.getAttribute("action");
		options.method = this.element.method;
		options.data = this.getData();
		this.onSubmit(options);
  }
}

/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */


class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarMini = document.getElementsByClassName('sidebar-mini')[0];
    const sidebarMiniButton = document.getElementsByClassName('sidebar-toggle')[0];

    sidebarMiniButton.addEventListener('click', function() {
      sidebarMini.classList.toggle('sidebar-open');
      sidebarMini.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const itemLogin = document.querySelector(".menu-item_login");
		const itemRegister = document.querySelector(".menu-item_register");
    const itemLogout = document.querySelector(".menu-item_logout");
    
    //При нажатии на кнопку «Регистрация» необходимо открыть окно #modal-register (предварительно найдя его через App.getModal) с помощью метода Modal.open()
    itemRegister.addEventListener("click", function (event) {
			const registerModal = App.getModal("register");
			registerModal.open();
    });
    
    //При нажатии на кнопку «Войти» необходимо открыть окно #modal-login (предварительно найдя его через App.getModal) с помощью метода Modal.open()
    itemLogin.addEventListener("click", function (event) {
			const loginModal = App.getModal("login");
			loginModal.open();
    });
    
    //При нажатии на кнопку «Выйти» необходимо вызвать метод User.logout и после успешного выхода (response.success = true), нужно вызвать App.setState( 'init' )
    itemLogout.addEventListener("click", function (event) {
			User.logout({}, (err, response) => {
				if (response && (response.success === true)) {
					App.setState("init");
					User.unsetCurrent();
				}
			})
    });
  }
  

}

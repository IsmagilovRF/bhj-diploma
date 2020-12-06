/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */


class User {

  static url = '/user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    }
    //return undefined; 
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {

    return createRequest({
      url: this.url + '/current',
      method: 'GET',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response.user) { //Если в результате есть данные об авторизованном пользователе, необходимо обновить данные текущего пользователя (для этого вызывайте метод setCurrent)
          this.setCurrent(response.user);
        } else { //Если данных о пользователе нет (success = false), необходимо удалить запись об авторизации (для этого вызывайте метод unsetCurrent)
          this.unsetCurrent();
        }
        callback(err, response);
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    return createRequest({
      url: this.url + '/login',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response.user && (response.success === true)) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    })

  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  // const data = {
  //   name: 'Vlad',
  //   email: 'test@test.ru',
  //   password: 'abracadabra'
  // }
  static register( data, callback = f => f ) {
    return createRequest({
      url: this.url + '/register',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response.user && (response.success === true)) {
          User.setCurrent(response.user); //После регистрации установите в случае успешного ответа полученного пользователя с помощью метода User.setCurrent
        }
        callback(err, response);
      }
    })
  }
  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    return createRequest({
      url: this.url + '/logout',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response.user && (response.success === true)) {
          User.unsetCurrent(); //После успешного выхода необходимо вызвать метод User.unsetCurrent.
        }
        callback(err, response);
      }
    })
  }
}

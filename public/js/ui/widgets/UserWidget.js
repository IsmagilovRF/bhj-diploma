'use strict';

class UserWidget {

  constructor( element ) {
    if ( !element ) { throw Error }
    this.element = element;
  };

  update() {
    let currentUser = User.current()
    currentUser ? this.element.querySelector('p.user-name').innerHTML = currentUser.name : '';
  };

}

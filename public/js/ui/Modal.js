'use strict';

class Modal {

  constructor( element ) {
    if ( !element ) { throw Error }
    this.element = element;
    this.closeButtonsArray = Array.from(this.element.querySelectorAll('[data-dismiss="modal"]'))
    this.registerEvents();
  };

  registerEvents() {
    this.closeButtonsArray.forEach( element => {
      element.addEventListener('click', event => {
        this.close( event );
      });
    });

  };

  onClose() {
    this.close();
  };

  unregisterEvents() {
    this.closeButtonsArray.forEach( element => {
      element.removeEventListener('click', event => {
        this.close( event );
      });
    });
  }

  open() {
    this.element.style.display = "block";
  };

  close() {
    this.element.style.display = "none";
    this.unregisterEvents();
  };

}
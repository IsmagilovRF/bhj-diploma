'use strict';

class TransactionsPage {

  constructor( element ) {
    if ( !element ) { throw Error }
    this.element = element;
    this.registerEvents();
    this.lastOptions = {};
  };

  update() {
    if ( this.lastOptions.length > 0 ) {
      this.render( this.lastOptions );
    }
  };

  registerEvents() {
    // remove account or transaction
    this.element.onclick = event => {
      let eventElement = event.composedPath();
      if ( eventElement[0].classList.contains('remove-account') ) {
        this.removeAccount( eventElement[0] )
      } else if ( eventElement[0].classList.contains('transaction__remove') ) {
        this.removeTransaction( eventElement[0].dataset.id );
      } else if ( eventElement[1].classList.contains('transaction__remove') ) {
        this.removeTransaction( eventElement[1].dataset.id );
      }
    }
  };

  removeAccount() {
    if ( this.lastOptions.account_id ) {
      let confirmAccountRequest = confirm( 'Вы действительно хотите удалить этот счет?' );
      if ( confirmAccountRequest ) {
        Entity.remove( '/account', this.lastOptions.account_id, {}, response => {
          if ( response.success ) {
            this.clear();
            App.update();
          }
        });
      }
    }
  };

  removeTransaction( id ) {
    let confirmTransactionRequest = confirm( 'Вы действительно хотите удалить эту транзакцию?' );
    if ( confirmTransactionRequest ) {
      Entity.remove( '/transaction', id, {}, response => {
        if ( response.success ) {
          Array.from(this.element.querySelectorAll('div.transaction')).forEach( element => {
            if ( element.querySelector('button.transaction__remove').dataset.id === id ) {
              element.remove();
            }
          });
          App.update();
        }
      });
    }
  };

  render( options ) {
    this.clear();
    if ( options ) {
      this.lastOptions = options;
      Entity.get( `/account/${ options.account_id }`, options.account_id, { getAccount: true }, response => {
        if ( response.success ) {
          this.renderTitle( response.data.name );
        }
      });
      Entity.get( `/transaction?account_id=${ options.account_id }`, options.account_id, { getTransaction: true }, response => {
        if ( response.success ) {
          this.renderTransactions( response.data );
        }
      });
    }
  };

  clear() {
    this.renderTransactions( [] );
    this.renderTitle( 'Название счета' );
    this.lastOptions = {};
  };

  renderTitle( name ) {
    document.querySelector('span.content-title').innerHTML = name;
  };

  formatDate( date ) {
    return new Date( Date.parse( date ) ).toLocaleString('ru-RU',
        { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  getTransactionHTML( item ) {
    return `<div class="transaction ${ item.type == 'EXPENSE' ? 'transaction_expense' : 'transaction_income' } row">
              <div class="col-md-7 transaction__details">
                <div class="transaction__icon">
                  <span class="fa fa-money fa-2x"></span>
                </div>
                <div class="transaction__info">
                  <h4 class="transaction__title">${ item.name }</h4>
                  <!-- дата -->
                  <div class="transaction__date">${ this.formatDate( item.created_at ) }</div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="transaction__summ">
                <!--  сумма -->
                  ${ item.sum } <span class="currency">₽</span>
                </div>
              </div>
              <div class="col-md-2 transaction__controls">
                <!-- в data-id нужно поместить id -->
                <button class="btn btn-danger transaction__remove" data-id="${ item.id }">
                  <i class="fa fa-trash"></i>  
                </button>
              </div>
            </div>`
  };

  renderTransactions( data ) {
    if ( data.length > 0) {
      Array.from( data ).forEach(element => {
        document.querySelector('section.content').insertAdjacentHTML('beforeend',
            this.getTransactionHTML( element ));
      });
    } else {
      Array.from(this.element.querySelectorAll('div.transaction')).forEach( element => {
        element.remove();
      });
    }
  };

}

// 'use strict';
//
// class Transaction extends Entity {
//
//     static list( data, callback = f => f ) {
//         super.list( Object.assign({ url: '/transaction' }, data ), callback );
//     };
//
//     static create( data, callback = f => f ) {
//         super.create( Object.assign({ url: '/transaction' }, data ), callback );
//     };
//
//     static get( id, data, callback = f => f ) {
//         super.get( id, Object.assign({ url: '/transaction', id: id  }, data ), callback );
//     };
//
//     static remove( id, data, callback = f => f ) {
//         super.remove( id, Object.assign({ url: '/transaction', id: id  }, data ), callback );
//     };
//
// }
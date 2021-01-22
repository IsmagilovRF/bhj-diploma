'use strict';

class Entity {

    static list( URL, data, callback = f => f ) {
        createRequest({ data: Object.assign({ url: URL, method: 'GET' }, data ) }, callback);
    };

    static create( URL, data, callback = f => f ) {
        createRequest({ data: Object.assign({ url: URL, method: 'POST', _method: 'PUT' }, data ) }, callback);
    };

    static get( URL, ID, data, callback = f => f ) {
        createRequest({ data: Object.assign({ url: URL, id: ID,  method: 'GET' }, data ) }, callback);
    };

    static remove( URL, ID, data, callback = f => f ) {
        createRequest({ data: Object.assign({ url: URL, id: ID, method: 'POST', _method: 'DELETE' }, data ) }, callback);
    };

}

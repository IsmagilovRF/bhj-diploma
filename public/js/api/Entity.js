'use strict';

class Entity {

    static list( URL, data, callback = f => f ) {

        console.log('Entity list   ' + URL, data);

        createRequest({ data: Object.assign({ url: URL, method: 'GET' }, data ) }, callback);
    };

    static create( URL, data, callback = f => f ) {

        console.log('Entity create   ' + URL, data);

        createRequest({ data: Object.assign({ url: URL, method: 'POST', _method: 'PUT' }, data ) }, callback);
    };

    static get( URL, ID, data, callback = f => f ) {

        console.log('Entity get  ' + URL, ID, data);

        createRequest({ data: Object.assign({ url: URL, id: ID,  method: 'GET' }, data ) }, callback);
    };

    static remove( URL, ID, data, callback = f => f ) {

        console.log('Entity remove  ' + URL, ID, data);

        createRequest({ data: Object.assign({ url: URL, id: ID, method: 'POST', _method: 'DELETE' }, data ) }, callback);
    };

}

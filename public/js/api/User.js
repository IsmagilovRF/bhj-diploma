'use strict';

class User extends Entity {

    static setCurrent( user ) {
        localStorage.setItem('user', JSON.stringify( user ));
    };

    static unsetCurrent() {
        localStorage.removeItem('user');
    };

    static current() {
        return JSON.parse( localStorage.getItem('user') );
    };

    static isAuthorized( data, callback = f => f ) {
        super.list( `/user/current?id=${ data.id }`, Object.assign({ getAuthorizedUser: true }, data ), callback );
    };

    static login( data, callback = f => f ) {
        super.create( '/user/login', data, callback );
    };

    static register( data, callback = f => f ) {
        super.create( '/user/register', data, callback );
    };

    static logout( data, callback = f => f ) {
        super.create( '/user/logout', data, callback );
    };

}


'use strict';

class User extends Entity {

    static setCurrent( user ) {

        //console.log('User setCurrent   ');
        //console.log(user);

        localStorage.setItem('user', JSON.stringify( user ));
    };

    static unsetCurrent() {

        //console.log('User unsetCurrent   ');

        localStorage.removeItem('user');
    };

    static current() {

        //console.log('User current   ', JSON.parse( localStorage.getItem('user') ) );

        return JSON.parse( localStorage.getItem('user') );
    };

    static isAuthorized( data, callback = f => f ) {

        //console.log('User isAuthorized   data =  ' + data);

        super.list( `/user/current?id=${ data.id }`, Object.assign({ getAuthorizedUser: true }, data ), callback );
    };

    static login( data, callback = f => f ) {

        //console.log('User login  data =  ');
        //console.log(data);

        super.create( '/user/login', data, callback );
    };

    static register( data, callback = f => f ) {

        //console.log('User register =  ');
        //console.log(data);

        super.create( '/user/register', data, callback );
    };

    static logout( data, callback = f => f ) {

        //console.log('User logout   ');
        //console.log(data);

        super.create( '/user/logout', data, callback );
    };

}


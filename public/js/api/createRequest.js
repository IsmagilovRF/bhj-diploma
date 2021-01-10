'use strict';

const createRequest = (options = {}, callback) => {
    //console.log( '1 - options.data::::' );
    //console.log( options.data );
    
    const xhr = new XMLHttpRequest;
    // POST method
    const formData = new FormData();

    if (options.data.method === 'POST') {
        for ( let input in options.data ) { 
            formData.append( `${ input }`, options.data[ input ] ) }
    }
    // create request
    //console.log( '2 - JSON.stringify(options.data)::::' );
    //console.log( JSON.stringify(options.data));
    //console.log('3 - options.data.url::::' + options.data.url );
    //console.log('4 - formData::::');

    try {
        //for(let [name, value] of formData) { alert(`${name} = ${value}`); }//только при переборе видем содержимое formData

        xhr.open( options.data.method, options.data.url, true );

        xhr.withCredentials = true;
        xhr.responseType = 'json';
        //xhr.contentType =false; // habr 
        //xhr.processData = false; //habr

        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) { callback( xhr.response ) }
        };

        xhr.onerror = function () { console.error('Данные не найдены...') };

        options.data.method === 'GET' ? xhr.send( JSON.stringify( options.data ) ) : xhr.send( formData );

    } catch ( err ) { callback( err ) }

}




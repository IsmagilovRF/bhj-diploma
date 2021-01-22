'use strict';

const createRequest = (options = {}, callback) => {
    const optionsData = options.data;
    
    const xhr = new XMLHttpRequest;
    // POST method
    const formData = new FormData();

    if (optionsData.method === 'POST') {
        for ( let input in optionsData ) { 
            formData.append( `${ input }`, optionsData[ input ] ) }
    }
    // create request
    //for(let [name, value] of formData) { console.log('formData  ' + `${name} = ${value}`); }//только при переборе видем содержимое formData
    try {
        xhr.open( options.data.method, options.data.url, true );
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        //xhr.contentType =false; // habr 
        //xhr.processData = false; //habr
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) { 
                //console.log( xhr.response);
                callback( xhr.response );
            }
        };
        xhr.onerror = function () { console.error('Данные не найдены...') };
        //alert('между функциями');
        optionsData.method === 'GET' ? xhr.send( JSON.stringify( optionsData ) ) : xhr.send( formData );
    } catch ( err ) { callback( err ); }
}




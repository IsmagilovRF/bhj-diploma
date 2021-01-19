'use strict';

const createRequest = (options = {}, callback) => {
    const optionsData = options.data;

    console.log( 'НАЧАЛО createRequest -------------------------- optionsData:' );
    console.log( optionsData );
    
    const xhr = new XMLHttpRequest;
    // POST method
    const formData = new FormData();

    if (optionsData.method === 'POST') {
        for ( let input in optionsData ) { 
            formData.append( `${ input }`, optionsData[ input ] ) }
    }

    // create request
    //console.log( '2 - JSON.stringify(options.data)::::' );
    //console.log( JSON.stringify(optionsData));
    //console.log('3 - options.data.url::::' + optionsData.url );
    for(let [name, value] of formData) { console.log('formData  ' + `${name} = ${value}`); }//только при переборе видем содержимое formData

    try {
        //for(let [name, value] of formData) { alert(`${name} = ${value}`); }//только при переборе видем содержимое formData
        //optionsDataMethod = optionsData.method;
        //optionsDataUrl = optionsData.url;
        xhr.open( options.data.method, options.data.url, true );

        console.log('4 - xhr: ' );
        console.log(xhr);       

        xhr.withCredentials = true;
        xhr.responseType = 'json';
        //xhr.contentType =false; // habr 
        //xhr.processData = false; //habr
        //console.log('8 - xhr.status = ' + xhr.status + '     xhr.readyState = ' + xhr.readyState);
        //console.log('9 - xhr.response = ' + xhr.response);

        xhr.onreadystatechange = function () {
            console.log('8 - xhr.status = ' + xhr.status + '     xhr.readyState = ' + xhr.readyState);
            console.log('9 - xhr.response = ' + xhr.response);
            if (xhr.status === 200 && xhr.readyState === 4) { 
                console.log( xhr.response);
                callback( xhr.response );
            }
        };
        alert('между функциями');
        
        xhr.onerror = function () { console.error('Данные не найдены...') };

        optionsData.method === 'GET' ? xhr.send( JSON.stringify( optionsData ) ) : xhr.send( formData );

        

    } catch ( err ) { callback( err ); }
    
    console.log( 'ЗАВЕРШЕНИЕ createRequest --------------------------' );
}




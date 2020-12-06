//import { response } from "express";
/*
 * Основная функция для совершения запросов на сервер.
 */
//https://github.com/netology-code/bhj-diploma/blob/master/md/api.md

const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    //formData.append("name","Alex");
    //formData.append("age", 25);

   

    xhr.responseType = options.responseType;
    // У возвращаемого объекта всегда свойство withCredentials задано в true
    xhr.withCredentials = true;
    //При параметре method = GET, данные из объекта data должны передаваться в строке адреса.
    if ( options.method === "GET" ) {
        options.url += "?";
        console.log('======ifififif ' + 'options.method = ' + options.method, 'options.url = ' + options.url);
        console.log('======options.data = ' + options.data);

        for ( let item in options.data ) {
            options.url += `${item}=${options.data[item]}&`;
            console.log('=2=2=2=2=for for ' + 'options.method = ' + options.method, 'options.url = ' + options.url);
            console.log('=2=2=2=2=item = ' + item + 'options.data[item] = ' + options.data[item])
        }
    } else { //При параметре method отличном от GET, данные из объекта data,
             // должны передаваться через объект FormData


             console.log('++++++elseelse ' + 'options.method = ' + options.method, 'options.url = ' + options.url);
             console.log('++++++options.data = ' + options.data, 'formData = ', formData);
     


        for ( let item in options.data ) {
            formData.append( item, options.data[item] );
            console.log('+2+2+2+2+ item = ', item, 
            'options.data[item] = ' + options.data[item], 
            'formData = ', formData);
        }

    }
    
   //for (let pair of formData.entries()) {
    //   console.log('-------iiiiii-------', pair[0]+ ', '+ pair[1]); 
    //}




    xhr.addEventListener( "readystatechange", function () {
        if ( xhr.readyState === 4 && xhr.status === 200 ) {
            let response = xhr.response;
            options.callback( null, response ); //В случае успешного выполнения кода, 
            // необходимо вызвать функцию, заданную в callback и передать туда данные
        }
    })

    xhr.open( options.method, options.url );
    
    for (let pair of formData.entries()) {
        console.log('-------iiiiii-------', pair[0]+ ', '+ pair[1]); 
     }

    
    console.log('xhr.response = '+ xhr.response , 
   ' options.data = ' + options.data, 
   'options.method = ' + options.method, 
   'options.url = ' + options.url, 
   'formData = ' + formData);

    try {
        xhr.send( formData ); 
    } catch ( err ) {
        callback( err ); //Перехват сетевой ошибки. В случае, если в процессе выполнения функции
        // возникают ошибки, вам необходимо передать эту ошибку в параметр err
    }

    return xhr;
};

export const hasOwnProperty = (obj) =>{
    Object.keys(obj).forEach(function (key) {
        if(typeof obj[key] === 'undefined'){
           delete obj[key];
         }
       });

       return obj;
}
const fs = require('fs')

let handlers = {}

let obj = {ceva: JSON.stringify({data:12}), ce:2}

handlers.read = function (filePath, dataMap, callback) {
    let templateData = {
        'key1' : dataMap.map
    }
    const data = fs.readFileSync(filePath,'utf-8')
    let mergedString = mergeData(data,templateData);
    callback(mergedString);
}

let mergeData = function(str,data){
    str = typeof(str) == 'string' && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};

    for(let key in data){
        if(data.hasOwnProperty(key) && typeof(data[key] == 'string')){
            let replace = data[key];
            let find = '{'+key+'}';
            str = str.replace(find,replace);
        }
    }
    return str;
}

module.exports = handlers;
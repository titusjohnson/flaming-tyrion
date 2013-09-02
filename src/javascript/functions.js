// source: http://stackoverflow.com/questions/6268679/best-way-to-get-the-key-of-a-key-value-javascript-object
if(!Object.keys) Object.keys = function(o){
     if (o !== Object(o))
          throw new TypeError('Object.keys called on non-object');
     var ret=[],p;
     for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
     return ret;
}

// source: http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
// modified return to just pass object
function returnObjectByName(objectName, context, args) {
    var args = Array.prototype.slice.call(arguments).splice(2);
    var namespaces = objectName.split(".");
    var func = namespaces.pop();

    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }

    return context[func].apply(this, args);
}
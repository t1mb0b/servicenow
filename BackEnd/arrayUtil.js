function slowUnique(a1) {
    var a = [];
    var l = a1.length;
    for (var i = 0; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (a1[i] === a1[j]) 
                j = ++i;
        }
        a.push(a1[i]);
    }
    return a;
}

----

function fastUnique(arr) {
    var hash = {}, result = [];
    for ( var i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i]) ) {
            hash[ arr[i] ] = true;
            result.push(arr[i]);
        }
    }
    return result;
}

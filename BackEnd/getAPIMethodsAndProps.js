var testObj = new GlideRecord('incident'); //TODO: replace this with whatever object you want to test
getMethodsAndProperties(testObj);

/**
 * Populates an extant array in-place, of methods and properties of a given object.
 * @param methodsAndProperties {array} - the array to populate/modify in-place.
 * @param testObj {object} - The object to get the list of properties for.
 */
function getMethodsAndProperties(testObj) {
    var i, prop, propType, errorProp,
        methodsArray = [],
        primitivesArray = [],
        objectsArray = [],
        errorMessages = [];
    
    for (prop in testObj) {
        try {
            propType = typeof testObj[prop];
            //gs.print(prop + ': ' + testObj[prop].length);
            if (hasProp(testObj, prop)) {
                if (propType === 'object') {
                    objectsArray.push(prop);
                } else if (propType === 'function') {
                    methodsArray.push(prop);
                } else {
                    primitivesArray.push(prop);
                }
            }
        } catch(e) {
            var msg = e.message;
            errorMessages.push(msg);
        }
    }
    
    for (i = 0; i < errorMessages.length; i++) {
        removeIllegalProp(objectsArray, errorMessages[i]);
        removeIllegalProp(methodsArray, errorMessages[i]);
        removeIllegalProp(primitivesArray, errorMessages[i]);
    }
    
    gs.print(
        '\n\n\n\n' +
        '//METHODS: \n' +
        methodsArray.join(': function() {},\n') + (methodsArray.length > 0 ? ': function() {},' : '') + '\n\n' +
        '//OBJECTS: \n' +
        objectsArray.join(': {},\n') + (objectsArray.length > 0 ? ': {},' : '') + '\n\n' +
        '//PRIMITIVES: \n' +
        primitivesArray.join(': \'prop\',\n') + (primitivesArray.length > 0 ? ': \'prop\'' : '')
    );
}

/**
 *
 * @param obj {object} A refernce to the object which we're testing to see if it natively contains the property specified in the second argument.
 * @param prop {string} The name of the property to test
 * @returns {boolean}
 */
function hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

function removeIllegalProp(props, msg) {
    if (!msg.indexOf('Illegal access') < 0) {
        gs.print('Error is not illegal access.');
        return;
    }
    var methodIndexEnd = msg.indexOf(' in class');
    var propName = msg.substring(0, methodIndexEnd);
    propName = propName.substring(propName.lastIndexOf(' ') + 1); //prop/method name
    var colonIndex = propName.indexOf(':');
    if (colonIndex >= 0) {
        propName = propName.substring(colonIndex);
    }
    
    if (props.indexOf(propName) >= 0) {
        gs.print('Removing ' + propName);
        props.splice(props.indexOf(propName), 1);
    }
}

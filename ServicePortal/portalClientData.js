/**
 * Sets a client data variable. Works on both classic UI (using legacy g_user.setClientData() method) and portal UI (using this.client_data).
 * @param {string} key - The key to store the data in. Use this with getClientData() to retrieve the value stored here.
 * @param {string} val - The value to store in the specified key.
 */
function setClientData(key, val) {
    if (typeof g_user.setClientData != 'undefined') {
        g_user.setClientData(key, val);
    } else {
        if (typeof this.client_data == 'undefined') {
            this.client_data = {};
        }
        this.client_data[key] = val;
    }
}

/**
 * Gets a client data variable, stored using setClientData(). Works on both classic UI (using legacy g_user.getClientData() method) and portal UI (using this.client_data).
 * @param {string} key - The key to the value you'd like to retrieve.
 * @returns {string}
 */
function getClientData(key) {
    if (typeof g_user.getClientData != 'undefined') {
        return g_user.getClientData(key);
    } else {
        try {
            return (typeof this.client_data[key] == 'undefined' ? '' : this.client_data[key]);
        } catch (ex) {
            console.error('Error retrieving client data value ' + key + ': ' + ex.message);
        }
    }
    return '';
}
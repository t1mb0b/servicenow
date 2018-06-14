// Usage
var myNewDate = new caseyDateSI('20180531014627.0Z');
var myDateYear = myNewDate.getYear();

// Script Include

var caseyDateSI = Class.create();
caseyDateSI.prototype = {
    initialize: function(inputDate) {
  		this._inputDate = inputDate;

      // Location of different date part information in a dictionary of 
      // start index + length
      this.dateParserData = {
        YEAR: {START: 0, LEN: 4},
        MONTH: {START: 4, LEN: 2},
        DAY: {START: 6, LEN: 2},
        HOUR: {START: 8, LEN: 2},
        MIN: {START: 10, LEN: 2},
        SEC: {START: 12, LEN: 2}
      };
      
  		return this;
    },

    getGlideDateTime: function() {
      // Logic that uses other internal methods to construct a GlideDateTime 
      // object & return it
    },

    // Can expose every single date part as its own function if you want.
    getYear: function() {
      var 
      return this._getDatePart("YEAR");
    },
    getMonth: function() {
      var 
      return this._getDatePart("MONTH");
    },

    // Internal method your other public methods can call
    _getDatePart: function(part) {
      var thisPartStart = this.dateParserData[part].START;
      var thisPartLen = this.dateParserData[part].LEN;
      return this._inputDate.substr(thisPartStart, thisPartLen);
    },

    type: 'caseyDateSI'
};

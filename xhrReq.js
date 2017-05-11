/*
you can always use $j.get or $j.post however window globals are blocked in scope
i think a future release needs to include a Glide helper for making REST calls
pheedbaq has also posted a ui script helper lib that can be used as a little helper wrapper to make rest calls
you can also use XMLHttpRequest which is the native, low level API for making rest calls in JS
*/

var xhr = new XMLHttpRequest();
xhr.open('GET', 'api/now/incident/whatever');
xhr.send(null);


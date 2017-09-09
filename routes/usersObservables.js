const express = require('express');
const fetch = require('node-fetch');
const Rx = require('@reactivex/rxjs');

var router = express.Router();

var usersPromise = new Promise((resolve, reject) => {
	return fetch('http://jsonplaceholder.typicode.com/users/').then(response => {
	    if (response.ok) {
	       resolve(response.json());
	    } else {
	       reject(new Error('error'));
	    }
	    }, error => {
	       reject(new Error(error.message))
	});  
 });   

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("With Observable");
    Rx.Observable.fromPromise(usersPromise).subscribe(
       (data) => res.render('users', { title: 'Users', users: data}),
       (e) => console.log(e.message),
       null
    );     
});

module.exports = router;
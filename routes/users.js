const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

var usersPromise = function(){
    return new Promise((resolve, reject) => {
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
}    

/* GET users listing. */
router.get('/', function(req, res, next) {
    usersPromise()
    .then(data => res.render('users', { title: 'Users', users: data}))
    .catch(err => console.error(err));
    
});

module.exports = router;

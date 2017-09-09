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

async function askMe(res){
	try{
	   console.log("With Async / Await");	
       let data= await usersPromise();
       res.render('users', { title: 'Users', users: data});
	}catch(error){
		console.log(error.message);
	}
}
/* GET users listing. */
router.get('/', function(req, res, next) {
   askMe(res);    
});

module.exports = router;
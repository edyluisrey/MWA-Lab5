var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var data='';
  fetch('http://jsonplaceholder.typicode.com/users/')
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json);
        data=json;
        res.render('users', { title: 'Users', users: data });
    });	
    
});

module.exports = router;

var axios = require('axios');
var express = require('express')
var router = express.Router()

router.get('/house/:id', function(req, res) {
  axios.get('https://api.propublica.org/congress/v1/members/house/'+req.params.id+'/current.json', {
    headers: {'X-API-Key': '7qRl1TJZeM1Mm1VxZzOHG7A3qaa6517W3Nc0cpxg'}
  })
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
  })
})

router.get('/senate/:id', function(req, res) {
  axios.get('https://api.propublica.org/congress/v1/members/senate/'+req.params.id+'/current.json', {
    headers: {'X-API-Key': '7qRl1TJZeM1Mm1VxZzOHG7A3qaa6517W3Nc0cpxg'}
  })
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
  })
})

router.get('/single/:id', function(req, res) {
  axios.get('https://api.propublica.org/congress/v1/members/'+req.params.id+'.json', {
    headers: {'X-API-Key': '7qRl1TJZeM1Mm1VxZzOHG7A3qaa6517W3Nc0cpxg'}
  })
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
  })
})

router.get('/donors/:id', function(req, res) {
  axios.get('http://www.opensecrets.org/api/?method=candContrib&cid='+req.params.id+'&cycle=2016&apikey=c68f01db4f95db15b1c7bfd01f5710cc&output=json')
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
    console.log(error);
  })
})

router.get('/sector/:id', function(req, res) {
  axios.get('http://www.opensecrets.org/api/?method=candSector&cid='+req.params.id+'&cycle=2016&apikey=c68f01db4f95db15b1c7bfd01f5710cc&output=json')
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
    console.log(error);
  })
})


module.exports = router

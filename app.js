'use strict'

var domify = require('domify')
var h = require('hyperscript')
var Firebase = require('firebase')

var ref = new Firebase('https://chstech.firebaseio.com/')
// be sure to enable authentication for email & password
// https://chstech.firebaseio.com/?page=Auth
// sample user: guest@foo.com:foobar

require('angular').module('app', [])
  .controller('LoginCtrl', function ($scope) {
    $scope.user = { }
    // Login Form Submit Handler
    $scope.login = function(user) {
      // Firebase ref authenticate 
      ref.authWithPassword({
        email: user.email,
        password: user.password 
      }, function (err, authData) {
        // callback
        if (err) return console.log(err)
        // No Error Success
        alert('Login Successful!')
        // here is the user data
        console.log(authData)
      })
    }
  })

document.body.appendChild(
  domify(
    h('div', { 'data-ng-app': 'app'}, [
      h('div', { 'data-ng-controller': 'LoginCtrl'}, [
        h('form', { 'data-ng-submit': 'login(user)' }, [
          h('legend', 'Login'),
          h('div', [
            h('label', 'Email'),
            h('input', { type: 'email', 'data-ng-model': 'user.email'})
          ]),
          h('div', [
            h('label', 'Password'),
            h('input', { type: 'password', 'data-ng-model': 'user.password'})
          ]),
          h('button', 'Login')
        ])
      ])
    ]).outerHTML
  )
)


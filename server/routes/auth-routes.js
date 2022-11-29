const router = require('express').Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup')


//auth login
// router.get('/login',  async (req, res) => {
// });


router.post('/google/return',
function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
    
    )(req, res, next);
},
function(req, res) {
    console.log(req.user);

    console.log('We received a return from AzureAD.');
    res.status(200).json(req.user)
        // res.redirect('/');
});


router.get('/hello',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      // required
        resourceURL:"https://graph.windows.net",    // optional. Provide a value if you want to specify the resource.
        customState: 'my_state'  // optional. Provide a value if you want to provide custom state value
      }
    )(req, res, next);
  },
function(req, res) {
    console.log(req);
    console.log(res);
    // console.log(next);
    console.log('Login was called in the Sample');
    // res.redirect('/');
});



// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
// router.get('/google',passport.authenticate('azuread-openidconnect'))


module.exports = router;
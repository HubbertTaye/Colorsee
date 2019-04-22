module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/activate', isLoggedIn, function(req, res){
      res.render('activate.ejs', {
        user: req.user
      });
    });

    app.get('/colorlog', isLoggedIn, function(req, res) {
      db.collection('colors').find({userId: req.session.passport.user}).toArray((err, result) => {
        if (err) return console.log(err)
        res.render('colorlog.ejs', {
          user : req.user,
          colors: result
        })
      })
    });

    app.get('/mkpalette', isLoggedIn, function(req, res) {
      db.collection('colors').find({userId: req.session.passport.user}).toArray((err, result) => {
        if (err) return console.log(err)
        res.render('mkpalette.ejs', {
          user : req.user,
          colors: result
        })
      })
    });

//render user's made palettes from palette collection into palette gallery page
    app.get('/palettegalry', isLoggedIn, function(req, res) {
      db.collection('palettes').find({userId: req.session.passport.user}).toArray((err, result) => {
        if (err) return console.log(err)
        res.render('palettegalry.ejs', {
          user : req.user,
          //specify user session palettes specifically
          palettes: result.reverse()
        })
      })
    });

  //===============================================================

    //post into colors collection of database
    app.post('/colors', (req, res) => {
      //mandatory: save colors for a specific user

        //optimize: prevent user from saving a color they already have
        db.collection('colors').insertOne({alias: req.body.alias, rgb: req.body.rgb, hex: req.body.hex, userId: req.session.passport.user}, (err, result) => {
          if (err) return console.log(err)
          console.log('saved to database')

        //optimize: page redirects to a page that simply contains the string "Color is saved to Color Log!" styled on timeout for a few seconds before redirecting back to /activate
          res.redirect('/activate')
        })
      })//closes post into color collection

      //delete colors
      app.delete('/colors', (req, res) => {
          db.collection('colors').findOneAndDelete({alias: req.body.alias, rgb: req.body.rgb, hex: req.body.hex, userId: req.session.passport.user}), (err, result) => {
            if(err) return res.send(500, err)
            res.send('message deleted!')
          }
        })

    //post into palettes collection of database
    app.post('/palette', (req, res) =>{
      db.collection('palettes').insertOne({title: req.body.title, colors: req.body.colors, image: req.body.image, userId: req.session.passport.user}, (err, result) =>{
        if (err) return console.log(err)
        console.log('saved to database')
      })
    })
    //delete palettes
    app.delete('/palette', (req, res) => {
    db.collection('palettes').findOneAndDelete({title: req.body.title, image: req.body.image, userId: req.session.passport.user}, (err, result) => {
      if(err) return res.send(500, err)
      res.send('message deleted!')
    })
  })
        // ===================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/colorlog', // redirect to main page
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/activate', // redirect to main page
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
  }
}

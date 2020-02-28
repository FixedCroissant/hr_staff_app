module.exports = function isLoggedIn(req, res, next) {
    //Check if the person is logged in by checking cookie.
    if (req.cookies['jwt']) {
             console.log('person is signed in, we can proceed....')
      // user is authenticated
      next();
    } else {
      // return unauthorized
      res.send(401, "Unauthorized");
    }
  };
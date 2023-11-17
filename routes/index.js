const router = require('express').Router();
const apiRoutes = require('./api');

// appends /api om front of all routes
router.use('/api', apiRoutes);

// sends back if route is incorrect in insomnia
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;
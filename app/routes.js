//create a new express router
const express = require('express'),
  router = express.Router(),
  mainController = require('./controllers/main.controller'),
  eventController = require('./controllers/events.controller');

//export router
module.exports = router;

//define routes ======================================
//main routes
router.get('/', mainController.showHome);

//event routes
router.get('/events', eventController.showEvents);

//seed events
router.get('/events/seed', eventController.seedEvents);

//contact routes
router.get('/contact', mainController.showContact);

//create + show created event
router.get('/events/create', eventController.showCreateEventForm)
      .post('/events/create', eventController.createEvent);

//update events
router.get('/events/:slug/edit', eventController.showEditEvents)
      .post('/events/:slug', eventController.editEvent);

//delete events
router.get('/events/:slug/delete', eventController.deleteEvent);

//show a single event
router.get('/events/:slug', eventController.showSingle);
const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingle: showSingle,
  seedEvents: seedEvents,
  showCreateEventForm: showCreateEventForm,
  createEvent: createEvent,
  showEditEvents: showEditEvents,
  editEvent: editEvent,
  deleteEvent: deleteEvent
};

/**
 * Show all events
 */
function showEvents (req, res) {
  //get all events
  Event.find({}, (err, events) => {
    if(err) res.send(err);

    //return a view with data
    res.render('pages/events', {
      events: events
    })
  });
}

/**
 * Show a single event
 */
function showSingle (req, res) {
  //get a single event
  Event.findOne({slug: req.params.slug}, (err, event) => {
    if(err) res.send(err);
    res.render('pages/single', {
      event: event
    });
  });
}

/**
 * Seed our database
 */
function seedEvents (res) {
  //create some events
  const events = [
    {name: 'Basketball', description: 'Throwing into a basket.'},
    {name: 'Swimming', description: 'Toma is the fast fish.'},
    {name: 'Weightlifting', description: 'Lifting heavy things up.'},
    {name: 'Ping Pong', description: 'Super fast paddles.'}
  ];

  //use the Event model to insert/save
  Event.remove({}, () => {
    for (event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }
  });

  //seeded!
  res.send('Database seeded!');
}

/**
 * Show create form
 */
function showCreateEventForm(req, res) {
  res.render('pages/create')
}

/**
 * Create event
 */
function createEvent (req, res) {
    const event = new Event({
      name: req.body.name,
      description: req.body.description
    });

    //save event
    event.save((err) => {
      if (err) throw err;

      //redirect to the newly created event
      res.redirect(`/events/${event.slug}`)
    })
}

/**
 * Show edit event
 */
function showEditEvents(req,res) {
  Event.findOne({slug: req.params.slug}, (err, event) => {
    res.render('pages/edit', {
      event: event
    })
  })
}

/**
 * Edit event
 */
function editEvent(req, res) {
  //
  // const errors = req.validationErrors();
  // if (errors) {
  //   req.flash('errors', errors.map(err => err.msg));
  //   return res.redirect(`/events/${req.params.slug}/edit`);
  // }

  Event.findOne({ slug: req.params.slug }, (err, event) => {
    event.name        = req.body.name;
    event.description = req.body.description;

    event.save((err) => {
      if (err) throw err;
      res.redirect('/events');
    });
  });
}

/**
 * Delete event
 */
function deleteEvent(req, res) {
  Event.remove({ slug: req.params.slug }, (err) => {
    if (err) throw err;

    res.redirect('/events');
  });
}
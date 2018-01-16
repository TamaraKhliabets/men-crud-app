module.exports = {

  //show the home page
  showHome: (req, res) => {
    res.render('pages/home');
  },

  //show the contact page
  showContact: (req, res) => {
    res.render('pages/contact', {layout: 'sidebar-layout'});
  }

}
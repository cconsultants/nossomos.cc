var sendgrid = require('sendgrid')(process.env.SMTP_MAILER_USERNAME, process.env.SMTP_MAILER_PASSWORD);

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Code Consultants | ' });
};

exports.postContact = function(req, res){
  body = "MESSAGE FROM NOSSOMOS.CC: <br /><br />";
  body += "Name: " + req.body.name + "<br />";
  body += "Email: " + req.body.email + "<br />";
  body += "Message: <br />";
  body += req.body.message.replace("\n", "<br>")
  body += "<br /><br />";

  var payload   = {
    to      : 'djalma@nossomos.cc',
    from    : req.body.email,
    subject : '[CC Website] Contact Form - ' + req.body.name,
    html    : body
  }

  sendgrid.send(payload, function(err, json) {
    console.log(err, json);
    res.json({ success: (err) ? false : true });
  });
};

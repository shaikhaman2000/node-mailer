const express = require('express')
const sendMailRouter = express.Router()
var nodemailer = require('nodemailer');

var smtpConfig = {
  host: 'smtp.gmail.com',
  secure: true, // use SSL
  port: 465,
  auth: {
    user: process.env.THE_EMAIL,
    pass: process.env.THE_PASSWORD
  },
  tls: {
        rejectUnauthorized: false
    }
};

var transporter = nodemailer.createTransport(smtpConfig);


sendMailRouter.post('/', (req,res, next) => {

    var mailOptions = {
        to: "RECEIVER_EMAIL_ID",
        subject: `MAIL_SUBJECT`,
        //This text will be sent to the Receiver, I have created a template for Demo
        text: `
          From: 
          ${req.body.name}

          Subject:${req.body.subject}

          ${req.body.message}

          Contact Details:
          Email: ${req.body.email}
          Contact No.:${req.body.contact}
        `
      };

    // error handling goes here. 
    transporter.sendMail(mailOptions, function(err,info){
        if(err) {
            res.status(400);
            res.json({
                status: 'fail',
                error:err
            })
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200);
            res.json({
                status: 'success',
                error:'Successful'
            });
        }
    })
  });

module.exports = sendMailRouter
const express = require('express')
const sendInquiryRouter = express.Router()
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


sendInquiryRouter.post('/', (req,res, next) => {

    var mailOptions = {
        to: "sharmabhumi2000@gmail.com",
        subject: `You have got a New Enquiry/Request from ${req.body.name}`,
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

module.exports = sendInquiryRouter
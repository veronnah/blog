const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();
require('dotenv').config()

exports.sendEmailVerification = functions.firestore.document('submissions/{docId}')
  .onCreate((snap, ctx) => {
    const data = snap.data();

    let authData = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    });
    authData.sendMail({
      from: 'yoo.veroon@gmail.com',
      to: `${data.email}`,
      subject: 'Message from contact form',
      text: `${data.email}`,
      html: `${data.email}`,
    }).then(res => {
      console.log('successfully sent that mail');
    }).catch(err => {
      console.log(err)
    })
  })

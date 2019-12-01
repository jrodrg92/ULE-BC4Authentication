var nodemailer = require('nodemailer');

//definimos el email origen.
const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tfgjavierodriguez@gmail.com',
            pass: 'LcdJ2016@'
        }
});

module.exports.senMail = function (destinatario, code){

  // Definimos el email
  var mailOptions = {
      from: 'tfgjavierodriguez@gmail.com',
      to: destinatario,
      subject: 'Codigo acceso',
      text: 'Su codigo es:   '+ code
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function(error, info){
      if (error){
          console.log(error);

      } else {

      }
  });


}

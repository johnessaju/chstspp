const io = require('socket.io')(3000);

const mongoose= require('mongoose');

const usermodel = require('./model/model');

mongoose.connect('mongodb://localhost:27017/tutorcomp',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected to database"));

const questions = [];

const faker={valid:false};

io.on('connection', socket => {
socket.emit('welcome',"welcome to tutorcomp");
socket.emit('name',"what is  your name");
socket.on('name',message=>{
  username=message;
  if(username)
  socket.emit('phone',"Eneter your phone number ?");
   
});

//phonenumber section
socket.on('phonenumber',message=>{
    
  if(validatephonenumber(message)){
    phonenumber=message
  socket.emit('askemail',message={message:"Enter your email id",phonenumbervalid:true});    
  }
  else
  socket.emit("wrong-phone","please enter a valid phone number");
 });

 //  email section

socket.on('email-check',message=>{
  if(ValidateEmail(message)){
  emailid=message;
  socket.emit('verified-email',message={message:"we provide eductional classes online",emailvalid:true});  
  
  }
  else
  socket.emit("wrong-email","please enter a valid Email id");
})

socket.on('client-message',message=>{
  console.log(message)
})

// cost

socket.on('client-message',message=>{
  if(message.match( /cost|price/g )){
  questions.push(message);
    socket.emit("pricing","our english class cost Rs 10,000 per month");
   if(!faker.valid)
    setTimeout(()=>{socket.emit("late-caller","our agent will call you in 10 minutes")},5000);
     faker.valid=false;
  }
  else if(message.match( /free/g )){
    questions.push(message);
      socket.emit("freeuser","sorry we do not provide free classes ");
      fakeuser=false;
      setTimeout(()=>{socket.emit("late-caller","we will call you back soon")},5000);
      faker.valid=true;
      Object.freeze(faker);
    }
  else
  {
    questions.push(message);
socket.emit("default","is there anything i can help you with?");
  }
})

// disconnection

socket.on('disconnect',()=>{
  console.log("exited");
  const newdata = new usermodel({
    name: username,
      mailid:emailid,
      phone: phonenumber,
      question:questions,  
      fake: faker.valid
  });
  newdata.save().then(()=>console.log("user saved"))
})

})





function validatephonenumber(phno)
{
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(phno.match(phoneno))
     {
	   return true;
	 }
   else
     {
	   return false;
     }
}


function ValidateEmail(mail)
{
var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
if(mail.match(mailformat))
return true;
else
return false;
}

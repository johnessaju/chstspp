const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
nameflag=0;
phonenumberflag=0;

socket.on('welcome',message=>{
  appendMessage(message); 
});

socket.on('name',message=>{
  appendMessage(message);
});

socket.on('phone',message=>{
  appendMessage(message);
});

socket.on('askemail',data=>{
  appendMessage(data.message);
  if(data.phonenumbervalid){
  phonenumberflag=1;
  nameflag=2;
  }
})

socket.on('wrong-phone',message=>{
  appendMessage(message);
})

socket.on('verified-email',data=>{
  appendMessage(data.message);
  if(data.emailvalid){
  //flag=1;
  phonenumberflag=2;
  }
})

socket.on('wrong-email',message=>{
  appendMessage(message);
})

socket.on('pricing',message=>{
  appendMessage(message);
})

socket.on('default',message=>{
  appendMessage(message);
})

socket.on('late-caller',message=>{
  appendMessage(message);
})

socket.on('freeuser',message=>{
  appendMessage(message);
})
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  messageInput.value='';
  if(nameflag==0){
  appendMessage(`${message}: ${message}`)
  socket.emit('name',message);
  nameflag=1;
  this.name=message;
  }

else if(nameflag==1){

socket.emit('phonenumber',message);
appendMessage(`${name}: ${message}`);


}


else if(phonenumberflag==1){

  socket.emit('email-check',message);
  appendMessage(`${name}: ${message}`)
  
  }

 else{
  appendMessage(`${name}: ${message}`)
  socket.emit('client-message', message)
 }
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
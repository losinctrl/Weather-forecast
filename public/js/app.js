console.log("fcuk")
const weatherform = document.querySelector('form');
const inputform  = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')
weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
const location = inputform.value;
messageOne.textContent = "Loading..."
fetch('/weather?address='+ location).then((response)=>{
response.json().then((data)=>{
   
    if(data.error){
        messageOne.textContent = data.error;
    }
    else{
    
      messageOne.textContent = data.location
    messageTwo.textContent =  data.forecast
    }
})})

})
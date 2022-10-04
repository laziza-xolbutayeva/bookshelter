'use strict'

// $("#btn-book").addEventListener("submit",(e)=>{

// })
$(".btn-book").addEventListener('click' , function(evt){
    evt.preventDefault()
    let inputEmailValue = $("#username").value
    let inputPasswordValue = $("#password").value
    
    fetch('https://reqres.in/api/login',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email : inputEmailValue,
            password: inputPasswordValue,
        }),
    }).then(res => res.json())
      .then(data => {
    
        if(data.token) {
            window.localStorage.setItem('token', data.token)
            window.location.replace('home.html')
        }else {
            alert('Bu Login Xato !!!!!!!!')
        }
      })
})
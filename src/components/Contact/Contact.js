import React, { Component } from 'react'
import axios from 'axios';
import '../../App';

export default class Contact extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        axios.post('/api/send', {
                name: name,   
                email: email,  
                message: message
            }
        ).then(response => {
            console.log('response', response)
            if (response.data.msg === 'success'){
                alert("Message Sent."); 
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        }).catch(error => {
            console.log('Error', error)
        })
    }

    resetForm =() => {
        document.getElementById('contact-form').reset();
    }

  render() {
    return (
      <div>
        <h2>Contact</h2>
        <h4>Questions, comments, and/or concerns here: </h4>
        <form id="contact-form">
            <div className="parent-contact">
            
                <label >Name: </label>
                <input type="text" id="name" />
                <label>Email address: </label>
                <input type="email" id="email" aria-describedby="emailHelp" />
                <label >Message: </label>
                <textarea rows="10" id="message"></textarea>
         
            </div>
            <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
        </form>
      </div>
    )
  }
}

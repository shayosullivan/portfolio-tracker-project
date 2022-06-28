
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

const btnSubmit = document.getElementById("btn-submit");

function contactUs() { 
    const name = name.value; 
    const email = email.value;
    const message = message.value;

    if (!name || !email || !message ) {
        return alert("you need to fill up all the forms.");
    }
    
    let user_data = {
        name: name,
        email: email,
        message: message 
    }

    let user_data_str = JSON.stringify(user_data);

    let clientsArr = JSON.parse(localStorage.getItem('users')) || [];


    clientsArr.push(user_data);

    localStorage.setItem("users", JSON.stringify(clientsArr));
    return alert("Email Sent!");

}




btnSubmit.addEventListener("click", submit);
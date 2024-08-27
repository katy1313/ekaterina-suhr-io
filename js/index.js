const el = document.createElement('footer');
const messages = document.querySelector('#messages');
messages.append(el);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector('footer');
const copyright = document.createElement('p');

copyright.innerHTML = `\u00A9 Ekaterina Suhr  ${thisYear}`;

footer.appendChild(copyright);
copyright.style.margin = '10px 50px';

const skills = ["JavaScript", "HTML", "CSS", "API", "GitHub", "SQL"];
const skillsSection = document.querySelector('#skills');
const skillList = skillsSection.querySelector('ul');
skillList.style.listStyle = 'none';
skillList.style.padding = '0';
skillList.style.display = 'flex';
skillList.style.flexDirection = 'column';

for(let i = 0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerHTML = skills[i];
    skillList.appendChild(skill);
    skill.style.margin = '0 3em';
}

// Creating the Submit Form
const messageForm = document.querySelector('[name="leave_message"]');
const leaveMessage = document.querySelector('#leave_message');

messageForm.addEventListener('submit', submitMessage);

function submitMessage(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    
    const username = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;
    
    console.log(username, email, message);

    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li'); //makes a new list item
    messageList.appendChild(newMessage);

    newMessage.innerHTML = `
    <a href="mailto:${email}">${username}</a>
    <span> ${message}</span>`;

    // Remove button creation
    const removeButton = document.createElement('button');
    removeButton.innerHTML = "Remove";
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "remove_button");

    removeButton.addEventListener('click', function(){
        const entry = removeButton.parentNode;
        entry.removeChild(removeButton);
        newMessage.remove();

    // To hide the message section when empty
        if(messageList.children.length === 0) {
            messageSection.style.display = 'none';
            leaveMessage.append(el);
        }
    });  
   
//   Creating the Edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = "Edit";
    editButton.setAttribute("type", "button");
    editButton.setAttribute("class", "edit_button");

    editButton.addEventListener('click', function(){
       newMessage.innerHTML = `<a href="mailto:${email}">${username}</a>
       <textarea> ${message}</textarea>`
       newMessage.appendChild(removeButton);
       newMessage.appendChild(editButton); 
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    newMessage.appendChild(editButton);   

    messageForm.reset(); //to reset the fields after submit
}



document.addEventListener('DOMContentLoaded', function () {

    const el = document.createElement('footer');
    const messages = document.querySelector('#messages');
    messages.append(el);

    const today = new Date();
    const thisYear = today.getFullYear();

    const footer = document.querySelector('footer');
    const copyright = document.createElement('p');

    copyright.innerHTML = `\u00A9 Ekaterina Suhr  ${thisYear}`;
    copyright.style.color = '#ede0d4';

    footer.appendChild(copyright);

    const skills = ["JavaScript", "HTML", "CSS", "API", "GitHub", "SQL"];
    const skillsSection = document.querySelector('#skills');
    const skillList = skillsSection.querySelector('ul');

    for (let i = 0; i < skills.length; i++) {
        const skill = document.createElement('li');
        skill.innerHTML = skills[i];
        skillList.appendChild(skill);
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

        removeButton.addEventListener('click', function () {
            const entry = removeButton.parentNode;
            entry.removeChild(removeButton);
            newMessage.remove();

            // To hide the message section when empty
            if (messageList.children.length === 0) {
                messageSection.style.display = 'none';
                leaveMessage.append(footer);
            }
        });

        //   Creating the Edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = "Edit";
        editButton.setAttribute("type", "button");
        editButton.setAttribute("class", "edit_button");

        editButton.addEventListener('click', function () {
            newMessage.innerHTML = `<a href="mailto:${email}">${username}</a>
        <textarea id='messageText'> ${message}</textarea>`

        //  Catching the new message value(edited)
            let text;
            let textarea = document.getElementById('messageText');
            textarea.addEventListener('input', function getText() {
                text = textarea.value;
            });

        //   Creating the second Submit button
            const resubmitButton = document.createElement('button');
            resubmitButton.innerHTML = "Submit";
            resubmitButton.setAttribute("type", "button");
            resubmitButton.setAttribute("class", "resubmit_button");
            newMessage.appendChild(resubmitButton);
            newMessage.appendChild(removeButton);

        //  Displaying the edited message after the user clicks 'Submit' button
            resubmitButton.addEventListener('click', () => {
                newMessage.innerHTML = `<a href="mailto:${email}">${username}</a>
            <span> ${text || message}</span>`; //fallback to original if not edited

                newMessage.appendChild(editButton);
                messageList.appendChild(newMessage);
                newMessage.appendChild(removeButton);
            })
        });

        
        newMessage.appendChild(editButton);
        messageList.appendChild(newMessage);
        newMessage.appendChild(removeButton);

        messageForm.reset(); //to reset the fields after submit
    }

    // Creating fetch
    fetch("https://api.github.com/users/katy1313/repos")
        .then(response => {
            if (!response.ok) {
                throw new Error("Not Found");
            }
            return response.json();
        })
        .then(repositories => {
            if (repositories.length === 0) {
                throw new Error("No repos exist");
            } else {
                console.log(repositories);
            }
            //Display repositories in the list
            const projectSection = document.querySelector('#projects');
            const projectList = document.createElement('ul');
            projectSection.appendChild(projectList);

            for (let i = 0; i < repositories.length; i++) {
                const project = document.createElement('li');
                const url = repositories[i].html_url;
                const repoName = repositories[i].name;
                project.innerHTML = `<a href="${url}" target="_blank" rel="nofollow">${repoName}</a>`
                projectList.appendChild(project);

            }
        })
        .catch(error => {
            console.log(error);
        })

})


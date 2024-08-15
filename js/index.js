const el = document.createElement('footer');
const connect = document.querySelector('#connect');
connect.append(el);

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
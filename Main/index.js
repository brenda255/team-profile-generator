const inquirer = require('inquirer');
const fs = require('fs');
const engineer = require('./lib/Engineer');
const employee = require('./lib/Employee');
const intern = require('./lib/Intern');
const manager = require('./lib/Manager');
const createTeam = [];

//starts with manager questions
const managerQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'manager',
            message: 'Welcome! Enter the manager name',
        },
        {
            type: 'integer',
            name: 'employeeId',
            message: 'Enter the employee id',
        },
        {
            type: 'input',
            name: 'emailAddress',
            message: 'Enter your email address',
        },
        {
            type: 'integer',
            name: 'officeNumber',
            message: 'Enter your office number',
        },
        {
            type: 'list',
            name: 'nextMember',
            message: 'Select who you want to add next',
            choices: ['Engineer', 'Intern']
            },

    ])

.then((answers) => {
    const { manager, employeeId, emailAddress, officeNumber, nextMember } = answers;
    const managerObj = { name: manager, id: employeeId, email: emailAddress, officeNumber: officeNumber, role: 'Manager' };
    createTeam.push(managerObj);

    switch (nextMember) {
      case 'Engineer':
        engineerQuestions();
        break;
      case 'Intern':
        internQuestions();
        break;
      case 'Finish':
        generateHTML();
        break;
      default:
        console.log('Invalid choice.');
        break;
    }
  });
};
//start the engineer questions
const engineerQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'engineer',
            message: 'What is the engineers name?',
        },
        {
            type: 'integer',
            name: 'engineerId',
            message: 'Enter the engineers id',
        },
        {
            type: 'input',
            name: 'engineerAddress',
            message: 'Enter your the engineers email address',
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'Enter the engineers GitHub username',
        },
        {
            type: 'list',
            name: 'nextMember',
            message: 'Select who you want to add next',
            choices: ['Engineer', 'Intern', 'Finish']
        }
    ])

    .then((answers) => {
        const { engineer, engineerId, engineerAddress, engineerGithub, nextMember } = answers;
        const engineerObj = { name: engineer, id: engineerId, email: engineerAddress, github: engineerGithub, role: 'Engineer' };
        createTeam.push(engineerObj);
  
        switch (nextMember) {
          case 'Engineer':
            engineerQuestions();
            break;
          case 'Intern':
            internQuestions();
            break;
          case 'Finish':
            generateHTML();
            break;
          default:
            console.log('Invalid choice.');
            break;
        }
    });
};
//start the intern questions
const internQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'intern',
            message: 'What is the interns name?',
        },
        {
            type: 'integer',
            name: 'internId',
            message: 'Enter the interns id',
        },
        {
            type: 'input',
            name: 'internAddress',
            message: 'Enter your the interns email address',
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'Enter the school the intern attends',
        },
        {
            type: 'list',
            name: 'nextMember',
            message: 'Select who you want to add next',
            choices: ['Engineer', 'Intern', 'Finish']
        }
    ])
        .then((answers) => {
            const { intern, internId, internAddress, internSchool, nextMember } = answers;
            const internObj = { name: intern, id: internId, email: internAddress, school: internSchool, role: 'Intern' };
            createTeam.push(internObj);
    
            switch (nextMember) {
              case 'Engineer':
                engineerQuestions();
                break;
              case 'Intern':
                internQuestions();
                break;
              case 'Finish':
                generateHTML();
                break;
              default:
                console.log('Invalid choice.');
                break;
            }
        });
    };
    const generateHTML = () => {
        //Create the head section
        let html = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="./dist/style.css">
            <title>My Team</title>
          </head>
          <body>
            <div>
              <h2>${createTeam[0].name}</h2>
              <p>ID: ${createTeam[0].id}</p>
              <p>Email: <a href="mailto:${createTeam[0].email}">${createTeam[0].email}</a></p>
              <p>Office Number: ${createTeam[0].officeNumber}</p>
            </div>`;      
        // Add the HTML for each engineer and intern
        for (let i = 1; i < createTeam.length; i++) {
          if (createTeam[i].role === 'Engineer') {
            html += `
              <div>
                <h2>${createTeam[i].name}</h2>
                <p>ID: ${createTeam[i].id}</p>
                <p>Email: <a href="mailto:${createTeam[i].email}">${createTeam[i].email}</a></p>
                <p>GitHub: <a href="https://github.com/${createTeam[i].github}">${createTeam[i].github}</a></p>
              </div>
            `;
          } else if (createTeam[i].role === 'Intern') {
            html += `
              <div>
                <h2>${createTeam[i].name}</h2>
                <p>ID: ${createTeam[i].id}</p>
                <p>Email: <a href="mailto:${createTeam[i].email}">${createTeam[i].email}</a></p>
                <p>School: ${createTeam[i].school}</p>
              </div>
            `;
          }
        }
      
        // Write the HTML to a file
        fs.writeFileSync('team.html', html);
        // Display the HTML on the command line
        console.log(html);
      };
      

// Call the managerQuestions function to start the program
managerQuestions();

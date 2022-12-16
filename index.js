
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const test = require('./template.js');
const employees =[]

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs
function newEmployee() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'position',
            message: 'What position is this employee?',
            choices: [
                'Manager',
                'Intern',
                'Engineer'
            ]
        
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the email of the employee?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee?'
        }
        ]) 
        .then(({ position, email, id, name }) => {
            switch(position) {
                case 'Manager':
                    inquirer.prompt([
                       {
                        type: 'input',
                        name: 'officeNumber',
                        message: 'What is the office number'
                       } 
                    ]).then(( {officeNumber }) => {
                        employees.push(new Manager(
                            name,
                            id,
                            email,
                            officeNumber
                        ))

                        another()
                    })
                break;
                case 'Intern':
                    //if they pick intern ask about school
                    inquirer.prompt ([
                        {
                            type: 'input',
                            name: 'School',
                            message: 'What school did the intern attend?'
                        }
                    ])
                    .then(({school}) => {
                        employees.push(new Intern (name,id,email,school));
                        another()
                    });
                break;
        
                case 'Engineer':
                //if they pick Engineer ask about github
                inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'github',
                        message: 'What is the Engineers github username'

                    },
                ])
                .then(({github}) => {
                    employees.push(new Engineer(name, id, email, github));
                    another();
                })
                break;
        
                default:
                //
            }
        })
}

function another() {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'more',
            message: 'Create another?'
        }
    ]).then(({ more }) => {
        if (more) newEmployee()
        else renderHTMLFile()
    })

}

function renderHTMLFile() {
    test()
    fs.writeFileSync('index.html', /*hmtl*/`

    <!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Profile Generator</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    </head>
    <div class="jumbotron" style="text-align: center; background-image : url(./assets/background.png); background-size: cover; background-position: center ; background-repeat: no-repeat ; color:rgb(238, 21, 21); text-align:center; " id="jumbotron">
        <h1 class="display-5" style="font-weight:bolder; font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; text-align: left;">Meet Our Team!</h1>
        </div>
        <div class="container">
        <div class="column">
        ${employees.map(employee => /*html*/`
        <div class= "col-md-4 text-dark bg-light border border-dark rounded-lg" style = "margin : 5px; box-shadow: 5px 5px 5px">
        <h1 class="card-title" style="text-align: center">${employee.getName()}</h1>
        <h2 class=" mb-2 text-dark">${employee.getRole()}</h2>
        <h3 class=" mb-2 text-dark text-truncate">Id: ${employee.getId()}</h3>
        <h4 class=" mb-2 text-muted text-truncate"><a href="mailto:${employee.getEmail()}" class="card-link">${employee.getEmail()}</a></h3>
      </div>
      `
      )} 
        </div>
              `
        );
      }


newEmployee()

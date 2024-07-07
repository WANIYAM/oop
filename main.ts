#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

class Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Person {
  students: Student[] = [];
  addStudent(student: Student) {
    this.students.push(student);
  }
  findStudent(name: string): Student | undefined {
    return this.students.find(student => student.name === name);
  }
}

const persons = new Person();

const programeStart = async (persons: Person) => {
  console.log(chalk.blue.bold("\nWelcome to the Interactive CLI Program!\n"));
  
  do {
    const answer = await inquirer.prompt([
      {
        name: 'opt',
        type: 'list',
        message: 'Who would you like to talk to?',
        choices: ['Self', 'Student', 'Exit'],
      },
    ]);

    if (answer.opt === 'Exit') {
      console.log(chalk.red.bold('Exiting...'));
      process.exit();
    }

    if (answer.opt === 'Self') {
      console.log(chalk.green.bold('\nHi, I am talking to myself.\n'));
      console.log(chalk.green.italic('I am in good health.'));
    }

    if (answer.opt === 'Student') {
      const answer2 = await inquirer.prompt([
        {
          name: 'student',
          type: 'input',
          message: 'Which student do you want to talk to?',
        },
      ]);

      const student = persons.findStudent(answer2.student);

      if (!student) {
        const newStudent = new Student(answer2.student);
        persons.addStudent(newStudent);
        console.log(chalk.cyan(`\nHello, I am ${newStudent.name}.\n`));
        console.log(chalk.cyan('How are you?'));
      } else {
        console.log(chalk.cyan(`\nHello, I am ${student.name}. I am doing well.\n`));
      }

      console.log(chalk.yellow.bold('\n--- Student Data ---\n'));
      persons.students.forEach(student => {
        console.log(chalk.yellow(`- ${student.name}`));
      });
    }
  } while (true);
};

programeStart(persons);

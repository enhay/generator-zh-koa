/* eslint-disable prettier/prettier */
'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the divine ${chalk.red('generator-pgc-node')} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Your project name",
      },
      {
        type: "confirm",
        name: "path",
        message: "make directory in current path?"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    console.log(this.destinationRoot);
    console.log(this.props);
    // this.fs.copy(
    //   this.templatePath('node/**/*'),
    console.log(this);
    //   this.destinationRoot()
    // );
  }

  install() {
    //this.installDependencies();
  }
};

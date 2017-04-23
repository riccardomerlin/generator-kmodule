'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('appname', {type: String, required: false});
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the gnarly ' + chalk.red('generator-kmodule') + ' generator!'
    ));

    if (this.options.appname) {
      this.appname = this.options.appname;
      return;
    }

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      // Defaults to the project's folder name if the input is skipped
      default: this.appname
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.appname = props.name;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  paths() {
    this.destinationRoot(this.appname);
  }
};

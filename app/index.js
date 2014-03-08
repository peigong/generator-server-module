'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;
var githubOptions = {
  version: '3.0.0'
};

if (proxy) {
  githubOptions.proxy = {};
  githubOptions.proxy.host = url.parse(proxy).hostname;
  githubOptions.proxy.port = url.parse(proxy).port;
}

var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

var ServerModuleGenerator = module.exports = function ServerModuleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ServerModuleGenerator, yeoman.generators.Base);

ServerModuleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'name',
      message: 'Would you like to named this module?',
      default: this.appname
    },
    {
      name: 'version',
      message: 'What is this module version?',
      default: '0.1.0'
    },
    {
      name: 'githubUser',
      message: 'Would you mind telling me your username on GitHub?',
      default: 'someuser'
    }
  ];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.version = props.version;
    this.githubUser = props.githubUser;
    cb();
  }.bind(this));
};

ServerModuleGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  githubUserInfo(this.githubUser, function (res) {
    /*jshint camelcase:false */
    this.realname = res.name;
    this.email = res.email;
    this.githubUrl = res.html_url;
    done();
  }.bind(this));
};

ServerModuleGenerator.prototype.app = function app() {
  var base_dir = ['lib', 'modules', this.name].join(path.sep),
    hooks_dir = ['lib', 'hooks', 'start'].join(path.sep),
    config_dir = [base_dir, 'config'].join(path.sep),
    helpers_dir = [base_dir, 'lib', 'helpers'].join(path.sep),
    models_dir = [base_dir, 'lib', 'models'].join(path.sep);
    
  this.mkdir(hooks_dir);
  this.mkdir(config_dir);
  this.mkdir(helpers_dir);
  this.mkdir(models_dir);
  this.mkdir([base_dir, 'routes'].join(path.sep));
  this.mkdir([base_dir, 'middleware'].join(path.sep));


  this.copy('_gitkeep', [hooks_dir, '.gitkeep'].join(path.sep));
  this.copy('_gitkeep', [config_dir, '.gitkeep'].join(path.sep));
  this.copy('_gitkeep', [helpers_dir, '.gitkeep'].join(path.sep));
  this.copy('_gitkeep', [models_dir, '.gitkeep'].join(path.sep));

  this.copy('_gitignore', '.gitignore');
  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.template('_README.md', 'README.md');
  this.template('_bower.json', 'bower.json');

  this.template('project.package.json', 'package.json');
  this.template('module.package.json', [base_dir, 'package.json'].join(path.sep));
  this.template('route.js', [base_dir, 'routes', 'route.js'].join(path.sep));

  this.copy('middleware.js', [base_dir, 'middleware', 'middleware.js'].join(path.sep));
};

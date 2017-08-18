// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      'karma-spec-reporter',
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    // coverageIstanbulReporter: {
    //   reports: [ 'html', 'lcovonly' ],
    //   fixWebpackSourcePaths: true
    // },
    angularCli: {
      environment: 'dev'
    },
    
    reporters: ['spec'],

    specReporter: {
        maxLogLines: 3,             // limit number of lines logged per test
        suppressErrorSummary: true, // do not print error summary
        showSpecTiming: true,      // print the time elapsed for each spec
      },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};

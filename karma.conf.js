/* global process */

module.exports = function(config) {
  'use strict';

  var configuration = {
    frameworks: ['mocha', 'chai'],
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-story-reporter'
    ],
    files: [
      '.tmp/live-dom.js',
      '.tmp/component.js',
      'tests/{,**/}*.js'
    ],
    browsers: [ 'ChromeHeadless', 'FirefoxHeadless' ],
    customLaunchers: {
      // from: https://github.com/GoogleChrome/puppeteer/issues/1925
      ChromeHeadlessCustom: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      },
      Chrome_headless: {
        base: 'Chrome',
        flags: ['--headless', '--no-sandbox'],
      },
      Chrome_no_sandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    reporters: ['story']
  };

  if(process.env.DOCKER_CI){
    configuration.browsers = [ 'ChromeHeadlessCustom', 'FirefoxHeadless' ];
  }

  if(process.env.TRAVIS){
    configuration.browsers = [ 'Chrome_no_sandbox', 'Firefox' ];
  }

  if(process.env.DRONE){
    configuration.browsers = [ 'Chrome' ];
  }

  if(process.env.WERCKER){
    configuration.browsers = [ 'Chrome' ];
  }

  config.set(configuration);
};

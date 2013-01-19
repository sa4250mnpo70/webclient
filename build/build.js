var fs = require('fs-extra');
var rjs = require('requirejs');
var wrench = require('wrench');

var copyFileSync = function(srcFile, destFile, encoding) {
  var content = fs.readFileSync(srcFile, encoding);
  fs.writeFileSync(destFile, content, encoding);
}

var version = Date.now();

var outputFolder = 'output/version/' + version

fs.removeSync('output');

fs.mkdirSync('output');
fs.mkdirSync('output/version');
fs.mkdirSync(outputFolder);

// Copy whole directory to output directory, this is not fantastic
// Depends on how the server is configured. If we had an external build directory
// We could get rid of a lot of this.

wrench.copyDirSyncRecursive('../css', outputFolder + '/css');
wrench.copyDirSyncRecursive('../img', outputFolder + '/img');
wrench.copyDirSyncRecursive('../js', outputFolder + '/js');
wrench.copyDirSyncRecursive('../locales', outputFolder + '/locales');
wrench.copyDirSyncRecursive('../prototypes', outputFolder + '/prototypes');
wrench.copyDirSyncRecursive('../templates', outputFolder + '/templates');
copyFileSync('../config.js', 'output/config.js', 'utf8');
copyFileSync('../favicon.ico', 'output/favicon.ico', 'base64');

var index = fs.readFileSync('../index.html', 'ascii');
index = index.replace('css/main.css', 'version/' + version + '/css/main.css');
index = index.replace(' data-main="js/app/main"', ' data-main="/version/' + version + '/js/app/main"');
index = index.replace('/js/vendor/', '/version/' + version + '/js/vendor/');
index = index.replace(' data-main="js/app/main"', ' data-main="/version/' + version + '/js/app/main"');
fs.writeFileSync('output/index.html', index);


rjs.optimize({
    baseUrl: '../js/app',
    mainConfigFile: '../js/app/main.js',
    out: outputFolder + '/js/main.js',
    name: 'main'
});
rjs.optimize({
    cssIn: '../css/main.css',
    out: outputFolder + '/css/main.css'
});




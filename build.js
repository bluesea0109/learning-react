var fs = require('fs');
var path = require('path');
var bowerDir = path.resolve(process.cwd(), 'bower_components');
var buildDir = path.resolve(process.cwd(), 'mx_modules');
var aggregateBower = require('aggregate-bower');
var inferBaseCode = 'modulex.init({name:"seed"});';
var kgConfigContent = '';
var extraContent = ['',inferBaseCode,kgConfigContent].join('\n');

function generateSeedJs() {
    var seedDebugJsContent = '',
        seedJsContent = '',
        filesList = ['modulex', 'feature', 'ua', 'meta'];
    for (var i = 0; i < filesList.length; i++) {
        var debugFilePath = path.join(buildDir, filesList[i] + '-debug.js'),
            miniFilePath = path.join(buildDir, filesList[i] + '.js');
        seedDebugJsContent += fs.readFileSync(debugFilePath).toString();
        seedJsContent += fs.readFileSync(miniFilePath).toString();
    }

    fs.writeFileSync(path.join(buildDir, 'seed-debug.js'), seedDebugJsContent + extraContent);
    fs.writeFileSync(path.join(buildDir, 'seed.js'), seedJsContent + extraContent);
}

aggregateBower(bowerDir, buildDir);
generateSeedJs();

console.log('done...');



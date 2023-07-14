const fs = require('fs')
const { methods } = require('../utilities/utilities')
var pages = {};
// const testFolder = 'test/utilities/methods';
const logger = require('../utilities/winston');
const { startStep, addStep, endStep } = require('../utilities/allureReporter')


// fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//         let fileSplit = file.split('.');
//         if (fileSplit.length === 3 && fileSplit[1] && fileSplit[1].toLowerCase() === 'page') {
//             pages[`${fileSplit[0].toLowerCase()}page`] = require(`./${fileSplit[0]}.${fileSplit[1]}`)
//         }
//     });
// });

/* project wise  */


const fileReads = () => {
    try {
        const testFolder = 'test/projects';
        fs.readdir(testFolder, (err, list) => {
            list.forEach(project => {
                fs.readdir(`${testFolder}/${project}`, (err, files) => {
                    files.forEach(file => {
                        var stats = fs.statSync(`${testFolder}/${project}/${file}`);
                        if (stats.isFile()) {
                            let fileSplit = file.split('.');
                            if (fileSplit.length === 3 && fileSplit[1] && fileSplit[1].toLowerCase() === 'page') {
                                pages[`${fileSplit[0].toLowerCase()}page`] = require(`./${project}/${fileSplit[0]}.${fileSplit[1]}`)

                            }
                        }
                        else {
                            fs.readdir(`${testFolder}/${project}/${file}`, (err, subFiles) => {
                                subFiles.forEach(suFile => {
                                    let fileSplit = suFile.split('.');
                                    if (fileSplit.length === 3 && fileSplit[1] && fileSplit[1].toLowerCase() === 'page') {
                                        pages[`${fileSplit[0].toLowerCase()}page`] = require(`./${project}/${file}/${fileSplit[0]}.${fileSplit[1]}`)

                                    }

                                })
                            })

                        }
                    });

                })
            })

        });
    }
    catch (err) {
        logger.error(`File Read Error , ${err.message}`)
    }
}
fileReads()


class MethodExecutorPage {
    async Execute(method, page, obj) {
        try {
            await addStep(`${method} is start`)
            if (pages[page.toLowerCase()]) {
                if (pages[page.toLowerCase()][method]) {
                    await pages[page.toLowerCase()][method](obj);
                    await addStep(`${method} is end`)
                    return true;
                }
                else {
                    await addStep(`${method} is not found`, '', 'failed')
                    await endStep('failed')
                    logger.error(`${method} is not found`)
                    return false;
                }
            }
            else {
                await addStep(`${page} is not found`, '', 'failed')
                await endStep('failed')
                logger.error(`${page} is not found`)
                return false;
            }
        }
        catch (e) {
            await addStep(`Execute ERROR:  ${e.message} (method:${method})`, '', 'failed')
            await endStep('failed')
            logger.error(`ERROR-Execute :- page:${page},method:${method}, ${e.message}`)
            // process.exit(1)
            return false
        }
    }
    async genericExecute({ pageName, objectName, action }) {
        try {
            await pages[pageName.toLowerCase()][objectName][action]();
            return true;
        }
        catch (e) {
            await addStep(`Execute ERROR:  ${e.message} (generic-method:${method})`, '', 'failed')
            await endStep('failed')
            logger.error(`ERROR-Execute :- page:${page},generic-method:${method}, ${e.message}`)
            return false
        }
    }
}



module.exports = new MethodExecutorPage();
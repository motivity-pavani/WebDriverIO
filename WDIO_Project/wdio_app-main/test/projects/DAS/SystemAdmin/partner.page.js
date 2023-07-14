
const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');
var asyncLoop = require('node-async-loop');

class Partner extends Common {

    get saveBtn() {
        return $(`//button[text()=' Save ']`)
    }

    async addPartner({ list }) {
        const partnerList = list.split(',');
        this.data.tableBtnName = 'Add Partner';
        await click(this.TableBtn);
        this.data.dropDownMenuValue = partnerList[0];
        this.data.dropHeader = "Partner";
        await click(this.openDropDown)
        await click(this.selectDropDownInput);
        await click(this.saveBtn)
        await this.alertMessage(`Add Partner - ${partnerList[0]}`)
        await commonMethods.waitForBrowser(5000)

        this.data.tableBtnName = 'Add Partner';
        await click(this.TableBtn);
        this.data.dropDownMenuValue = partnerList[1];
        this.data.dropHeader = "Partner";
        await click(this.openDropDown)
        await click(this.selectDropDownInput);
        await click(this.saveBtn)
        await this.alertMessage(`Add Partner - ${partnerList[1]}`)
        await commonMethods.waitForBrowser(5000)

        this.data.tableBtnName = 'Add Partner';
        await click(this.TableBtn);
        this.data.dropDownMenuValue = partnerList[2];
        this.data.dropHeader = "Partner";
        await click(this.openDropDown)
        await click(this.selectDropDownInput);
        await click(this.saveBtn)

        await this.alertMessage(`Add Partner - ${partnerList[2]}`)
        await commonMethods.waitForBrowser(5000)

        this.data.tableBtnName = 'Add Partner';
        await click(this.TableBtn);
        this.data.dropDownMenuValue = partnerList[3];
        this.data.dropHeader = "Partner";
        await click(this.openDropDown)
        await click(this.selectDropDownInput);
        await click(this.saveBtn)
        await this.alertMessage(`Add Partner - ${partnerList[3]}`)
        await commonMethods.waitForBrowser(5000)
        this.data.tableBtnName = 'Add Partner';
        await click(this.TableBtn);
        this.data.dropDownMenuValue = partnerList[4];
        this.data.dropHeader = "Partner";
        await click(this.openDropDown)
        await click(this.selectDropDownInput);
        await click(this.saveBtn)
        await this.alertMessage(`Add Partner - ${partnerList[4]}`)
        await commonMethods.waitForBrowser(2000)

        // await commonMethods.waitForBrowser(10000)

        // const partnerList = ['test1', 'test 2', 'TBB Now LLC'];
        // const partnerList = list.split(',');
        // var self = this;
        // asyncLoop(partnerList, async function (item, next) {
        //     self.data.tableBtnName = 'Add Partner';
        //     await click(self.TableBtn);
        //     self.data.dropDownMenuValue = item;
        //     self.data.dropHeader = "Partner";
        //     await click(self.openDropDown)
        //     await click(self.selectDropDownInput);
        //     await click(self.saveBtn)
        //     await commonMethods.waitForBrowser(5000)

        // }, async function (err) {
        //     console.log('Finished!');
        //     await commonMethods.waitForBrowser(10000)
        // });



    }

}
module.exports = new Partner()
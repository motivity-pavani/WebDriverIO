const commonMethods = require('./common.methods');
const { setText, click, selectFromDropdown } = require('./actions');
const utilities = require("./utilities");
const Common = require('./common');
var asyncLoop = require('node-async-loop');
class Partner extends Common{
    get saveBtn() {
        return $(`//button[text()=' Save ']`)
    }
    get partnerTabBtn(){
        return $('//div//a[@href]//div//span[text()="PARTNER"]');
     }
    get feeValue(){
        return $('//input[@type="number"]');
    }

    async addPartner({ list, Value}) {
        console.log("*************partner***************")
        await commonMethods.waitForBrowser(10000)   
        await click(this.partnerTabBtn)
       // const partnerList = list.split(',');
        this.data.tableBtnName = 'Add Partner';
        await click(this.TableBtn);
       // this.data.dropDownMenuValue = partnerList[0];
       this.data.dropDownMenuValue = list;
        this.data.dropHeader = "Partner Name";
        await click(this.openDropDown)
        await click(this.selectDropDownInput);
        await commonMethods.waitForBrowser(5000)
        await setText(this.feeValue, Value)
        await click(this.saveBtn)
        //await this.alertMessage(`Add Partner - ${partnerList}`)
        await this.alertMessage(`Add Partner - ${list}`)
        await commonMethods.waitForBrowser(5000)

        
}
}
module.exports = new Partner()
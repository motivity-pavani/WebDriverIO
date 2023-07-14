const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');

class Broker extends Common {

    get inputEffectiveDate() {
        return $('input[name="effectiveDate"]');
    }
    get checkBoxIsPrimary() {
        return $('//label[text()="Is Primary"]//following-sibling::input');
    }
    get buttonSave() {
        return $('//button[text()=" Save "]');
    }

    async AddBroker({ brokerName, effectiveDate, isPrimary }) {
        let check = true;
        if (isPrimary == false || isPrimary == 'false') {
            check = false;
        }
        let date = effectiveDate == 'default' ? utilities.dt : effectiveDate
        this.data.tableBtnName = 'Add Broker';
        await click(this.TableBtn)
        await commonMethods.waitForBrowser(1000)
        this.data.dropDownMenuValue = brokerName;
        this.data.dropHeader = "Broker";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        await setText(this.inputEffectiveDate, date)
        if (check) {
            await click(this.checkBoxIsPrimary);
        }
        await click(this.buttonSave);
        await this.alertMessage('Add Broker')

    }

}

module.exports = new Broker()
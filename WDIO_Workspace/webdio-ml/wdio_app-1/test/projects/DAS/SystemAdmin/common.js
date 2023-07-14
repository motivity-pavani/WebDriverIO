
const { startStep, addStep, endStep } = require('../../../utilities/allureReporter');
const { setText, click, selectFromDropdown } = require('../actions');
module.exports = class Common {

    data = {
        dropDownMenuValue: "",
        dropHeader: "",
        tableBtnName: "",
        inputLabelName: "",
        subTabsLabelName: ""
    }

    get openDropDown() {
        return $(`//label[text()="${this.data.dropHeader}"]/following-sibling::ng-select[1]`);
    }
    get selectDropDownInput() {
        // return $(`//label[text()="${this.data.dropHeader}"]/following-sibling::ng-select[1]//following::span[text()='${this.data.dropDownMenuValue}']`)
        return $(`//label[text()="${this.data.dropHeader}"]/following-sibling::ng-select[1]//following::span[contains(text(),'${this.data.dropDownMenuValue}')]`)
    }

    get TableBtn() {
        // return $(`//button//div//i[@title='${this.data.tableBtnName}']`)
        return $(`//button//div//i[contains(@title,'${this.data.tableBtnName}')]`)
    }

    get inputField() {
        return $(`//label[text()='${this.data.inputLabelName}']/following-sibling::input[1]`)
    }

    get inputTextAreaField() {
        return $(`//label[text()='${this.data.inputLabelName}']/following-sibling::textarea[1]`)
    }
    get saveBtnInModel() {
        return $(`//button[text()=' Save ']`)
    }

    get subTabsLabel() {
        return $(`//span[@class="link-button-name" and text()="${this.data.subTabsLabelName}"]`)
    }

    get yesBtn() {
        return $(`//button[text()=' Yes ']`)
    }

    get okBtn() {
        return $(`//button[text()=' Ok ']`)
    }
    get markInput() {
        return $(`//i[@class='bi bi-file-check-fill']`)
    }



    async alertMessage(actionName = "") {
        let alert = await $('div[role=alertdialog]');
        let message = await alert.getText();

        // console.log("alert message:", await alert.getText())
        await addStep(`${actionName} - ${message}`)
        // return null
        // return $('div[role=alertdialog]')
    }

    async subTabs(name) {
        this.data.subTabsLabelName = name;
        await click(this.subTabsLabel)
    }

}

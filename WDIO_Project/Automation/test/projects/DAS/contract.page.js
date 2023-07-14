const commonMethods = require('./common.methods');
const { setText, click, selectFromDropdown } = require('./actions');
const utilities = require("./utilities");
const Common = require('./common');
const path = require('path');
class Contract extends Common{
    get nameInput() {
        return $(`//input[@name='name']`)
    }

    get effectiveDateInput() {
        return $(`//input[@name='effectiveDate']`)
    }

    get firstProcessingDateInput() {
        return $(`//input[@name='firstProcessingDate']`)
    }

    get policyNumInput() {
        return $(`//input[@name='policyNum']`)
    }

    get saveBtn() {
        return $(`//button[text()=' Save ']`)
    }

    get getContract() {
        return $(`//div[@class='ag-cell-value bh-text-link']//span[1]`)
    }

    async addContract({ accountName, effectiveDate, firstProcessingDate, carrier, productGroup, enrollmentKey }){
        await commonMethods.waitForBrowser(6000)
        this.data.subTabsName = "Add Contract";
        await click(this.subTabsBtn)

        const name = accountName == 'default' ? utilities.contractName : accountName;
        const eDate = effectiveDate == 'default' ? utilities.dt : effectiveDate;
        const fpDate = firstProcessingDate == 'default' ? utilities.dt : effectiveDate;
        console.log("*********************************************************comntract page*");
        console.log(name)
        console.log("**********************************************************");
        await setText(this.nameInput, name)
        await setText(this.effectiveDateInput, eDate)
        await setText(this.firstProcessingDateInput, fpDate)
        await setText(this.policyNumInput, utilities.generate(10))
        //await setText(this.tminuscreationDateInput, tminuscreationDate)

        this.data.dropDownMenuValue = carrier;
        this.data.dropHeader = "Carrier";
        await click(this.openDropDown)
        await commonMethods.waitForBrowser(9000)
        await click(this.selectDropDownInput)

        await commonMethods.waitForBrowser(1000)

        this.data.dropDownMenuValue = productGroup;
        this.data.dropHeader = "Product Group";
        await click(this.openDropDown)
        await commonMethods.waitForBrowser(15000)
        await click(this.selectDropDownInput)

        this.data.dropDownMenuValue = enrollmentKey;
        this.data.dropHeader = "Enrollment Key";
        await click(this.openDropDown)
        await commonMethods.waitForBrowser(7000)
        await click(this.selectDropDownInput)
        // await commonMethods.waitForBrowser(10000)
        await click(this.saveBtn);
        await this.alertMessage('Add Contract')
        await commonMethods.waitForBrowser(2000)
        await commonMethods.waitForDisplayed(this.getContract, 5000)
        await click(this.getContract)
    }

    /* click on latest date in contract page*/

    get existingContractID(){
        return $(`//div[contains(@class, "ag-cell-value bh-text-link")]//following-sibling::span`);
    }

    updateLabels = {
        name: "",
        dropHeader: "",
        dropDownMenuValue: ""
    }

    get EditBtn() {
        return $(`(//div[text()="${this.updateLabels.name}"]/following::div/a[text()=" Edit "])[1]`)
    }
    get openManualDropDown() {
        return $(`//label[text()="${this.updateLabels.dropHeader}"]/following-sibling::ng-select[1]`);
    }
    get selectManualDropDownInput() {
        return $(`//label[text()="${this.updateLabels.dropHeader}"]/following-sibling::ng-select[1]/ng-dropdown-panel//following::span[contains(text(),'${this.updateLabels.dropDownMenuValue}')]`)
        // return $(`//label[text()="${this.updateLabels.dropHeader}"]/following-sibling::ng-select[1]//following::span[contains(text(),'${this.updateLabels.dropDownMenuValue}')]`)
    }

    //claim processing
    async updateCliamProcessing({
        claimProcessingMethod,
        ClaimProcessingType,
        bankName

    }){
        claimProcessingMethod = claimProcessingMethod == 'default' ? 'Electronic' : claimProcessingMethod;
        ClaimProcessingType = ClaimProcessingType == 'default' ? 'Payroll Based' : ClaimProcessingType;
        bankName = bankName == 'default' ? utilities.bankDetails.accountName : bankName

        this.updateLabels.name = "CLAIM PROCESSING";
        await click(this.EditBtn);
        await commonMethods.waitForBrowser(1000);
        this.updateLabels.dropHeader = "Claim Processing Method";
        this.updateLabels.dropDownMenuValue = claimProcessingMethod; //"Electronic";
        await click(this.openManualDropDown);
        await click(this.selectManualDropDownInput);
        await commonMethods.waitForBrowser(1000);

        if (claimProcessingMethod === 'Electronic') {
            this.updateLabels.dropHeader = "Claim Processing Type";
            this.updateLabels.dropDownMenuValue = ClaimProcessingType;
            await click(this.openManualDropDown);
            await click(this.selectManualDropDownInput);
            await commonMethods.waitForBrowser(1000);

            // Bank Name
            this.updateLabels.dropHeader = "Bank";
            this.updateLabels.dropDownMenuValue = bankName;
            await click(this.openManualDropDown);
            console.log( this.updateLabels.dropDownMenuValue )
            await commonMethods.waitForBrowser(9000);
            await click(this.selectManualDropDownInput);
            await commonMethods.waitForBrowser(1000);
        }

        await click(this.saveBtn)
        await this.alertMessage(`CLAIM PROCESSING - ${claimProcessingMethod}`)
        await commonMethods.waitForBrowser(5000);
    }

    //Premium PROCESSING
    async updatePremiumProcessing({
        premiumProcessingMethod,
        premiumProcessingType,
        bankName

    }) {
        premiumProcessingMethod = premiumProcessingMethod == 'default' ? 'Electronic' : premiumProcessingMethod;
        premiumProcessingType = premiumProcessingType == 'default' ? 'Monthly Enrollment Based' : premiumProcessingType;
        bankName = bankName == 'default' ? utilities.bankDetails.accountName : bankName

        this.updateLabels.name = "PREMIUM PROCESSING";
        await click(this.EditBtn);
        await commonMethods.waitForBrowser(1000);
        this.updateLabels.dropHeader = "Premium Processing Method";
        this.updateLabels.dropDownMenuValue = premiumProcessingMethod; //"Electronic";
        await click(this.openManualDropDown);
        await click(this.selectManualDropDownInput);
        await commonMethods.waitForBrowser(1000);

        if (premiumProcessingMethod === 'Electronic') {
            this.updateLabels.dropHeader = "Premium Processing Type";
            this.updateLabels.dropDownMenuValue = premiumProcessingType;
            await click(this.openManualDropDown);
            await click(this.selectManualDropDownInput);
            await commonMethods.waitForBrowser(1000);

            // Bank Name
            this.updateLabels.dropHeader = "Bank";
            this.updateLabels.dropDownMenuValue = bankName;
            await click(this.openManualDropDown);
            await click(this.selectManualDropDownInput);
            await commonMethods.waitForBrowser(1000);
        }

        await click(this.saveBtn)
        await this.alertMessage(`CLAIM PROCESSING - ${premiumProcessingMethod}`)
        await commonMethods.waitForBrowser(5000);
    }

    //FEE PROCESSING
    async updateFeeProcessing({
        feeProcessingMethod,
        feeProcessingType,
        bankName

    }) {
        feeProcessingMethod = feeProcessingMethod == 'default' ? 'Electronic' : feeProcessingMethod;
        feeProcessingType = feeProcessingType == 'default' ? 'Monthly Enrollment Based' : feeProcessingType;
        bankName = bankName == 'default' ? utilities.bankDetails.accountName : bankName

        this.updateLabels.name = "FEE PROCESSING";
        await click(this.EditBtn);
        await commonMethods.waitForBrowser(1000);
        this.updateLabels.dropHeader = "Fee Processing Method";
        this.updateLabels.dropDownMenuValue = feeProcessingMethod; //"Electronic";
        await click(this.openManualDropDown);
        await click(this.selectManualDropDownInput);
        await commonMethods.waitForBrowser(1000);

        if (feeProcessingMethod === 'Electronic') {
            this.updateLabels.dropHeader = "Fee Processing Type";
            this.updateLabels.dropDownMenuValue = feeProcessingType;
            await click(this.openManualDropDown);
            await click(this.selectManualDropDownInput);
            await commonMethods.waitForBrowser(1000);

            // Bank Name
            this.updateLabels.dropHeader = "Bank";
            this.updateLabels.dropDownMenuValue = bankName;
            await click(this.openManualDropDown);
            await click(this.selectManualDropDownInput);
            await commonMethods.waitForBrowser(1000);
        }

        await click(this.saveBtn)
        await this.alertMessage(`FEE PROCESSING - ${feeProcessingMethod}`)
        await commonMethods.waitForBrowser(5000);
    }

    // Enrollment file 
    get fileUploadInput() {
        return $(`//input[@type='file']`)
    }

    get effectiveDateInput() {
        return $(`//input[@name='effectiveDate']`)
    }
    get uploadSaveBtn() {
        return $(`//button[text()=' Upload ']`)
    }
    get uploadConfirmBtn() {
        return $(`//div[@class='right-side-action-buttons bg-buttons']//button[1]`)
    }
    get uploadModelCloseBtn() {
        return $(`//button[@class='close']`)
        //return $(`(//button[@class='close'])[2]`)
    }

    get enrollmentTabBtn() {
        return $(`//div//a[@href]//div//span[text()="ENROLLMENT"]`)
    }
    get activeContractBtn() {
        return $(`//span[text()='Activate Contract']`)
    }

    get activeContractOkBtn() {
        return $(`(//button[text()=' OK '])[3]`)
    }
    async uploadEnrollementFile({ fileLocation }) {
        // this.subTabs('ENROLLMENT')
        await click(this.enrollmentTabBtn)
        await commonMethods.waitForBrowser(1000)
        this.data.tableBtnName = 'Upload Enrollment File';
        await click(this.TableBtn);
        await commonMethods.waitForBrowser(1000)
        const filePath = path.join(__dirname, fileLocation);
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.fileUploadInput.setValue(remoteFilePath);
        await setText(this.effectiveDateInput, utilities.dt)
        await click(this.uploadSaveBtn);
        await commonMethods.waitForBrowser(8000)
        // await click(this.uploadConfirmBtn);
        // await commonMethods.waitForBrowser(8000)
        await click(this.uploadModelCloseBtn);
        await commonMethods.waitForBrowser(1000)
        
    }

    //add contact
    get existEmailBtn() {
        return $(`//div[text()=' Select ']`)
    }
    get contactTabBtn(){
       return $('//div//a[@href]//div//span[text()="CONTACTS"]');
    }
    
    async generateContact({ email, FirstName, LastName, MobileNumber, workNumber, contactType, effectiveDate }) {
            console.log("*****************************generate contact*************************")
        await commonMethods.waitForBrowser(8000)   
        await click(this.contactTabBtn)
        this.data.tableBtnName = 'Add Contact';
        await click(this.TableBtn);
        await commonMethods.waitForBrowser(2000)
        utilities.contact.generateEmail = email == 'default' ? utilities.contact.generateEmail : email;
        FirstName = FirstName == 'default' ? utilities.contact.name.split(' ')[0] : FirstName;
        LastName = LastName == 'default' ? utilities.contact.name.split(' ')[1] : LastName;
        utilities.contact.mobileNumber = MobileNumber == 'default' ? utilities.contact.mobileNumber : MobileNumber;
        utilities.contact.workNumber = workNumber == 'default' ? utilities.contact.workNumber : workNumber;
        utilities.contact.contactType = contactType == 'default' ? utilities.contact.contactType : contactType;
        utilities.contact.toDayDate = effectiveDate == 'default' ? utilities.contact.toDayDate : effectiveDate;
        utilities.contact.name = `${FirstName} ${LastName}`

        this.data.inputLabelName = 'Email';
        await setText(this.inputField, utilities.contact.generateEmail);
        this.data.inputLabelName = 'First Name';
        await click(this.inputField)
        await commonMethods.waitForBrowser(2000)
        let isDefault = true;
        try {
            await click(this.existEmailBtn)
            isDefault = false;
            await commonMethods.waitForBrowser(2000)
        }
        catch (err) {
            isDefault = true;
        }

        if (isDefault) {
            // this.data.inputLabelName = 'First Name';
            await commonMethods.waitForBrowser(2000)
            await setText(this.inputField, FirstName)
            this.data.inputLabelName = 'Last Name';
            await setText(this.inputField, LastName)
            this.data.inputLabelName = 'Mobile Number';
            await setText(this.inputField, utilities.contact.mobileNumber)
            this.data.inputLabelName = 'Work Number';
            await setText(this.inputField, utilities.contact.workNumber)
        }
        this.data.dropDownMenuValue = utilities.contact.contactType;
        this.data.dropHeader = "Contact Type";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        this.data.inputLabelName = 'Effective Date';
        await setText(this.inputField, utilities.contact.toDayDate);
        await commonMethods.waitForBrowser(2000)
        await click(this.saveBtnInModel)
        await commonMethods.waitForBrowser(2000)
    }

    async activeContract(){
        console.log("*************************active contract*********************")
        await click(this.activeContractBtn)
        await commonMethods.waitForBrowser(2000)
        await click(this.activeContractOkBtn)
        await this.alertMessage('Active Contract')
        await commonMethods.waitForBrowser(2000)
    }


}
module.exports = new Contract();
const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');
const path = require('path');

class Contract extends Common {
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

    get tminuscreationDateInput() {
        return $(`//input[@name='tminuscreationDate']`)
    }

    get openAddContractModel() {
        return $(`//span[text()='Add Contract']`)

    }

    get getContract() {
        return $(`//div[@class='ag-cell-value bh-text-link']//span[1]`)
    }

    get saveBtn() {
        return $(`//button[text()=' Save ']`)
    }

    get existEmailBtn() {
        return $(`//div[text()=' Select ']`)
    }

    get productsInput() {
        return $(`//div[@role="option"]//span[contains(@class,"ng-option-label")][1]`)
    }

    get invoceTableView() {
        return $(`//bh-invoice-grid`)
    }

    get getInvoiceBtn() {
        return $(`//div[@class='ag-cell-value bh-text-link']`)
    }


    async getInvoice({
        invoice
    }) {
        await this.invoceTableView.scrollIntoView();
        await commonMethods.waitForBrowser(5000)
        await click(this.getInvoiceBtn)
        await commonMethods.waitForBrowser(5000)
    }


    async addContract({ accountName, effectiveDate, firstProcessingDate, tminuscreationDate, carrier, productGroup, enrollmentKey }) {


        await click(this.openAddContractModel)
        const name = accountName == 'default' ? utilities.contractName : accountName;
        const eDate = effectiveDate == 'default' ? utilities.dt : effectiveDate;
        const fpDate = firstProcessingDate == 'default' ? utilities.dt : effectiveDate;
        console.log("**********************************************************");
        console.log(name)
        console.log("**********************************************************");
        if (utilities.autoNachaDay !== 'default') {
            utilities.NACHA.description = `${utilities.accountNameValue} - ${utilities.contractName}`;
            console.log("**********************************************************");
            console.log(utilities.NACHA.description)
            console.log("**********************************************************");
        }
        await setText(this.nameInput, name)
        await setText(this.effectiveDateInput, eDate)
        await setText(this.firstProcessingDateInput, fpDate)
        await setText(this.policyNumInput, utilities.generate(10))
        await setText(this.tminuscreationDateInput, tminuscreationDate)

        this.data.dropDownMenuValue = carrier;
        this.data.dropHeader = "Carrier";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)

        await commonMethods.waitForBrowser(1000)

        this.data.dropDownMenuValue = productGroup;
        this.data.dropHeader = "Product Group";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)

        this.data.dropDownMenuValue = enrollmentKey;
        this.data.dropHeader = "Enrollment Key";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)
        // await commonMethods.waitForBrowser(10000)
        await click(this.saveBtn);
        await this.alertMessage('Add Contract')
        await commonMethods.waitForBrowser(2000)
        await commonMethods.waitForDisplayed(this.getContract, 5000)
        await click(this.getContract)

    }

    async generateContact({
        email, FirstName, LastName, MobileNumber, workNumber, contactType, effectiveDate
    }) {
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

    async addCommission({ commission }) {
        this.subTabs('COMMISSION')
        await commonMethods.waitForBrowser(2000)
        this.data.tableBtnName = 'Add Commission';
        await click(this.TableBtn);
        await commonMethods.waitForBrowser(2000);
        this.data.inputLabelName = 'Effective Date';
        await setText(this.inputField, utilities.dt);
        this.data.dropHeader = "Broker Name";
        await click(this.openDropDown)
        await commonMethods.waitForBrowser(1000);
        await click(this.productsInput);
        this.data.inputLabelName = 'Commission value';
        await setText(this.inputField, commission)
        this.data.dropHeader = "Product";
        await click(this.openDropDown)
        await commonMethods.waitForBrowser(1000);
        await click(this.productsInput)
        await commonMethods.waitForBrowser(1000);
        await click(this.saveBtnInModel)
        await commonMethods.waitForBrowser(2000)

    }

    // file 
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
        return $(`(//button[@class='close'])[2]`)
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
        await click(this.uploadConfirmBtn);
        await commonMethods.waitForBrowser(8000)
        await click(this.uploadModelCloseBtn);
        await commonMethods.waitForBrowser(1000)
        await click(this.activeContractBtn)
        await commonMethods.waitForBrowser(2000)
        await click(this.activeContractOkBtn)
        await this.alertMessage('Active Contract')
        await commonMethods.waitForBrowser(2000)
    }


    // Generate Invoice

    get invoiceTabBtn() {
        return $(`(//span[text()="INVOICE"])[2]`)
        // return $(`//img[@src='./assets/img/product-invoice-active.svg']/following-sibling::span[1]`)
    }
    get invoiceOkBtn() {
        return $(`//button[text()=" Ok "]`)
    }

    get invoiceRefreshBtn() {
        return $(`//span[@title="Refresh"]//i[contains(@class,'bi bi-arrow-clockwise')]`)
    }


    async generateInvoice({ value = "" }) {

        await click(this.invoiceTabBtn);
        console.log("*******************:invoiceTabBtn")
        await commonMethods.waitForBrowser(1000)
        this.data.tableBtnName = 'Generate Invoice';
        this.data.inputLabelName = 'Invoice Date';
        await click(this.TableBtn);
        console.log("*******************:Generate Invoice")
        console.log("*******************:Generate Invoice", utilities.payrollFrequency)
        if (utilities.payrollFrequency.toLocaleLowerCase() === 'weekly') {
            let days = 0;
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${7 + days})`)
            await commonMethods.waitForBrowser(1000)
            await click(this.TableBtn);

            days += 7
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${7 + days})`)
            await commonMethods.waitForBrowser(1000)
            await click(this.TableBtn);
            days += 7
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${7 + days})`)
            await commonMethods.waitForBrowser(1000)
            await click(this.TableBtn);
            days += 7
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${7 + days})`)
            await commonMethods.waitForBrowser(1000)


        }
        if (utilities.payrollFrequency.toLocaleLowerCase() === 'monthly') {
            let days = 0
            this.data.inputLabelName = 'Effective Date';
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${30 + days})`)
            await commonMethods.waitForBrowser(1000)

        }
        if (utilities.payrollFrequency.toLocaleLowerCase() === 'bi-weekly') {
            let days = 0;
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${14 + days})`)
            await commonMethods.waitForBrowser(1000)
            await click(this.TableBtn);
            days += 14
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${14 + days})`)
            await commonMethods.waitForBrowser(1000)

        }
        if (utilities.payrollFrequency.toLocaleLowerCase() === 'semi-monthly') {
            let days = 0;
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${15 + days})`)
            await commonMethods.waitForBrowser(1000)
            await click(this.TableBtn);
            days += 15
            await setText(this.inputField, utilities.getDate(days));
            await click(this.invoiceOkBtn)
            await this.alertMessage(`Generate Invoice(${15 + days})`)
            await commonMethods.waitForBrowser(1000)

        }
        await click(this.invoiceRefreshBtn)
        await this.tableViewBtn.scrollIntoView();
        await commonMethods.waitForBrowser(10000);
    }


    // contract approved 

    get checkBoxInput() {
        // return $(`//span[contains(text(),'Description')]/preceding::input[@ref="eInput"]`)
        return $(`//span[contains(text(),'Description')]/::div[contains(@class,'ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper')]`)
    }

    get markInput() {
        return $(`//i[@class='bi bi-file-check-fill']`)
    }


    get invoiceApproveConfirnBtn() {
        return $(`//button[text()=" Yes "]`)
    }
    get tableViewBtn() {
        return $(`//div[@class="bh-grid"]`)
    }

    async approveAndMarkAsPaid({ value }) {
        await this.tableViewBtn.scrollIntoView();
        await commonMethods.waitForBrowser(2000);
        await click(this.checkBoxInput);
        await commonMethods.waitForBrowser(1000);
        this.data.tableBtnName = 'Approve Invoice';
        await click(this.TableBtn);
        await commonMethods.waitForBrowser(1000);
        // confirm approve
        await click(this.invoiceApproveConfirnBtn)
        await this.alertMessage(`Invoice Approve`)
        await commonMethods.waitForBrowser(10000);
        await click(this.checkBoxInput);
        await commonMethods.waitForBrowser(1000);
        await click(this.markInput);
        await commonMethods.waitForBrowser(1000);
        await click(this.invoiceApproveConfirnBtn)
        await this.alertMessage(`Invoice Paid`)
        await commonMethods.waitForBrowser(10000);
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

    // get saveBtn() {
    //     return $(`//button[contains(text(),"Save")]`)
    // }



    //CLAIM PROCESSING
    async updateCliamProcessing({
        claimProcessingMethod,
        ClaimProcessingType,
        bankName

    }) {
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
            this.updateLabels.dropHeader = "Bank Name";
            this.updateLabels.dropDownMenuValue = bankName;
            await click(this.openManualDropDown);
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
            this.updateLabels.dropHeader = "Bank Name";
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
            this.updateLabels.dropHeader = "Bank Name";
            this.updateLabels.dropDownMenuValue = bankName;
            await click(this.openManualDropDown);
            await click(this.selectManualDropDownInput);
            await commonMethods.waitForBrowser(1000);
        }

        await click(this.saveBtn)
        await this.alertMessage(`FEE PROCESSING - ${feeProcessingMethod}`)
        await commonMethods.waitForBrowser(5000);



    }




}
module.exports = new Contract();
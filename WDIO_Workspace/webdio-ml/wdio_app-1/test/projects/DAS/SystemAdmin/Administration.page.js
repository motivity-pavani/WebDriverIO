const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');
const path = require('path');


class Administration extends Common {

    get fileUploadInput() {
        return $(`//input[@type='file']`)
    }
    get searchNameInput() {
        return $('//input[@aria-label="Name Filter Input"]')
    }

    selectCarrier(name) {
        return $(`//span[@title="${name}"]`)
    }
    get Productgrouping() {
        return $(`//i[@title='Add Product Group']`)
    }
    get Product() {
        return $(`//i[@title='Add Product']`)
    }
    get batchReports() {
        return $(`//div[text()=' Batch Reports ']`)
    }

    async addCarrier({
        businessName,
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        zip,
        effectiveDate,
        entityType,
        logo
    }) {
        utilities.carrier = {
            businessName: businessName == 'default' ? utilities.carrier.businessName : businessName,
            addressLine1: addressLine1 == 'default' ? utilities.carrier.addressLine1 : addressLine1,
            addressLine2: addressLine2 == 'default' ? utilities.carrier.addressLine2 : addressLine2,
            city: city == 'default' ? utilities.carrier.city : city,
            state: state == 'default' ? utilities.carrier.state : state,
            country: country == 'default' ? utilities.carrier.country : country,
            zip: zip == 'default' ? utilities.carrier.zip : zip,
            effectiveDate: effectiveDate == 'default' ? utilities.carrier.effectiveDate : effectiveDate,
            entityType: entityType == 'default' ? utilities.carrier.entityType : entityType,
            logo: logo == 'default' ? utilities.carrier.logo : logo,
        }
        this.data.tableBtnName = 'Add Carrier';
        await click(this.TableBtn)
        await commonMethods.waitForBrowser(1000)

        console.log("******************************************************")
        console.log("businessName:", utilities.carrier.businessName)
        console.log("******************************************************")
        this.data.inputLabelName = "Business Name";
        await setText(this.inputField, utilities.carrier.businessName);

        this.data.inputLabelName = "Address Line 1";
        await setText(this.inputField, utilities.carrier.addressLine1);

        this.data.inputLabelName = "Address Line 2";
        await setText(this.inputField, utilities.carrier.addressLine2);

        this.data.inputLabelName = "City";
        await setText(this.inputField, utilities.carrier.city);

        this.data.inputLabelName = "State";
        await setText(this.inputField, utilities.carrier.state);

        this.data.inputLabelName = "Country";
        await setText(this.inputField, utilities.carrier.country);

        this.data.inputLabelName = "Zip";
        await setText(this.inputField, utilities.carrier.zip);

        this.data.inputLabelName = "Effective Date";
        await setText(this.inputField, utilities.carrier.effectiveDate);

        this.data.dropHeader = 'Entity Type';
        await click(this.openDropDown)
        this.data.dropDownMenuValue = utilities.carrier.entityType;
        await click(this.selectDropDownInput)

        // file upload
        const filePath = path.join(__dirname, utilities.carrier.logo);
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.fileUploadInput.setValue(remoteFilePath);

        // await commonMethods.waitForBrowser(5000)
        await click(this.saveBtnInModel)
        await this.alertMessage('Add Carrier')
        await commonMethods.waitForBrowser(3000)


        //  await commonMethods.waitForBrowser(1000)


    }

    async searchCarriers({ carrierName }) {
        carrierName = carrierName == 'default' ? utilities.carrier.businessName : carrierName;
        await commonMethods.waitForBrowser(1000);
        await setText(this.searchNameInput, carrierName)
        await commonMethods.waitForBrowser(1000);
        await click(this.selectCarrier(carrierName))
    }

    async addProductGroup({
        name,
        description,
        effectiveDate,
        invoicetemplate
    }) {
        utilities.productgroup = {
            name: name == 'default' ? utilities.productgroup.name : name,
            description: description == 'default' ? utilities.productgroup.description : description,
            effectiveDate: effectiveDate == 'default' ? utilities.productgroup.effectiveDate : effectiveDate,
            invoicetemplate: invoicetemplate == 'default' ? utilities.productgroup.invoicetemplate : invoicetemplate,
        }

        // console.log(utilities.productgroup)
        this.data.tableBtnName = 'Add Product Group';
        await click(this.TableBtn)
        await commonMethods.waitForBrowser(1000)

        this.data.inputLabelName = "Name";
        await setText(this.inputField, utilities.productgroup.name);

        this.data.inputLabelName = "Description";
        await setText(this.inputField, utilities.productgroup.description);

        this.data.inputLabelName = "Effective Date";
        await setText(this.inputField, utilities.productgroup.effectiveDate);

        this.data.dropHeader = 'Invoice Template';
        await click(this.openDropDown)
        this.data.dropDownMenuValue = utilities.productgroup.invoicetemplate;
        await click(this.selectDropDownInput)
        await click(this.saveBtnInModel)
        await this.alertMessage('Add Product Group')
        await commonMethods.waitForBrowser(3000)
    }
    async addProduct({
        Name,
        Description,
        ProductGroup,
        EffectiveDate,
        EmployeeFeeType,
        EmployeeFeeValue,
        EmployerFeeType,
        EmployerFeeValue,
        CommissionType,
        CommissionValue,
        UnitPrice

    }) {
        // utilities.productgroup.name
        utilities.product = {
            Name: Name == 'default' ? utilities.product.Name : Name,
            Description: Description == 'default' ? utilities.product.Description : Description,
            ProductGroup: ProductGroup == 'default' ? utilities.productgroup.name : ProductGroup,
            // ProductGroup: ProductGroup == 'default' ? utilities.product.ProductGroup : ProductGroup,
            EffectiveDate: EffectiveDate == 'default' ? utilities.product.EffectiveDate : EffectiveDate,
            EmployeeFeeType: EmployeeFeeType == 'default' ? utilities.product.EmployeeFeeType : EmployeeFeeType,
            EmployeeFeeValue: EmployeeFeeValue == 'default' ? utilities.product.EmployeeFeeValue : EmployeeFeeValue,
            EmployerFeeType: EmployerFeeType == 'default' ? utilities.product.EmployerFeeType : EmployerFeeType,
            EmployerFeeValue: EmployerFeeValue == 'default' ? utilities.product.EmployerFeeValue : EmployerFeeValue,
            CommissionType: CommissionType == 'default' ? utilities.product.CommissionType : CommissionType,
            CommissionValue: CommissionValue == 'default' ? utilities.product.CommissionValue : CommissionValue,
            UnitPrice: UnitPrice == 'default' ? utilities.product.UnitPrice : UnitPrice
        }
        //console.log(utilities.product)

        this.data.tableBtnName = 'Add Product';
        await click(this.TableBtn)
        await commonMethods.waitForBrowser(1000)

        this.data.inputLabelName = "Name";
        await setText(this.inputField, utilities.product.Name);

        this.data.inputLabelName = "Description";
        await setText(this.inputField, utilities.product.Description);

        this.data.dropDownMenuValue = utilities.product.ProductGroup;
        this.data.dropHeader = "Product Group";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)

        this.data.inputLabelName = "Effective Date";
        await setText(this.inputField, utilities.product.EffectiveDate);
        this.data.dropDownMenuValue = utilities.product.EmployeeFeeType;
        this.data.dropHeader = "Employee Fee Type";
        await click(this.openDropDown)
        await click(this.selectDropDownInput)

        this.data.inputLabelName = "Employee Fee Value";
        await setText(this.inputField, utilities.product.EmployeeFeeValue);

        this.data.dropHeader = "Employer Fee Type";
        await click(this.openDropDown)
        this.data.dropDownMenuValue = utilities.product.EmployerFeeType;
        await click(this.selectDropDownInput)

        this.data.inputLabelName = "Employer Fee Value";
        await setText(this.inputField, utilities.product.EmployerFeeValue);

        this.data.dropHeader = "Commission Type";
        await click(this.openDropDown)
        this.data.dropDownMenuValue = utilities.product.CommissionType;
        await click(this.selectDropDownInput)

        this.data.inputLabelName = "Commission Value";
        await setText(this.inputField, utilities.product.CommissionValue);

        this.data.inputLabelName = "Unit Price";
        await setText(this.inputField, utilities.product.UnitPrice);
        await click(this.saveBtnInModel)
        await this.alertMessage('Add Product')
        await commonMethods.waitForBrowser(3000)


    }
    //Batch Reports









}
module.exports = new Administration();
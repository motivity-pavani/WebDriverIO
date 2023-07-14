const commonMethods = require('../common.methods');
const { setText, click, selectFromDropdown } = require('../actions');
const utilities = require("../utilities");
const Common = require('./common');
const path = require('path');
//const { cli } = require('winston/lib/winston/config');

class AdministrationBroker extends Common {

    async addTPA({
        BusinessName,
        AddressLine1,
        AddressLine2,
        City,
        State,
        Country,
        Zip,
        Email,
        PhoneNumber,
        EffectiveDate,
        EntityType,
        TPAFeeSchedule,
        FeeProcessingType,
        CommissionType,
        CommissionValue,
        LogoFile
    }) {
        utilities.carrier = {
            BusinessName: BusinessName == 'default' ? utilities.TPA.BusinessName : BusinessName,
            AddressLine1: AddressLine1 == 'default' ? utilities.TPA.AddressLine1 : AddressLine1,
            AddressLine2: AddressLine2 == 'default' ? utilities.TPA.AddressLine2 : addressLine2,
            City: City == 'default' ? utilities.TPA.City : City,
            State: State == 'default' ? utilities.TPA.State : State,
            Country: Country == 'default' ? utilities.TPA.Country : Country,
            Zip: Zip == 'default' ? utilities.TPA.Zip : Zip,
            EffectiveDate: EffectiveDate == 'default' ? utilities.TPA.EffectiveDate : EffectiveDate,
            EntityType: EntityType == 'default' ? utilities.TPA.EntityType : EntityType,
            LogoFile: LogoFile == 'default' ? utilities.TPA.LogoFile : LogoFile,
            CommissionType: CommissionType == 'default' ? utilities.TPA.CommissionType : CommissionType,
            CommissionValue: CommissionValue == 'default' ? utilities.TPA.CommissionValue : CommissionValue,
            TPAFeeSchedule: TPAFeeSchedule == 'default' ? utilities.TPA.TPAFeeSchedule : TPAFeeSchedule,
            FeeProcessingType: FeeProcessingType == 'default' ? utilities.TPA.FeeProcessingType : FeeProcessingType,
            Email: Email == 'default' ? utilities.TPA.Email : Email,
            PhoneNumber: PhoneNumber == 'default' ? utilities.TPA.PhoneNumber : PhoneNumber,
        }
        //console.log(utilities.TPA)

        this.data.tableBtnName = 'Add TPA';
        await click(this.TableBtn)
        await commonMethods.waitForBrowser(1000)

        this.data.inputLabelName = "Business Name";
        await setText(this.inputField, utilities.TPA.BusinessName);

        this.data.inputLabelName = "Address Line 1";
        await setText(this.inputField, utilities.TPA.AddressLine1);

        this.data.inputLabelName = "Address Line 2";
        await setText(this.inputField, utilities.TPA.AddressLine2);

        this.data.inputLabelName = "City";
        await setText(this.inputField, utilities.TPA.City);

        this.data.inputLabelName = "State";
        await setText(this.inputField, utilities.TPA.State);

        this.data.inputLabelName = "Country";
        await setText(this.inputField, utilities.TPA.Country);

        this.data.inputLabelName = "Zip";
        await setText(this.inputField, utilities.TPA.Zip);

        this.data.inputLabelName = "Email";
        await setText(this.inputField, utilities.TPA.Email);

        this.data.inputLabelName = "Phone Number";
        await setText(this.inputField, utilities.TPA.PhoneNumber);

        this.data.inputLabelName = "Effective Date";
        await setText(this.inputField, utilities.TPA.EffectiveDate);

        this.data.dropHeader = "Commission Type";
        await click(this.openDropDown)
        this.data.dropDownMenuValue = utilities.TPA.CommissionType;
        await click(this.selectDropDownInput)

        this.data.inputLabelName = "Commission Value";
        await setText(this.inputField, utilities.TPA.CommissionValue);

        this.data.dropHeader = 'Entity Type';
        await click(this.openDropDown)
        this.data.dropDownMenuValue = utilities.TPA.EntityType;
        await click(this.selectDropDownInput)

        this.data.inputLabelName = "TPA Fee Schedule";
        await setText(this.inputField, utilities.TPA.TPAFeeSchedule);

        this.data.dropHeader = "Fee Processing Type";
        await click(this.openDropDown)
        this.data.dropDownMenuValue = utilities.TPA.FeeProcessingType;
        await click(this.selectDropDownInput)

        // file upload
        const filePath = path.join(__dirname, utilities.TPA.LogoFile);
        const remoteFilePath = await browser.uploadFile(filePath);
        await this.fileUploadInput.setValue(remoteFilePath);

        await click(this.saveBtnInModel)
        await this.alertMessage('Add TPA')
        await commonMethods.waitForBrowser(3000)

    }

}
module.exports = new AdministrationBroker();
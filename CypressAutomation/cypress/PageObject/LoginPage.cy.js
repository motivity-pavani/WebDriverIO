class LoginPage{
    visit() 
    {
     cy.visit('https://www.eazework.com/')
     cy.get('div#headerHome a:nth-child(2)').click()
    }
    fillurl(value)
    {
        const field= cy.get('[id=txtCorpURL]') 
        field.clear()
        field.type(value)
        return this
     }
     
}
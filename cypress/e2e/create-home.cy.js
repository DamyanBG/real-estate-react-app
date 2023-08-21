const { faker } = require('@faker-js/faker');

describe('Register seller, add home, check is the home there with just user', () => {
    const sellerFirstName = faker.person.firstName()
    const sellerLastName = faker.person.lastName()
    const sellerEmail = faker.internet.email(sellerFirstName, sellerLastName)
    const sellerPasword = faker.internet.password(20)
    const sellerPhone = faker.phone.number()

    const homeTitle = faker.word.words(3)
    const homeCity = faker.location.city()
    const homeNeighborhood = faker.word.words(2)
    const homeAddress = faker.location.streetAddress()
    const homeLatitude = faker.location.latitude()
    const homeLongitude = faker.location.longitude()
    const homePrice = faker.commerce.price()
    const homeSize = faker.number.int({ min: 50, max: 700 })
    const homeYear = faker.number.int({ min: 1950, max: 2023 })
    const homeDescription = faker.word.words(10)

    it('Register and login seller, then create home', () => {
        cy.visit('/')

        cy.contains('Sign up').click()

        cy.url().should('include', '/signup')
        

        cy.get('[data-testid=first_name').type(sellerFirstName)
        cy.get('[data-testid=first_name').should('have.value', sellerFirstName)

        cy.get('[data-testid=last_name').type(sellerLastName)
        cy.get('[data-testid=last_name').should('have.value', sellerLastName)

        cy.get('[data-testid=email').type(sellerEmail)
        cy.get('[data-testid=email').should('have.value', sellerEmail)

        cy.get('[data-testid=phone_number').type(sellerPhone)
        cy.get('[data-testid=phone_number').should('have.value', sellerPhone)

        cy.get('[data-testid=password').type(sellerPasword)
        cy.get('[data-testid=password').should('have.value', sellerPasword)

        cy.get('[data-testid=as-seller').should('not.be.checked')
        cy.get('[data-testid=as-seller').check().should('be.checked')

        cy.get('[data-testid=register-form').submit()

        cy.wait(5000)

        cy.contains('Sign in').click()

        cy.url().should('include', '/signin')

        cy.get('[data-testid=email').type(sellerEmail)

        cy.get('[data-testid=email').should('have.value', sellerEmail)

        cy.get('[data-testid=password').type(sellerPasword)

        cy.get('[data-testid=password').should('have.value', sellerPasword)
        
        cy.get('[data-testid=sign-in-form').submit()

        cy.wait(1000)

        cy.get('[data-testid=sell-li').trigger('mouseover')

        cy.contains('Sell Home')

        cy.get('[data-testid=sell-home-link').click()

        cy.url().should('include', '/create-home')

        cy.get('[data-testid=home-photo').selectFile('test-images/77400-b600.jpg')

        cy.get('[data-testid=title').type(homeTitle)
        cy.get('[data-testid=title').should('have.value', homeTitle)

        cy.get('[data-testid=city').type(homeCity)
        cy.get('[data-testid=city').should('have.value', homeCity)

        cy.get('[data-testid=neighborhood').type(homeNeighborhood)
        cy.get('[data-testid=neighborhood').should('have.value', homeNeighborhood)

        cy.get('[data-testid=address').type(homeAddress)
        cy.get('[data-testid=address').should('have.value', homeAddress)

        cy.get('[data-testid=latitude').type(homeLatitude)
        cy.get('[data-testid=latitude').should('have.value', homeLatitude)

        cy.get('[data-testid=longitude').type(homeLongitude)
        cy.get('[data-testid=longitude').should('have.value', homeLongitude)

        cy.get('[data-testid=price').type(homePrice)
        cy.get('[data-testid=price').should('have.value', homePrice)

        cy.get('[data-testid=size').type(homeSize)
        cy.get('[data-testid=size').should('have.value', homeSize)

        cy.get('[data-testid=year').type(homeYear)
        cy.get('[data-testid=year').should('have.value', homeYear)

        cy.get('[data-testid=description').type(homeDescription)
        cy.get('[data-testid=description').should('have.value', homeDescription)

        cy.get('[data-testid=home-create-form').submit()

        cy.wait(5000)

        cy.url().should('include', '/edit-home')
    })

    it('Register user and go to homes', () => {
        const userFirstName = faker.person.firstName()
        const userLastName = faker.person.lastName()
        const userEmail = faker.internet.email(userFirstName, userLastName)
        const userPasword = faker.internet.password(20)
        const userPhone = faker.phone.number()


        cy.visit('/')

        cy.contains('Sign up').click()

        cy.url().should('include', '/signup')
        

        cy.get('[data-testid=first_name').type(userFirstName)
        cy.get('[data-testid=first_name').should('have.value', userFirstName)

        cy.get('[data-testid=last_name').type(userLastName)
        cy.get('[data-testid=last_name').should('have.value', userLastName)

        cy.get('[data-testid=email').type(userEmail)
        cy.get('[data-testid=email').should('have.value', userEmail)

        cy.get('[data-testid=phone_number').type(userPhone)
        cy.get('[data-testid=phone_number').should('have.value', userPhone)

        cy.get('[data-testid=password').type(userPasword)
        cy.get('[data-testid=password').should('have.value', userPasword)

        cy.get('[data-testid=as-seller').should('not.be.checked')

        cy.get('[data-testid=register-form').submit()

        cy.wait(5000)

        cy.contains('Sign in').click()

        cy.url().should('include', '/signin')

        cy.get('[data-testid=email').type(userEmail)

        cy.get('[data-testid=email').should('have.value', userEmail)

        cy.get('[data-testid=password').type(userPasword)

        cy.get('[data-testid=password').should('have.value', userPasword)
        
        cy.get('[data-testid=sign-in-form').submit()

        cy.wait(1000)

        cy.get('[data-testid=buy-li').trigger('mouseover')

        cy.contains('Homes for sale')

        cy.get('[data-testid=buy-home-link').click()

        cy.url().should('include', '/all-homes')

        cy.contains('Next').as('nextButton')

        const goToNextPage = () => {
            cy.get('@nextButton').invoke('attr', 'aria-disabled').then(disabled => {
                if (disabled === "true") {
                    cy.get('@nextButton').should('have.attr', 'aria-disabled', "true")
                } else {
                    cy.get('@nextButton').click().then(goToNextPage)
                }
            })
        }
        goToNextPage()

        cy.contains(homeTitle).click()

        cy.contains(homeTitle)
        cy.contains(homeCity)
        cy.contains(homeNeighborhood)
        cy.contains(homeAddress)
        cy.contains(homePrice)
        cy.contains(homeYear)
        cy.contains(homeDescription)
        cy.contains(`${sellerFirstName} ${sellerLastName}`)
    })
})
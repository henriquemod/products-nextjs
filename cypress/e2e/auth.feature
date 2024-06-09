Feature: Auth Page
    Background:
        Given I access auth page

    @focus
    Scenario: I should see auth modal
        Then I should see 'Product Manager'
        And I should see 'Login'

    @focus
    Scenario: I should see error when try to login with empty values
        When I click on text 'Entrar'

        Then I should see 'Username is required.'
        And I should see 'Password is required.'

    @focus
    Scenario: I should login on success
        When I type 'admin' in the 'username' field
        And I type 'admin' in the 'password' field
        And I click on text 'Entrar'

        Then I should see 'SignOut'



    @focus
    Scenario: I should see error on wrong credentials
        When I type 'invalid_user' in the 'username' field
        And I type 'invalid_password' in the 'password' field
        And I click on text 'Entrar'

        Then I should see 'Invalid username or password'
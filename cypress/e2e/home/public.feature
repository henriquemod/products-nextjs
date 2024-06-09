Feature: Home Page - Unauthenticated User
    Background:
        Given I have a product with name 'product one' and price 50
        And I access home page

    @focus
    Scenario: I should see product
        Then I should see 'product one'
        And I should see '$50.00'

    @focus
    Scenario: I should see product info
        When I click on action from product 'product one'
        And I click on text 'Info'

        Then I should see product info on dialog

    @focus
    Scenario: I should not be able to edit product
        When I click on action from product 'product one'

        Then Menu item with text 'Edit' should be disabled

    @focus
    Scenario: I should not be able to delete product
        When I click on action from product 'product one'

        Then Menu item with text 'Delete' should be disabled
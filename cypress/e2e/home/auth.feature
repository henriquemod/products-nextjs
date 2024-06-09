Feature: Home Page - Authenticated User
    Background:
        Given I have a product with name 'product one' and price 50
        And Im authenticated
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
    Scenario: I should be able to edit product
        When I click on action from product 'product one'
        And I click on text 'Edit'
        And I type 'Edited Product' in the 'edit-name' field
        And I click on text 'Save'

        Then I should see 'Product Edited Product updated successfully'

    @focus
    Scenario: I should see error when try to edit product with empty value
        When I click on action from product 'product one'
        And I click on text 'Edit'
        And I clear the 'edit-name' field
        And I clear the 'edit-price' field
        And I click on text 'Save'

        Then I should see 'Name is required.'
        And I should see 'Price must be a valid number greater than zero.'

    @focus
    Scenario: I should be able to delete product
        When I click on action from product 'product one'
        And I click on text 'Delete'
        Then I should see 'Are you sure you want to delete this product?'

        When I click on text 'Delete'

        Then I should see 'Product product one deleted successfully'

    @focus
    Scenario: I should be able to create product
        When I click on add product button
        And I type 'New Product' in the 'create-name' field
        And I type '10' in the 'create-price' field
        And I click on id 'create-product-btn'

        Then I should see 'Product New Product created successfully'

    @focus
    Scenario: I should see error when try to create product with empty values
        When I click on add product button
        And I click on id 'create-product-btn'

        Then I should see 'Name is required.'
        And I should see 'Price must be a valid number greater than zero.'

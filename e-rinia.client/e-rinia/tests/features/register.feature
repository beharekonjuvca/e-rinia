Feature: Volunteer Registration
  As a new volunteer
  I want to register an account
  So I can access volunteer resources

  Scenario: Successful Registration
    Given I am on the registration page
    When I enter valid registration details
    And I submit the registration form
    Then I should be redirected to the dashboard
    And I should see a welcome message

  Scenario: Registration with Invalid Email
    Given I am on the registration page
    When I enter an invalid email
    And I submit the registration form
    Then I should see an error message about invalid email

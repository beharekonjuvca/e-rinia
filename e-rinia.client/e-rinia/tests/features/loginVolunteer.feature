Feature: Volunteer Login and Interaction

  Scenario: Successful Volunteer Login and Viewing Galleries
    Given I am on the volunteer login page
    When I login with valid credentials
    Then I should be redirected to the volunteer dashboard

  Scenario: Viewing Organizations after Login
    Given I am logged in as a volunteer
    When I navigate to the organizations gallery
    Then I should see a list of organizations

  Scenario: Viewing Events after Login
    Given I am logged in as a volunteer
    When I navigate to the events gallery
    Then I should see a list of events

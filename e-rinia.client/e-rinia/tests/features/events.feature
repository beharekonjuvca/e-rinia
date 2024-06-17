Feature: Event management

  Feature: Manage events

Scenario: Create a new event
  Given I am on the organization login page
  When I log in as an organization
  And I am on the events page
  When I fill out the event form and submit
  Then I should see the new event in the events list

  Scenario: Edit an existing event
    Given I am on the events page
    And an event exists
    When I edit the event
    Then I should see the updated event details in the events list

  Scenario: Delete an event
    Given I am on the events page
    And an event exists
    When I delete the event
    Then I should not see the event in the events list

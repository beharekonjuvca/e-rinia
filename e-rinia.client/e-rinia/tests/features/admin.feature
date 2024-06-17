Feature: Admin Dashboard Management

  Scenario: Admin Login
    Given I am on the admin login page
    When I login with admin credentials
    Then I should be redirected to the admin dashboard

  Scenario: View Volunteers
    Given I am logged in as an admin
    When I navigate to the volunteers page
    Then I should see a list of volunteers

  Scenario: Add a Volunteer
    Given I am on the volunteers page
    When I fill out and submit the new volunteer form
    Then I should see the new volunteer in the volunteer list

  Scenario: Edit a Volunteer
    Given I am on the volunteers page
    When I select a volunteer to edit and submit the changes
    Then I should see the updated details in the volunteer list

  Scenario: Delete a Volunteer
    Given I am on the volunteers page
    When I delete a volunteer
    Then the volunteer should no longer appear in the list

  Scenario: View Events
    Given I am logged in as an admin
    When I navigate to the events page
    Then I should see a list of events

  Scenario: Add an Event
    Given I am on the events page
    When I fill out and submit the new event form
    Then I should see the new event in the event list

  Scenario: Edit an Event
    Given I am on the events page
    When I select an event to edit and submit the changes
    Then I should see the updated details in the event list

  Scenario: Delete an Event
    Given I am on the events page
    When I delete an event
    Then the event should no longer appear in the list

  Scenario: Approve an Event
    Given I am on the events page
    When I approve an event
    Then the event should be marked as approved in the list

  Scenario: View Organizations
    Given I am logged in as an admin
    When I navigate to the organizations page
    Then I should see a list of organizations

  Scenario: Add an Organization
    Given I am on the organizations page
    When I fill out and submit the new organization form
    Then I should see the new organization in the organization list

  Scenario: Edit an Organization
    Given I am on the organizations page
    When I select an organization to edit and submit the changes
    Then I should see the updated details in the organization list

  Scenario: Delete an Organization
    Given I am on the organizations page
    When I delete an organization
    Then the organization should no longer appear in the list

  Scenario: Admin Logout
    Given I am logged in as an admin
    When I click the logout button
    Then I should be redirected to the login page

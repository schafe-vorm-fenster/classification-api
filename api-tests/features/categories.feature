Feature: Categories Endpoint

  Scenario: Get the available categories.
    * url baseUrl+'/api/categories'
    * method get
    * status 200
    * match response == "#array"
    * match response[0] == "#object"
    * match response[0].id == "#string"
    * match response[0].localizations == "#array"
    * match response[0].localizations[0] == "#object"
    * match response[0].localizations[0].locale == "#string"
    * match response[0].localizations[0].short == "#string"
    * match response[0].localizations[0].name == "#string"

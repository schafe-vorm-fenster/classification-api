Feature: Classify Endpoint - will classify incoming tags as one of the categories "community-life", "education-health", "everyday-supply", or "culture-tourism".

  Scenario: Should classify ÖPNV as everyday-supply.
    * url baseUrl+'/api/classify/bytags'
    * param tags = ["ÖPNV"]
    * method GET
    * status 200
    * match response == "#object"
    * match response.category == "everyday-supply"

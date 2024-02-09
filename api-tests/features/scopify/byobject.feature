Feature: Scopify Endpoint

  Scenario: Short recurring event in everyday-supply should be scoped to community.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "recurring", "timespan": "15min", "categories": ["everyday-supply"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "community"

  Scenario: One time long event in culture-tourism should be scoped to region.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "single", "timespan": "3h", "categories": ["culture-tourism"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "region"

  Scenario: one time multi day event in culture-tourism should be scoped to region.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "single", "timespan": "2d", "categories": ["culture-tourism"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "region"

  Scenario: Allday recurring event in everyday-supply should be scoped to community.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "recurring", "timespan": "allday", "categories": ["everyday-supply"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "community"

  Scenario: Short recurring event in everyday-supply should be scoped to community.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "recurring", "timespan": "15min", "categories": ["everyday-supply"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "community"

  Scenario: Short recurring event in everyday-supply with tags for public traffic should be scoped to community.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "recurring", "timespan": "15min", "categories": ["everyday-supply"], "tags": ["Bus", "ÖPNV"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "community"

  Scenario: Short recurring event in everyday-supply with tags for long distance transport should be scoped to community or nearby.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "recurring", "timespan": "15min", "categories": ["everyday-supply"], "tags": ["Bahn", "Zug"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "#regex ^community|nearby$"

  Scenario: Opening hours in everyday-supply should be scoped to nearby.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "openinghours", "categories": ["everyday-supply"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "nearby"

  Scenario: Opening hours in education-health should be scoped to nearby.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "openinghours", "categories": ["education-health"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "nearby"

  Scenario: Short recurring event in education-health should be scoped to nearby.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "recurring", "timespan": "1h", "categories": ["education-health"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "#regex ^community|nearby$"

  Scenario: Longer one time event in education-health should be scoped to nearby.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "single", "timespan": "2h", "categories": ["education-health"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "region"

  Scenario: Some event with legal related tags in community-life should be scoped to municipality.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "single", "timespan": "2h", "categories": ["community-life"], tags: ["Sizung", "Gemeindevertretung"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "municipality"

  Scenario: Some event with legal related tags in community-life should be scoped to municipality.
    * url baseUrl+'/api/scopify/byobject'
    * request { "occurrence": "single", "timespan": "1h", "categories": ["community-life"], tags: ["Ausschuss", "Gemeinde"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.scope == "municipality"

  Scenario: Error on missing body.
    * url baseUrl+'/api/scopify/byobject'
    * method POST
    * status 400
    * match response == "#string"

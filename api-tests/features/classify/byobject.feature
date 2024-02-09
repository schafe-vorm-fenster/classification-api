Feature: Classify Endpoint - will classify content as one oth the categories  "community-life"
      | "education-health" | "everyday-supply" |


  Scenario: Formal municipylity topics should be classified as community-life.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Sitzung der Gemeindevertretung Groß Polzin", "description": "Exportiert aus ALLRIS am 04.11.2023\n\n\nDie Sitzung in ALLRIS net:\nhttps://www.sitzungsdienst-zuessow.de/bi2/si010_j.asp?MM=12&YY=2023", "tags": ["Allris"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "community-life"

  Scenario: Sport related topics should be classified as community-life.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Fußball Training", "description": "", "tags": ["Fußball", "Sport"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "community-life"

  Scenario: Dance related topics should be classified as community-life.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Training der Swinow Line Dancer", "description": "", "tags": ["Tanzkurs", "Sport"] }
    * method POST
    * status 200
    * match response == "#object"


  Scenario: Club related topics should be classified as community-life.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Treffen des Heimatvereins", "description": "", "tags": ["Heimatverein"] }
    * method POST
    * status 200
    * match response == "#object"

  Scenario: Feuerwehr related topics should be classified as community-life.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Feuerwehrübung", "description": "", "tags": ["Feuerwehr"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "community-life"

  Scenario: Education related topics should be classified as education-health.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Bibliothek Karlsburg", "description": "" }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "regex ^education-health|community-life$"

  Scenario: Job related topics should be classified as education-health.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Arbeitsamt", "description": "", "tags": ["Arbeitsamt"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "education-health"

  Scenario: Health related topics should be classified as education-health.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Allgemeinarzt Johannes Spank", "description": "", "tags": ["medizinischeversorgung"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "education-health"

  Scenario: Public transport related topics should be classified as everyday-supply.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Busfahrplan", "description": "", "tags": ["Busfahrplan"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "everyday-supply"


  Scenario: Waste related topics should be classified as everyday-supply.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Müllabholung", "description": "", "tags": ["Müllabholung"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "everyday-supply"

  Scenario: Waste related topics should be classified as everyday-supply.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Gelbe Tonne", "description": "", "tags": ["Gelbe Tonne"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "everyday-supply"

  Scenario: Food related topics should be classified as everyday-supply.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Bäcker", "description": "", "tags": ["Bäcker"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "everyday-supply"

  Scenario: Food related topics should be classified as everyday-supply.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Bäckerei", "description": "", "tags": ["Bäckerei"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "everyday-supply"

  Scenario: Music and concert related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Konzert", "description": "", "tags": ["Konzert"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "culture-tourism"

  Scenario: Music and concert related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Band", "description": "", "tags": ["Band"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "culture-tourism"

  Scenario: Museum or exhibition related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Museum", "description": "", "tags": ["Museum"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "culture-tourism"

  Scenario: Museum or exhibition related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Ausstellung", "description": "", "tags": ["Ausstellung"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "culture-tourism"

  Scenario: Cinema related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Kino", "description": "", "tags": ["Kino"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "culture-tourism"

  Scenario: Restaurant or cafe related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Restaurant", "description": "", "tags": ["Restaurant"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "#regex ^culture-tourism|community-life$"

  Scenario: Restaurant or cafe related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Erzählcafefür Einheimische und Gäste", "description": "Erzählcafefür Einheimische und Gäste\n\nhttps://www.kirche-mv.de/veranstaltung/92316", "tags": ["Kirche"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "culture-tourism"

  Scenario: Market related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Markt", "description": "", "tags": ["Markt"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "culture-tourism"

  Scenario: Touristic related topics should be classified as culture-tourism.
    * url baseUrl+'/api/classify/byobject'
    * request { "summary": "Adlertouren", "description": "", "tags": ["Tour"] }
    * method POST
    * status 200
    * match response == "#object"
    * match response.category == "culture-tourism"



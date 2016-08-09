#User's Guide

###general xml file element nesting schema

**parent xml file, should be in root**

- testCases
  - databaseFile
  - baseURI
  - port
  - tokenRaw
  - file

**child xml files, specify location in parent xml file**

- scenario
  - case
    - method
    - headers
      - header
    - payload
    - expected
      - depend
      - dbRow
      - verifyStatus
      - verifyKeyValue
      - verifyResponseBody
      - validateSchema
      - dbKeyValue

#####elements that have special attributes

- scenario
  - ID: scenario id used in log file ex. "s001"
- case
  - request: url extension on the uri ex. "/statuses/home_timeline.json"
  - ID: case id used in log file ex. "c001"
- dbRow
  - label: string used as key to reference ResultSet in later tests ex. "userInfo"

###General info about each tag
####parent file
**testCases**: wrapper element for the parent file, has no attributes and contains other tags
**baseURI**: 

###Supported Tests
####verifyStatus
`<verifyStatus>200</verifyStatus>`

One integer is allowed within the tags. The integer should be the expected status code of the API call (if you are expecting 404, then put 404. If you're expecting 201, then put 201). Any status code other then the one specified will be marked as an error.
####verifyKeyValue
`<verifyKeyValue>id_str : 240558470661799936</verifyKeyValue>`

two strings separated by a colon. The first string is the key in the response json and the second string is the expected value. If the key is nested in other keys, then you indicate the nests with periods:

`<verifyKeyValue>entities.url : t.co/bfj7zkDJ</verifyKeyValue>`
####validateSchema
`<validateSchema>/schemas/case1.json</validateSchema>`

String within tags should contain the location of the schema that the response will be compared against.
####dbKeyValue
`<dbKeyValue> id_str : tweetTable.TWEETID</dbKeyValue>`

Similar to verifyKeyValue, but the value is not written in the xml file directly, but instead retrieved from the specified database. If this element is present in the scenario, 2 other elements must be present.
#####REQUIRED ELEMENTS
databaseFile: 

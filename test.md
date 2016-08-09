#User's Guide

###general xml file element formatting

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

####elements that have special attributes


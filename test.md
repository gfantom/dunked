#User's Guide
##Dependencies
- REST-assured
- JsonPath
- JDBC Thin Driver compatible with JDK 8

##General xml file element nesting schema
**parent xml file, should be in root**

- testCases
  - databaseFile
  - baseURI
  - port
  - tokenRaw
  - file

**child xml files, specify location in parent xml file**

- scenario
  - databaseFile
  - case
    - method
    - headers
      - header
    - payload
    - expected
      - depend
      - dbRow
      - dbKeyValue
      - verifyStatus
      - verifyKeyValue
      - verifyResponseBody
      - validateSchema
      - responseKeyValue

####elements that have special attributes

- scenario
  - ID: scenario id used in log file ex. "s001"
- case
  - request: url extension on the uri ex. "/statuses/home_timeline.json"
  - ID: case id used in log file ex. "c001"
- databaseFile
  - label: string used as key to reference database connection
- dbRow
  - label: string used as key to reference ResultSet in later tests ex. "userInfo"

##General info about each tag
*All tags are required unless otherwise noted*
###parent file
*testCases*: wrapper element for the parent file, has no attributes and contains other tags

*databaseFile*: Can be in parent or child file. All databases specified in parent files will be stored in a HashMap with the required `label` attribute as the key. The HashMap will be inherited by child files.

```XML
<testCases>
  <databaseFile label="database01">/databases/db1.properties</databaseFile>
  ...
```

or if in child file:

```XML
<scenario ID="s001">
  <databaseFile label="database02">/databases/db2.properties</databaseFile>
  ...
```

In the properties file:
```properties
#database properties
JDBC_DRIVER=oracle.jdbc.driver.OracleDriver
DB_URL=jdbc:oracle:thin:@eps-oracle.databaseurl.com:1521:ORCL
USER=username
PASSWORD=password
```

*baseURI*: the base uri that is being tested, ex.

```XML
<baseURI>https://api.twitter.com/1.1</baseURI>
```

*port*: API port number

```XML
<port>8080</port>
```

*tokenRaw*: the payload being sent to the base URI to retrieve the API token

```XML
<tokenRaw>{"username": "twitterbot", "password": "twitterbotpass"}</tokenRaw>
```

*file*: directory (relative to project root) and name of child files

```XML
<file>./scenarios/scenario01.xml</file>
```

###scenario (child) files
*scenario*: wrapper element, contains attribute "ID"

*case*: wrapper element, contains attribute "request" and "ID"

*method*: the API call method

```XML
<method>POST</method>
<method>GET</method>
```

*header*: header key and value, separated by colon symbol (white space optional, improves legibility)
- **optional** if no headers need to be included with the request

```XML
<header>Content-Type : application/v1.0+json</header>
<header>Accept-Language : en-US</header>
```

*payload*: optional payload string that will be sent with POST and PUT calls if included in the case.
- **optional** only include if request is POST or GET, and if a payload needs to be sent with the request

```XML
<payload>{"version":1, "lastmodified": 12345678}</payload>
```

*assertRowCountInc*: asserts that the row count in the specified table is incremented after the API request is sent.
- **optional** if you don't expect a new row to be created, or fully trust your API to create a row correctly
- format: database label (as specified in `<databaseFile>` element tag prior), 2 colon signs, table
- NOTE: case-sensitive
- NOTE: if you don't expect an additional row to be created immediately after the request (i.e. table is incremented after 1.5 min), don't use this test in the case
- ELEMENT TAG MUST BE BEFORE `<expected>` ELEMENT TAG, AS ONCE THE PARSER HITS `<expected>`, THE REQUEST WILL BE SENT

```XML
<scenario ID="s013">
  <databaseFile label="mainDatabase">/databases/mainDb.properties</databaseFile>
  ...
  <assertRowCountInc>mainDatabase::USER_PROFILES</assertRowCountInc>
  <expected>
    ...
```

*expected*: wrapper element for API call response tests

*depend*: key values from the call response are saved in a hashmap to be used for later cases in the same scenario. Multiple key values are separated by commas.
- **optional** if subsequent cases in the same scenario aren't dependent on any values from the response

NOTE: A value nested further in the response can be stored with the standard periods.

Example: If a response from a call is: 

```json
{
  "version": 1,
  "color": "red"
  "other": {
    "moreStuff": "infoHere"
  }
}
```

and the next case is a POST with a payload dependent on `color`, `version`, and `other.moreStuff`, then

```XML
<depend>color,version,other.moreStuff</depend>
```

should be nested in the `expected` element. In subsequent cases, `{DEPENDS::key}` can be used to insert that value into a payload or dbRow query.

Example:

```XML
<payload>{
  "version": {DEPENDS::version},
  "color": "{DEPENDS::color}",
  "other": {
    "info": "{DEPENDS::other.moreStuff}"
  }
}</payload>
```

Saved values can also be used in the `<case>` tag's `request` attribute by surrounding the key with brackets.

```XML
<case request="/statuses/retweets/{id}" ID="c001>
  <method>GET</method>
  ...
```

*dbRow*: rows returned from the database query are stored in a hashmap with the `label` attribute as the key, and the ResultSet as the value.

```XML
<expected>
  <dbRow label="table1">SELECT * FROM USERACCOUNTS WHERE USERID=12345678</dbRow>
  ...
```

The label can be any string, and will act as an identifier later on. Within the element tags must be a query that returns a row from a table found in the database. If an error occurs, testing will not continue with the cases in the scenario.

The remaining tags all belong within the `<expected>` element tags, and are **optional**. See **Supported Tests** below.

##Supported Tests
All tests are **optional**, but belong within the `<expected>` element tags.

*verifyStatus*
```XML
<verifyStatus>200</verifyStatus>
```

One integer is allowed within the tags. The integer should be the expected status code of the API call (if you are expecting 404, then put 404. If you're expecting 201, then put 201). Any status code other then the one specified will be marked as an error.

*responseKeyValue*
```XML
<responseKeyValue>id_str : 240558470661799936</responseKeyValue>
```

two strings separated by a colon. The first string is the key in the response json and the second string is the expected value. If the key is nested in other keys, then you indicate the nests with periods:

```XML
<verifyKeyValue>entities.url : t.co/bfj7zkDJ</verifyKeyValue>
```
*validateSchema*
```XML
<validateSchema>/schemas/case1.json</validateSchema>
```

String within tags should contain the location of the schema that the response will be compared against.

*dbKeyValue*
```XML
<expected>
  <dbrow label="row1" db="oracle">SELECT ...
  <dbKeyValue db="oracle" interval="5" limit="60">generaluser||admin : row1.USERTYPE</dbKeyValue>
```

Similar to `<verifyKeyValue>`, but checks values in a database rather than a the response. first half of string (before colon) are expected values in the table column separated by "||" (2 pipe characters, exclude double pipes if you only expect the value to be one string). The second half is the dbrow label is row label, period character, and the column name.

The following attribute is required:
- `db`: the database that the table belongs to

Optional attributes:
- `interval`: value must be an integer, the test will check the column entry every interval number of minutes OR until the entry is equal to the last value.
- `limit`: value must be integer, dictates the max number of minutes that the test will run. Defaults to 60 min if `interval` attribute is specified, but not `limit` attribute

In the example above, the test will check every 5 min up to 60 min that the entry in `USERTYPE` column is equal to `generaluser`. If the entry is `admin`, then the test will stop running and will be deemed successful. However, if at any time, the entry in the column is neither `generaluser` nor `admin`, then the test will stop immediately, and return unsuccessful.

*responseDbKeyValue*
```XML
<responseDbKeyValue> id_str : table1.LASTLOGIN</responseDbKeyValue>
```

Similar to `<verifyKeyValue>`, but the value is not written in the xml file directly, but instead retrieved from the specified database. If this element is present in the scenario, 2 other elements must be present:
- `databaseFile`: must be present in the scenario or parent file
- `dbRow`: must be present in the current case or previous cases in the same scenario

The string before the colon is the same as in the `<verifyKeyValue>` test: a key present in the request response body. The second string is separated by a period. The first half is the identifier for a ResultSet (table row) which should have been saved with a `<dbRow>` element. The second half should be the column name in that particular row. In the example above, `table1` is the table row name, and `LASTLOGIN` is the column in that table.

- FileGod calls start() method, prompts user for parent file directory and name.
- FileGod creates timestamped log file, creates TestCaseHandler object, passes BufferedWriter to TestCaseHandler
- TestCaseHandler stores all Connections (to databases) in a HashMap
- TestCaseHandler uses SAXparser to read through xml files, when it hits a file element tag, it creates a child TestCaseHandler, passes Connections HashMap to child
- creates DbContainer and ResultSetContainer objects when column values in tables need to be checked (dbKeyValue test)
- uses Assertion class static methods that return true or false to run tests for the tests

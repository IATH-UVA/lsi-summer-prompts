# LSI- 

### Tuesday. June 5th.

*general agenda: thinking like a relational database* 
---

*10* Review of Monday and general questions/or coding challenge opportunities [codewars](https://www.codewars.com/)

*10:30* more working with and thinking about queries and data - welcome to working with SQL tables [intro to SQL and more advanced SQL queries, 2 parts](https://www.khanacademy.org/computing/computer-programming/sql/sql-basics/v/welcome-to-sql)
+ also there are amazing SQL query cheatsheets [here](http://www.tutorialspoint.com/sql/pdf/sql-quick-guide.pdf)
+ and awesome reference guides as well [here](http://www.tutorialspoint.com/sql)

*11:30* Setting up SQLite and making a database for testing
+ for mac, type 'brew install sqlite3' or for windows, see [SQLite](https://www.sqlite.org/index.html)
+ if you'd like a gui to browse your SQLite databases see [DB Browser for SQLite](https://sqlitebrowser.org/). 

+ To create a new database in the cli (when in your github folder) type 'sqlite3 imdb_test.sqlite.db' . Nagivate to this new file from your DB Browser and open to view the empty table.
+ Practice setting up tables according to (these instructions)[./sql-tests/create_tables_instructions.pdf]. Again, open your gui to confirm creation of tables.

+ We'll practice queries on more complex data, so download this file (imdb_large)[https://learndotresources.s3.amazonaws.com/workshop/54c55ddb59650e0c0031a83e/imdb-large.sqlite3.db] and redirect your DBrowser to read from either your download folder or copy into your working folder. *as you work... do not try to save/push this large db to github. it will not be happy; instead copy your successfull queries with notes for later use or work out of a different folder on your machine*
+ To look at your tables from the command line, navigate to that folder holding the database and type 'sqlite3 imdb-large.sqlite3.db'; to check the tables once sqlite3 is running type '.tables'; to check schema type '.schema'; and to exit sqlite3 type '.exit'. (see also)[./sql-tests/spotcheck_tables.pdf].

+ To do a simple query from sqlite3 in the cli, type 'SELECT name, year FROM movies WHERE year=1902 AND rank>5;' and this will show the top three result movies from the year 1902. This could also be queried from the 'Execute SQL' tab in DB Browser.
+ For reference on queries and commands see (SQLite's documentation)[https://sqlite.org/lang.html]

   See space after lunch for the database query exercise instructions.

---
### Lunch
---


   
   
  

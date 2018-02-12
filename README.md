# db-twitter-ex

*requires working installations of Node.js and Mongodb installed*

## Setup/Installation:

To run the application, make sure you have both Node.js and MongoDB installed.

#### If you have already imported the .csv file from the assignment into a mongo database:

Simply run the application using a terminal (from the root of the application)

The run command is "node index.js {the name of your database}"

Example ```node index.js twitter-db```

#### If you have HAVEN'T already imported the .csv file from the assignment into a mongo database:

1. Download the .csv file from this link (it's the one that starts with "training...": https://docs.google.com/file/d/0B04GJPshIjmPRnZManQwWEdTZjg/edit

2. Make a new mongo database. On windows this is done by opening a terminal, typing "mongo", and then typing "use {desired-db-name}" like so: ```use twitter-db```

3. When the .csv file is downloaded, run the following command from your terminal (make sure to insert the correct database name and file path): mongoimport -d twitter-db -c tweet --type csv --file C:\training.1600000.processed.noemoticon.csv --fields "polarity,id,date,query,user,text"

4. Your database is now setup and you are ready to run the application!

## Usage

The application runs in the terminal and will, upon launch, provide the user with a few options (queries that are executed on the database).

When an action is chosen, the query is run and the result it printed to the user.

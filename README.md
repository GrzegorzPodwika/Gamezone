# ZTP Projekt

W celu uruchomienia aplikacji należy: 
1. Stworzyć bazę danych MySQL: "db_gamezone" oraz użytkownika (login, password) = (ztpuser, ztppass) i przyznać mu uprawnienia do operowania na bazie db_gamezone
<br>W przypadku stworzenia własnej bazy i customowego użytkownika należy zmienić 
odpowiednie dane w pliku application.properties

```
sudo mysql --password // albo zalogwanie się jako root do programu MySQLWorkbench
create database db_gamezone; -- Creates the new database
create user 'ztpuser'@'%' identified by 'ztppass'; -- Creates the user
grant all on db_gamezone.* to 'ztpuser'@'%'; -- Gives necessary privileges to the new user
```

2. Zaimportować projekt Gradle'owy server
3. Uruchomić backend: klasa GameZoneApplication fun main
4. Uruchomić frontend w pakiecie client: 
```
npm install
npm start
```



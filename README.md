
# Mariadb Real Challenge 

This is a historical mistake highlight package for mariadb.

!!!DO NOT USE THIS FOR LIVE ENVIRONMENT!!!

For live development please use the retardORM packages. 
That has almost the same functionality.



```javascript

const mariadb = new (require('mariadbrc').mariadbrc();

mariadb.setConfig('host', 'localhost');
mariadb.setConfig('user', 'userName');
mariadb.setConfig('password', 'password');
mariadb.setConfig('database', 'database');
mariadb.setConfig('connectionLimit', '5');
mariadb.connect();
mariadb.qf('getUsers', [100]);
mariadb.qp('addUser', ['user', 'user@email.com', 'password']);


```

## Blog

Blog-App using nodeJs, typescript and mysql

## Preparing the environment
```sh
vagrant box update
vagrant up --provision
```

- Restart docker containers:

```sh
vagrant ssh
export COMPOSE_FILE=/vagrant/docker/docker-compose.yml
docker-compose restart
```

- Recreate docker containers:

```sh
vagrant ssh
export COMPOSE_FILE=/vagrant/docker/docker-compose.yml
docker-compose up -d --force-recreate
```

 - Mysql preperation

You can connect to your mysql container
 ```sh
docker exec -it mysql mysql -uroot -pblog
 ```
 
 Then run the next two commands
 ```sql
 GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'blog';
 CREATE DATABASE blog;
 ```

 - Migrations

Change directory to migrations folder and run migrations
 ```sh
cd /vagrant/blog/api/src/migrations/
knex migrate:latest
 ```

## Install packages

API packages
 ```sh
cd /vagrant/blog/api/src/
npm install
```

Front-end packages
 ```sh
cd /vagrant/blog/web/src/
npm install
```

## Start API

Gulp watch
 ```sh
cd /vagrant/blog/api/src/
gulp watch
```
Start node server 
 ```sh
cd /vagrant/blog/api/src/
npm start
```
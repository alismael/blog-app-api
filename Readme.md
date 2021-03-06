## blog-app-api

Blog-App using nodeJs, typescript and mysql

## Preparing the environment
```sh
vagrant plugin install vagrant-docker-compose
vagrant box update

cd /root-folder/
vagrant up --provision
```

- Restart docker containers(not required):

```sh
vagrant ssh
export COMPOSE_FILE=/vagrant/docker/docker-compose.yml
docker-compose restart
```

- Recreate docker containers(not required):

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
 CREATE DATABASE blog character set utf8 collate utf8_bin;
 CREATE DATABASE blog_test character set utf8 collate utf8_bin;
 ```

# Starting development server

Install packages
 ```sh
cd /api/
npm install
```

Gulp watch
 ```sh
cd /api/
gulp
```

Start a development server
 ```sh
cd /api/
npm run dev
```

## Migration

```sh
cd /api/
npm run dev-migrate
 ```
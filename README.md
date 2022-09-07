# Warehouse

## Configuration

Rename the file `docker-compose.override.yml.dist` to `docker-compose.override.yml`, set the next enviroment variables to the appropiate values:

* `MONGO_INITDB_ROOT_USERNAME`: MongoDB instance username.
* `MONGO_INITDB_ROOT_PASSWORD`: MongoDB instance passsword.
* `MONGO_CONNECTION_STRING`:    MongoDB instance connection string.

The server run by default on `http://localhost:3000`, this can be modified using the config file located at `config/index.js`.

## Application

To run the application please use the next command:

```bash
$ sudo docker-compose up -d
```

## Usage

* A Postman collection called `Warehouse.postman_collection` it's provided, you can use it to have a basic understanding on how to API works.

* The unit test are another good way to understand the API.

## Troubleshot

* **I can't  see any in the docker image console:** This it's not a bug, it's a feature, everything is logged out to the log files, this way the application is not blocked by the syncronouse methods in the console object.  The log files are located at `logs/app-error.log` and `logs/combined.log`.

* **I don't know how to access the docker image:** Execute `docker exec -it warehouse-rest-api sh` in your terminal.

## Nice to have with more time

* OpenAPI Documentation: Sorry, not enough time to put it together.
* JWT authentication: Again, I run out time.
* The query to get all available products it's not perfect, the results are not 100% accurate, I would like to have more time to finist it.

## Compromises

* I modifed the original data files to change the fields `art_id`, `stock` and `amount_of` from string values to intenger and I added the field `price` to the `products.json` file.

* I implemented [Convential Commits](https://www.conventionalcommits.org/en/v1.0.0/), a specification for adding human and machine readable meaning to commit messages, so it's something that this codebase enforce in every commit.

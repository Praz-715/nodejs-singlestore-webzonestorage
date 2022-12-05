# Web Storage in SingleStore

Aplikasi CRUD dengan tipe data BLOB pada SingleStore (Database SQL) menggunakan NodeJS sebagai server

## RreRequirement


1. NodeJS Engine version 14 or latest
or
2. Docker Engine


## Installation

1. Use NodeJS engine

```bash
git clone https://github.com/Praz-715/nodejs-singlestore-webzonestorage

cd nodejs-singlestore-webzonestorage

npm install

npm run start
```

**Note:** edit variable database in router.js

2. Use Docker Engine

```bash
git clone https://github.com/Praz-715/nodejs-singlestore-webzonestorage

cd nodejs-singlestore-webzonestorage

docker pull node

# docker build . -t <"username">/<"name-app">

#Example
docker build . -t teguh715/nodejs-singlestore-webzonestorage

#Run Docker in linux
docker run \
	-e HOST_DB=172.17.0.2 \
	-e USER_DB=root \
	-e PASSWORD_DB=admin \
	-e DATABASE_NAME=teguhdb \
	-p 6969:6969 \
	-d teguh715/nodejs-singlestore-webzonestorage

#Run Docker in windows
docker run `
	-e HOST_DB=172.17.0.2 `
	-e USER_DB=root `
	-e PASSWORD_DB=admin `
	-e DATABASE_NAME=teguhdb `
	-p 6969:6969 `
	-d teguh715/nodejs-singlestore-webzonestorage


```

## Usage

Open in Browser **<IP_ADDRESS>:6969**


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
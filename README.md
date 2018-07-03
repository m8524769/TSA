# TSA

Back-End framework built by [Koa][] and [TypeORM][] with TypeScript

## Getting Started

```shell
git clone --depth=1 https://github.com/m8524769/TSA.git
cd ./TSA
vim ./ormconfig.json
npm i
npm start
```

## How to test it?

Use [Postman][] or something to send http requests to `http://localhost:3000/api/<your-router>`

## How to start it in the background?

```shell
npm i -g pm2
pm2 start npm --watch --name TSA -- start
```

- Check the background process
```shell
pm2 monit
```

## No License

Do What The F**k You Want To

[Koa]: https://koajs.com

[TypeORM]: http://typeorm.io

[Postman]: https://www.getpostman.com

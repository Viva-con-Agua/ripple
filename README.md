# ripple

> Implements a front-end for the Pool² microservice Bloob. That way it allows Viv

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

##
The `config/index.js` are changed, so that you can only connect to ripple over `localhost:8080/ripple`. If you need another subpath, edit `assetsPublicPath`.

## ChangeLog

### Version 0.2.0 (2018-05-08)
* [[F] #3 - List Mails](https://github.com/Viva-con-Agua/ripple/issues/3)
* [[F] #2 - Create Mails](https://github.com/Viva-con-Agua/ripple/issues/2)

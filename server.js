'use strict';

class Server{
    constructor(env){ //выполняется тогда, когда создается новый экземпляр объекта
        this.env = env;
        this.express = require('express'); //ссылки на внешний модуль
        this.app = this.express(); //создаем приложение

        this.clientRouter = this.express.Router();
        this.apiRouter = this.express.Router();


        // указываем ряд обций для работающего приложения
        this.app.set('view engine', 'jade'); //опция установки шаблонизатора
        this.app.set('view cache', this.env === 'production'); //опция кэширования шаблонов - откл.при разработке

        this.setupRouting();
        this.app.listen(8880); // какой порт слушать на предмет входящих соиденений
    }

    setupRouting() { //настройка маршрутизации

        const path = require('path'); //стандартный модуль node.js
        this.app.use('/build', this.express.static(path.join(__dirname, 'build'), {
            maxAge: this.env === 'production' ? 31536000 : 0 // если в production, то кэшируем 1 год, или вообше не кэшируем
        }));
        this.app.use('/vendor', this.express.static(path.join(__dirname, 'vendor'), {
            maxAge: this.env === 'production' ? 31536000 : 0
        }));

        this.clientRouter.get('/', (req, res, next) => {
            //res.send("Hello!");
            res.render('index', { //шаблон index.jade
                pageTitle: 'Главная страница'
            });
        });
        //this.apiRouter.get('/', function (req, res, next) {
        this.apiRouter.get('/', (req, res, next) => {
            res.json({
                'message': 'Hello from API!'
            });
        });

        this.app.use('/api', this.apiRouter);
        this.app.use('/', this.clientRouter);
    }
}

new Server(process.env.NODE_ENV || 'development'); //aka Object.create(Server.prototype);

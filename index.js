const express = require('express')
const nodemailer = require("nodemailer"); // библиотека для отправки писем на gmail
const cors = require("cors") // для корс запросов библиотека yarn add cors
const bodyParser = require('body-parser') // yarn add body-parser, библиотека для парсинга входяжих данных

const app = express() /*запуск библиотеки*/

app.use(cors()) // прежде чем создадутся ендпоинты, мы разрешаем слать корс запрос
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) // parse application/json используется для распаршивания входящего body

//const smtp_login = process.env.SMTP_LOGIN || "---" // в heroku в настройках задаются эти значения, чтобы в репазитории не было видно пользовательских данных
//const smtp_password = process.env.SMTP_PASSWORD || "---" // и во время запуска хероку подставит их вместо SMTP_LOGIN и SMTP_PASSWORD которые мы ввели в кабинете хероку


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "frontendterminator@gmail.com", // generated ethereal user
        pass: "react1991" // generated ethereal password
    }
});

/*создание ендпоитов*/
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/sendMessage', async function (req, res) {

    const {name, contacts, message} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Portfolio', // sender address
        to: "mikutishvili.koba@gmail.com", // list of receivers
        subject: "Новый отклик с портфолио", // Subject line
        //text: "Hi, it's my test message", // plain text body
        html: `<b>Сообщение с вашего портфолио: </b>
                <div>name: ${name}</div>
                <div>contacts: ${contacts}</div>
                <div>message: ${message}</div>`
    });

    res.send("Ok")
})

const port = process.env.Port || 3010 // чтобы брался порт переменной окружения, а не захордкодженый
//const port =  3010

/* указываем порт и функцию которая выполниться при запуске*/
app.listen(port, function () {
    console.log('server on')
})
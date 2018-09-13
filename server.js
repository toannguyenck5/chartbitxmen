const express = require("express")
const app = express()
const axios = require("axios")

const tokenJSON = "673531865:AAGTJQJuhCRc0cxasWo2pH8LlXerlzJ732o"
const chat_id = '@bitxmen_cronjob'
var url = `https://api.telegram.org/bot${tokenJSON}/`

app.listen(process.env.PORT || 3002, function(){
    setInterval(function(){
        axios({
            url: 'https://chartbitxmen.herokuapp.com/',
            method: 'GET',
        }).catch((x) => {
            var currentDate = new Date()
            axios({
                url: url + "sendMessage",
                method: 'POST',
                data: {
                    chat_id: chat_id,
                    text: 'awake trong chart lỗi lúc: ' + currentDate.toLocaleString('vi-VN', {timeZone: 'Asia/Bangkok'}) + '\nNội dung lỗi: ' + x
                }
            })
        })
    }, 10 * 57 * 1000)
})
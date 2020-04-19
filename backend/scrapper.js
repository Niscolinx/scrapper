import axios from 'axios'
import cheerio from 'cheerio'

export async function getHtml(url){

    const { date: html } = await axios({
        method: 'get',
        url: url,
        auth: {
            username: 'munisco12@gmail.com',
            password: 'munisco5'
        },
    })
    .then(function(res) {
        console.log(res)
    })
    .catch(function(err){
        console.log(err)
    })
    return html;
}

export async function getConnections(html){


}

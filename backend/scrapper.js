import axios from 'axios'
import cheerio from 'cheerio'

export async function getHtml(url){

    const {date: html} = await axios.get(url)
    return html;
}

export async function getConnections(html){


}

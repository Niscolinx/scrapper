import axios from 'axios'

export async function getHtml(url){

    const {date: html} = await axios.get(url)
    return html;
}


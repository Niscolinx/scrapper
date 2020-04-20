import {getHtml} from './scrapper'


async function go(){
    console.log(await getHtml('https://twitter.com/IgboanugwoC'))

}

go()
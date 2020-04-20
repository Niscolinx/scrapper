const express = require('express')
const cli = require('./profile-scraper/cli')

const app = express()

// app.get('/profile', (req, res, next) => {


// })

    (async () => {
        const profile = await cli()
        console.log(profile)
    })()



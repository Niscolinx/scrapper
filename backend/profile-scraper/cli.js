#!/usr/bin/env node
const express = require('express')

const scraper = require('./scraper');

const app = express()


const cli = async () => {
	if (process.argv.length < 3 || !process.argv[2]) {
		console.log('Usage : node backend/profile-scraper/cli.js LINKEDIN_URL');
	
	}

	try {
		const result = await scraper.getCompanyOrPeopleDetails(process.argv[2]);
		//console.log(result);
	} catch (e) {
		console.error(e);
	}
};

cli()

app.get('/profile', (req, res, next) => {
	console.log("starting to load the profiles"
	)
})

app.listen(8000, () => {
	console.log('Running on port http://localhost:8000')
})



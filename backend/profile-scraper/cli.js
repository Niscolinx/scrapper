#!/usr/bin/env node

const scraper = require('./scraper');

const cli = async () => {
	if(process.argv.length < 3 || !process.argv[2]) {
		console.log('Usage : node backend/profile-scraper/cli.js LINKEDIN_URL');
		return;
	}
	
	try {
		const result = await scraper.getCompanyOrPeopleDetails(process.argv[2]);
		console.log(result);
	} catch(e) {
		console.error(e);
	}
	return;
};

cli()



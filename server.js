var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var schedule = require('node-schedule');
var Timer = require('time-counter');
var colors = require('colors');

var rule = new schedule.RecurrenceRule();
//Timer to run every 3 minutes (average song time)
rule.minute = new schedule.Range(0, 59, 1);

//Timer setup
log = console.log.bind(console);
var countUpTimer = new Timer({
	targetValue: '0:58'
});
countUpTimer.on('change', log);

var j = schedule.scheduleJob(rule, function(){
    console.log('LOADING.......................'.rainbow);

	//URL for site you want to get the Songs from
	url = 'http://www.edge.ca';

	request(url, function(error, response, html){
		if(!error){

			//Load HTML from webpage using cheerio
			var $ = cheerio.load(html);
			var artist, stitle;

			//ID for artist
			$('.artist-name').each(function(){
		        var data = $(this);
		        artist = data.text();
	        })

			//ID for song title
			$('.song-name').each(function(){
		        var data = $(this);
		        stitle = data.text();
	        })
	        var newSong = {artist : artist, stitle : stitle};
		}
		
		var json;

		//Load data:
		fs.readFile('output.json', "utf8", function (err,data) {
		 	if (err) {
				return console.log(err);
			}
			json = JSON.parse(data);

			// Now check if it's already in the list:
			var alreadyInList = false;
			for(var i = 0; i < json.song.length; i ++)
			{
				//Loop though all songs in song array
			    if(json.song[i].stitle === newSong.stitle) {
			    	 alreadyInList = true;
			    	 console.log('Song already in list'.yellow);

	 				//Console timer
					//countUpTimer.start();
			    }
			}

			//If song is not present, push it
			if(!alreadyInList) {
				json.song.push(newSong);

				var backToString = JSON.stringify(json, null, 4);
				fs.writeFile('output.json', backToString, function (err) {
  	 				console.log('Song successfully added!'.green);

	 				//Console timer
					//countUpTimer.start();
	  	 		});
			} 
		});
	});
});	


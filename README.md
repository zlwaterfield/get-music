#Get Music

This is a nodejs script that scrapes a website for songs played by a radio station. The script gets the Artist and Song Title, and then pushes the data to a JSON array of songs. THe script also checks for duplicates so it doesnt push the same song twice. 

Example output can be found in output.json




###### Node Modules Used

* Cheerio - [https://www.npmjs.org/package/cheerio]
* Node Schedule - [https://www.npmjs.org/package/node-schedule]
* Colors - [https://www.npmjs.org/package/colors]
* Request - [https://www.npmjs.org/package/request]
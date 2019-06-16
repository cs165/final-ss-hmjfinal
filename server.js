const PROMPTS = ['List the things that make you feel powerful.',
	'What is something that made you laugh today?',
	'List the movies that you want to watch.',
	'List the things that make you feel peaceful.',
	'List your greatest comforts.',
	'What is something that brightens your day?',
	'List three things you accomplished today.',
	'What is something you look forward to every day?',
	'What is a game that you like to play?',
	'What is your Sunday ritual?',
	'List the most memorable moments of this month so far.',
	'List some things you want to do outdoors.',
	'If you could live anywhere you wanted, where would you live?',
	'List what you would spend a million dollars on, just for you.',
	'When do you feel most energized?',
	'List the things that make you feel excited.',
	'List your favorite snacks or treats.',
	'What has you busy this week?',
	'List the people you admire.',
	'List the happiest moments of your year so far.',
	'What hobby would you like to pick up?',
	'List the ways you love to have fun.',
	'Describe something you learned today',
	'List something fun you did or will do today.',
	'What is your dream job?',
	'List the things that inspire you.',
	'List something you did today that you are proud of.',
	'Find a quote that you like and write it down here.',
	'List something you should ignore.',
	'Talk about something you are excited about next month.',
	'List three traits you would like others to see in you.',
	'Who made you feel good this week?',
	'What was the biggest mistake you made this week?',
	'What did you do this week that moved you closer to reaching your goals?',
	'Is there anything you did this week that you wish you’d done differently?',
	'What did you most enjoy doing this week?',
	'How did you procrastinate on important tasks this week?',
	'What did you learn this week?',
	'What’s the funniest thing that happened to you this week?'];

const bodyParser = require('body-parser');
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const hbs = exphbs.create();
const googleSheets = require('./gsa-sheets.js');
const key = require('./privateSettings.json');
const SPREADSHEET_ID = '1SMWDGBhKH9_Glmr5sKtwmVXGCtWeuUY5UQcnGIqcRKA';
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);
const jsonParser = bodyParser.json();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.set('view engine', 'handlebars');
let db = null;
let diaries_collection = null;
const  myemail="qq756942070@gmail.com"

async function main() {
	  const port = process.env.PORT || 3000;
	  await app.listen(port);
	  console.log(`Server listening on port ${port}!`);
};

async function onCreateDiary(req, res) {
	  const name = req.params.name;
	  const email = req.params.email;
	  console.log("this is name!",name);
	  const res_index =await sheet.getRows("A:ZZ");
	  console.log(res_index,res_index.rows[0])
	  var flag=true;
	  var res_id={}
	  for(var a in  res_index.rows )
		  {
			  	  if(res_index.rows[a][0]==name)
				  	  {
						  		  flag=false;
						  		  res_id.id=res_index.rows[a][1]
						  		  console.log(a)
						  		  break;
						  	  }
			    }
	  if(flag)
		  {
			    const raw=await sheet.create(name);
			    const fileId = raw.response.spreadsheetId;
			    await sheet.addPermission(fileId, email);
			    await sheet.appendRow([name,fileId])
			    res_id.id= fileId 
			    }
	  res.json(res_id); 

}


async function initializeDiary(req, res) {
	  const routeParams = req.params;
	  const placeholders = {
		      id: routeParams.journal_id,
		  	url:"https://docs.google.com/spreadsheets/d/"+routeParams.journal_id,
		  	layout: false
		    };
	  console.log("In Diary ID ", placeholders.id);
	  res.render('entry', placeholders);
}

async function getDiaryEntry(req, res){
	  const routeParams = req.params;
	  const journal_id = routeParams.journal_id;
	  const currDate = routeParams.month + '/'+routeParams.day+"/"+routeParams.year;
	sheet_s = googleSheets(key.client_email, key.private_key, journal_id);
	var data=(parseInt(routeParams.year)-2018)*(parseInt(routeParams.month*31)+parseInt(routeParams.day)+1)
	var flag=data+":"+(parseInt(data))
	 console.log(flag)
	res_s= await sheet_s.getRows(flag) 
	console.log(res_s);
	try{
			contents= res_s.rows[0][1]
	}
	catch(err)
	{
			contents="Your entry here! "
	}
	 entry = {
		           prompt : PROMPTS[Math.floor(Math.random()*PROMPTS.length)],
		           content : contents,
		           date : currDate
		       }
	  res.json(entry);

}

async function updateDiaryEntry(req, res){
	  const routeParams = req.params;
	  const journal_id = routeParams.journal_id;
	  const currDate = routeParams.month + '/'+routeParams.day+"/"+routeParams.year;
	  const textContent = routeParams.content;
	  sheet_s =googleSheets(key.client_email, key.private_key, journal_id);
	  res_s=await sheet_s.setRow(((parseInt(routeParams.year)-2018)*(parseInt(routeParams.month*31)+parseInt(routeParams.day))),[currDate,textContent])
	res.json(res_s);




}


function onViewIndex(req, res) {
	  res.render('index',{layout: false});
}
app.get('/create/:name/:email', onCreateDiary);
app.get('/id/:journal_id', initializeDiary);

app.get('/', onViewIndex);
app.get('/getEntry/:journal_id/:month/:day/:year', getDiaryEntry);
app.get('/updateEntry/:journal_id/:month/:day/:year/:content',updateDiaryEntry);

main();




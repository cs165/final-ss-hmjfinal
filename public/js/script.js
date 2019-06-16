
console.log("in script.js");
let date = new Date();
const diaryContainer = document.querySelector('#entryFlex');
const journalId = document.querySelector('title').textContent;
console.log("In script: Journal Id: ", journalId, "date: ", date.toJSON());
//let dateStr = date.toLocaleString().substr(0, date.toLocaleString().indexOf(','));
let temp=date.toISOString().split("-")
let dateStr = parseInt(temp[1])+"/"+parseInt(temp[2])+"/"+temp[0]
const diary = new DiaryContainer(diaryContainer, dateStr, journalId);
initialize(diary);
console.log("DOne");

async function initialize(diary){
  var result = await diary.initialize();
}

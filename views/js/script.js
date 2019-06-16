
console.log("in script.js");
let date = new Date();
const diaryContainer = document.querySelector('#entryFlex');
const journalId = document.querySelector('title').textContent;
console.log("In script: Journal Id: ", journalId, "date: ", date.toLocaleString());
let dateStr = date.toLocaleString().substr(0, date.toLocaleString().indexOf(','));
const diary = new DiaryContainer(diaryContainer, dateStr, journalId);
initialize(diary);
console.log("DOne");

async function initialize(diary){
  var result = await diary.initialize();
}

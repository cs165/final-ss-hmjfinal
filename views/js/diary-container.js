

const MONTHS = {
  '1': 'Jan',
  '2': 'Feb',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'Sept',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
}


class DiaryContainer{
  constructor(diaryContainer, currDate, journalId){
    console.log("Journal id: ", journalId);
    this.journalId = journalId;
    this.diaryElement = document.querySelector('#text-box');
    this.diaryEntries = {};
    this.containerElement = diaryContainer;
    this.currDate = currDate;
    this.startDate = currDate;
    this.dateElement = document.querySelector('#date');
    this.promptElement = document.querySelector('#prompt');
    this.showEntry = this.showEntry.bind(this);
    this.initialize = this.initialize.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.startDay = this.startDay.bind(this);
    this.prevDay = this.prevDay.bind(this);
    this.nextDay = this.nextDay.bind(this);
    this.containerElement.classList.remove('inactive');
    this.startButton= document.querySelector('#start');
    this.prevButton = document.querySelector('#prev');
    this.nextButton = document.querySelector('#next');





  }

  async initialize(){
    console.log("In initialize function");
    //TODO: Retrieve diary with relevant id, and insert entry
    const entry = await fetch('/getEntry/'+this.journalId+'/'+this.currDate);
    console.log("results");
    const result = await entry.json();
    console.log("entry json: ", entry);
    let res =  this.currDate.split('/');
    this.dateElement.innerHTML = MONTHS[res[0]] +" "+res[1];
    this.promptElement.innerHTML = result.prompt;
    console.log("About to put in diary");
    if(result.content === "") result.content = "Your entry here";
    this.diaryElement.value = result.content;
    this.containerElement.addEventListener('click', this.showEntry);
    this.diaryElement.addEventListener('click', this.editEntry);
    this.prevButton.addEventListener('click', this.prevDay);
    this.startButton.addEventListener('click', this.startDay);
    this.nextButton.addEventListener('click', this.nextDay);
  }

  async showEntry(event){
    console.log("In showEntry listener");
    let currText = this.diaryElement.value;
    console.log("Curr text: ", currText);
    this.diaryElement.classList.add('pink');
    const result = await fetch('/updateEntry/'+this.journalId+'/'+this.currDate+'/'+currText);

    console.log("I'm here");
    this.diaryElement.className += 'pink';

  }

  async prevDay(){
    console.log("In prev day listener");
    event.stopPropagation();
    var date = new Date(this.currDate);
    date.setDate(date.getDate()-1);

    let dateStr = date.toLocaleString().substr(0, date.toLocaleString().indexOf(','));
    this.currDate = dateStr;
    let res =  this.currDate.split('/');
    this.dateElement.innerHTML = MONTHS[res[0]] +" "+res[1];
    const entry = await fetch('/getEntry/'+journalId+'/'+this.currDate);
    const result = await entry.json();
    console.log("result in prevDay: ", result);
    this.diaryElement.value = result.content;
    this.promptElement.innerHTML = result.prompt;


  }

  async nextDay(){
    console.log("In next day listener");
    event.stopPropagation();
    var date = new Date(this.currDate);
    date.setDate(date.getDate()+1);
    let dateStr = date.toLocaleString().substr(0, date.toLocaleString().indexOf(','));
    console.log("curr date: ", dateStr);
    this.currDate = dateStr;
    let res =  this.currDate.split('/');
    this.dateElement.innerHTML = MONTHS[res[0]] +" "+res[1];
    const entry= await fetch('/getEntry/'+journalId+'/'+this.currDate);
    const result = await entry.json();
    this.diaryElement.value = result.content;
    this.promptElement.innerHTML = result.prompt;


  }

async startDay(){
    console.log("In startDay listener");
    event.stopPropagation();
    this.currDate = this.startDate;
    const entry = await fetch('/getEntry/'+journalId+'/'+this.currDate);
    const result = await entry.json();
    this.diaryElement.value = result.content;
    let res =  this.currDate.split('/');

    this.dateElement.innerHTML = MONTHS[res[0]] +" "+res[1];
    this.promptElement.innerHTML = result.prompt;
  }



  editEntry(event){
    event.stopPropagation();
    console.log("In edit event listener");
    console.log(this.containerElement);
    this.diaryElement.disabled = false;
    this.diaryElement.classList.remove('pink');

  }


}

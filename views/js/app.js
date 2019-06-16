
  console.log("In APp")
  const createEntryButton = document.querySelector('#to-diary');
  createEntryButton.addEventListener('click', createEntry);


  async function createEntry(event){
    event.preventDefault();
    console.log("Create entry");
    const result = await fetch('/create');
    const json = await result.json();
    console.log(json.id);
    window.location.href = `/id/${json.id}`;

   

  }

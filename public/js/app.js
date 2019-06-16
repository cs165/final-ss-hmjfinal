
  console.log("In APp")
  const createEntryButton = document.querySelector('#to-diary');
  createEntryButton.addEventListener('click', createEntry);


  async function createEntry(event){
	      event.preventDefault();
	      console.log("Create entry");
	  	var name= document.querySelector('#name').value ||  '访客';
	  	var email= document.querySelector('#email').value ||  'hmj1160927411@gmail';
	      const result = await fetch('/create/'+name+'/'+email);
	      const json = await result.json();
	      console.log(json.id);
	      window.location.href = `/id/${json.id}`;
	    }


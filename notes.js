const addButton = document.querySelector("#add");
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    // console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    console.log(notes);
    localStorage.setItem('notes', JSON.stringify(notes));//inserting data from local storage
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('Note');
    const htmlData = `
    <div class="note container">
    <div class="operation container">
        <button class="button edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        <button class="button delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
        <div class="main textbox ${text ? "" : "hidden"} "></div>
        <textarea class=" textbox ${text ? "hidden" : ""}"></textarea>
    </div>
    </div>`;
    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    
    textArea.value = text;
    mainDiv.innerHTML = text;

    deleteButton.addEventListener('click', () => {
        note.remove();
        updateLSData();
    })
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;
        updateLSData();
        // console.log(value);
    })

    document.body.appendChild(note); //appends a node as a last child of the parent or node
}
const notes = JSON.parse(localStorage.getItem('notes')); //getting data from local storage
if (notes) { notes.forEach((note) => addNewNote(note)) };
addButton.addEventListener('click', () => addNewNote());
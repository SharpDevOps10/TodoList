const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.note-add');
const createNote = (title, text) => {
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.innerHTML = `
    <div class="note-header">
      <p>${title}</p>
      <div class="note-actions"> 
        <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <p>${text}</p>
  `;
  const editBtn = noteEl.querySelector('.note-edit');
  const deleteBtn = noteEl.querySelector('.note-delete');
  editBtn.addEventListener('click', (e) => {

  });
  deleteBtn.addEventListener('click', (e) => {
    noteEl.remove();
  });

  return noteEl;
};
addBtn.addEventListener('click', (e) => {
  const element = createNote("Header", "Your text");
  notesEl.appendChild(element);
});

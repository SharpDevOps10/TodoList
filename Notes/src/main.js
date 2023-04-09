const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.note-add');
const createNote = (title, text) => {
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.innerHTML = `
    <div class="note-header">
      <p id="note-title">${title}</p>
      <textarea id="note-title-input" class="hidden">${title}</textarea>
      <div class="note-actions"> 
        <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <p id="note-text">${text}</p>
  `;
  const editBtn = noteEl.querySelector('.note-edit');
  const deleteBtn = noteEl.querySelector('.note-delete');
  const titleEl = noteEl.querySelector('#note-title');
  const textEl = noteEl.querySelector('#note-text');
  editBtn.addEventListener('click', (e) => {
    titleEl.classList.toggle('hidden');
    textEl.classList.toggle('hidden');
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

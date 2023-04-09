const mainElement = document.querySelector('.main');
const createNote = (title, text) => {
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.innerHTML = `
    <div class="note-header">
      <p>${title}</p>
      <div class="note-actions"> 
        <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
      <div/>
    <div/>
  `;

};
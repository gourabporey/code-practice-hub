class NoteBook {
  #notes;

  constructor() {
    this.#notes = [];
  };

  #show(noteData) {
    const {title, note} = noteData;
    return `${title}:\n${note}\n`;
  };

  take(title, note) {
    this.#notes.push({title: title, note: note});
  };

  toString() {
    return this.#notes.map(this.#show).join("\n");
  };
};

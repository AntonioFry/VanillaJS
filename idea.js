class Idea {
  constructor(title, description, id) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.quality = 'swill'
  }

  saveLocalStorage(allIdeas) {
    localStorage.setItem('ideas', JSON.stringify(allIdeas))
    console.log(localStorage);
  }
}
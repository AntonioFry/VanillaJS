class Idea {
  constructor(title, description, id) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.quality = 'swill'
    this.starred = false;
    this.starredImg = `./images/star.svg`;
  }

  saveLocalStorage(allIdeas) {
    localStorage.setItem('ideas', JSON.stringify(allIdeas))
    console.log(localStorage);
  }
}
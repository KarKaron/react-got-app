export default class GotServise {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  async getResourse(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return await res.json();
  }

  /* ------------------ ФУНКЦИИ ПЕРСОНАЖЕЙ --------------------- */
  // Получение данных всех персонажей
  async getAllCharacters() {
    const res = await this.getResourse('/characters/?page=20&pageSize=10');
    return res.map(this._transformCharacter)
  }
  // Получение данных одного персонажа
  async getCharacter(id) {
    const char = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(char);
  }

  /* ------------------ ФУНКЦИИ КНИГ --------------------- */
  // Получение данных всех книг
  async getAllBooks() {
    const res = await this.getResourse('/books/?page=1&pageSize=10');
    return res.map(this._transformBook)
  }
  // Получение данных одной книги
  async getBooks(id) {
    const book = await this.getResourse(`/books/${id}`);
    return this._transformBook(book);
  }
  
  /* ------------------ ФУНКЦИИ ДОМОВ --------------------- */
  // Получение данных всех домов
  async getAllHouses() {
    const res = await this.getResourse('/houses/?page=1&pageSize=10');
    return res.map(this._transformHouse)
  }
  // Получение данных одного дома
  async getHouses(id) {
    const house = await this.getResourse(`/houses/${id}`);
    return this._transformHouse(house);
  }

  // Функции обработки данных
  isSet(data) {
    if (data) {
        return data
    } else {
        return 'no Data'
    }
  }    

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }


  // Трансформирование данных запроса 
  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture)
    }
  }

  _transformHouse = (house) => {
    return {
      id: this._extractId(house),
      name: this.isSet(house.name),
      region: this.isSet(house.region),
      words: this.isSet(house.words),
      titles: this.isSet(house.titles),
      overlord: this.isSet(house.overlord),
      ancestralWeapons: this.isSet(house.ancestralWeapons)
    }
  }

  _transformBook = (book) => {
    return {
      id: this._extractId(book),
      name: this.isSet(book.name),
      numberOfPages: this.isSet(book.numberOfPages),
      publiser: this.isSet(book.publiser),
      released: this.isSet(book.released),
      culture: this.isSet(book.culture)
    }
  }  
  
}
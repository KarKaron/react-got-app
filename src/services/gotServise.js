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
    const res = await this.getResourse('/characters/?page=15&pageSize=10');
    return res.map(this._transformCharacter)
  }
  // Получение данных одного персонажа
  async getCharacter(id) {
    const char = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(char);
  }
  // Трансформирование данных запроса 
  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }
  /* ------------------ ФУНКЦИИ КНИГ --------------------- */
  // Получение данных всех книг
  async getAllBooks() {
    const res = await this.getResourse('/books/?page=1&pageSize=10');
    return res.map(this._transformBooks)
  }
  // Получение данных одной книги
  async getBooks(id) {
    const book = await this.getResourse(`/books/${id}`);
    return this._transformBooks(book);
  }
  // Трансформирование данных запроса 
  _transformBooks(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
      culture: book.culture
    }
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
  // Трансформирование данных запроса 
  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }  
}
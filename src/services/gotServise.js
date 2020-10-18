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

  getAllCharacters() {
    return this.getResourse('/characters/?page=15&pageSize=10');
  }

  getCharacter(id) {
    return this.getResourse(`/characters/${id}`);
  }
}
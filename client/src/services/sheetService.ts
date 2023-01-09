import { GoogleSpreadsheet } from 'google-spreadsheet';
import { IAdventurer } from '../models/adventurer';
import { IItem } from '../models/item';
import { IQuest } from '../models/quest';

const sheetId = '1ianY6azMlWc9EYeFLOY8hAABJK7j8ohODm1RfU2n3pQ';
const apiKey = 'AIzaSyAjJpvbwgwVzM35-axnY7gLGyghxON8zfA';

const ADVENTURERS = 'Adventurers';
const ITEMS = 'Items';
const QUESTS = 'Quests';
const CHAPTERS = 'Chapters';

class SheetService {
  private readonly doc = new GoogleSpreadsheet(sheetId);
  private readonly load;
  private readonly age;

  constructor() {
    this.doc.useApiKey(apiKey)
    this.load = this.doc.loadInfo();
    this.age = new URLSearchParams(window.location.search).get('age');
  }

  async getAdventurers() {
    await this.load;
    const rows = await this.getRows(ADVENTURERS);
    return rows as unknown as IAdventurer[];
  }

  async getQuests() {
    await this.load;
    const rows = await this.getRows(QUESTS);
    return rows as unknown as IQuest[];
  }

  async getChapters() {
    await this.load;
    const rows = await this.getRows(CHAPTERS);
    return rows as unknown as IQuest[];
  }

  async getItems() {
    await this.load;
    const rows = await this.getRows(ITEMS);
    return rows as unknown as IItem[];
  }

  private async getRows(sheet: string) {
    await this.load;
    const sheetName = (this.age && this.age !== '1') ? `${sheet} ${this.age}` : sheet;
    const rows = await this.doc.sheetsByTitle[sheetName].getRows();
    return rows;
  }

}

export default new SheetService();
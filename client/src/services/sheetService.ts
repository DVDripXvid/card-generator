import { GoogleSpreadsheet } from 'google-spreadsheet';
import { IAdventurer } from '../models/adventurer';
import { IItem } from '../models/item';
import { IQuest } from '../models/quest';
import { IRole } from '../models/role';

const sheetId = '1ianY6azMlWc9EYeFLOY8hAABJK7j8ohODm1RfU2n3pQ';
const apiKey = 'AIzaSyAjJpvbwgwVzM35-axnY7gLGyghxON8zfA';

const ADVENTURERS = 'Adventurers';
const ITEMS = 'Items';
const QUESTS = 'Quests';
const CHAPTERS = 'Chapters';
const ROLES = 'Roles';

class SheetService {
  private readonly doc = new GoogleSpreadsheet(sheetId);
  private readonly load;

  constructor() {
    this.doc.useApiKey(apiKey)
    this.load = this.doc.loadInfo();
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

  async getRoles() {
    await this.load;
    const rows = await this.getRows(ROLES);
    return rows as unknown as IRole[];
  }

  private async getRows(sheet: string) {
    await this.load;
    const rows = await this.doc.sheetsByTitle[sheet].getRows();
    return rows;
  }

}

export default new SheetService();
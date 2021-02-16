import { GoogleSpreadsheet } from 'google-spreadsheet';
import { IAdventurer } from '../models/adventurer';
import { IQuest } from '../models/quest';

const sheetId = '1ianY6azMlWc9EYeFLOY8hAABJK7j8ohODm1RfU2n3pQ';
const apiKey = 'AIzaSyAjJpvbwgwVzM35-axnY7gLGyghxON8zfA';

const ADVENTURERS = 'Adventurers';
const QUESTS = 'Quests';

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

  private async getRows(sheet: string) {
    await this.load;
    const rows = await this.doc.sheetsByTitle[sheet].getRows();
    return rows;
  }

}

export default new SheetService();
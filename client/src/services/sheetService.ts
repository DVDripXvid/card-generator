import { GoogleSpreadsheet } from 'google-spreadsheet';
import { IAdventurer } from '../models/adventurer';

const sheetId = '1ianY6azMlWc9EYeFLOY8hAABJK7j8ohODm1RfU2n3pQ';
const apiKey = 'AIzaSyAjJpvbwgwVzM35-axnY7gLGyghxON8zfA';

const ADVENTURERS = 'Adventurers';

class SheetService {
  private readonly doc = new GoogleSpreadsheet(sheetId);
  private readonly load;

  constructor() {
    this.doc.useApiKey(apiKey)
    this.load = this.doc.loadInfo();
  }

  async getAdventurers() {
    await this.load;
    const rows = await this.doc.sheetsByTitle[ADVENTURERS].getRows();
    return rows as unknown as IAdventurer[];
  }

  async getAdventurerProperties() {
    await this.load;
    const result = await this.doc.sheetsByTitle[ADVENTURERS].headerValues;
    return result;
  }
}

export default new SheetService();
import { client } from "../config/configdata.js";

export default class QuestionRepo {
  constructor() {
    this.database = client.db("SpeakX").collection("Content");
  }

  async get(filter, page, pageSize) {
    try {
      const skip = (page - 1) * pageSize;

      const cursor = await this.database
        .find(filter)
        .skip(skip)
        .limit(pageSize)
        .sort({ _id: -1 });

      const results = await cursor.toArray();

      const totalCount = await this.database.countDocuments(filter);

      return {
        total: totalCount,
        page,
        pageSize,
        data: results,
      };
    } catch (err) {
      console.error("Error fetching questions:", err);
      throw err;
    }
  }
}

"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ListMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create({ awid, name }) {
    return await super.insertOne({ awid, name });
  }

  async get({ awid, id }) {
    return await super.find({ awid, id });
  }

  async update({ awid, id }, uuObject) {
    return await super.findOneAndUpdate({ awid, id }, uuObject, "NONE");
  }

  async delete({ awid, id }) {
    return await super.deleteOne({ awid, id });
  }

  async list({ awid }) {
    return await super.find({ awid });
  }
}

module.exports = ListMongo;

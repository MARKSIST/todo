"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/item-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },

  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
};

class ItemAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("item");
  }

  async list(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("itemListDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, 
      validationResult,
      WARNINGS.listUnsupportedKeys.code, 
      Errors.List.InvalidDtoIn
      );

      let dtoOut = this.dao.list({awid})
      dtoOut.uuAppErrorMap = uuAppErrorMap
      return dtoOut
  }

  async delete(awid, dtoIn) {
    
  }

  async complete(awid, dtoIn) {
    
  }

  async update(awid, dtoIn) {
    
  }

  async get(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("itemGetDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn,
      Errors.Get.ItemDaoGetFailed
    );
    
    let dtoOut = this.dao.get({awid, id: dtoIn.itemId})
    dtoOut.uuAppErrorMap = uuAppErrorMap
    return dtoOut
  }

  async create(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("itemCreateDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn, 
      validationResult,
      WARNINGS.createUnsupportedKeys.code, 
      Errors.Create.InvalidDtoIn
      );

      dtoIn.completed = false;
      dtoIn.awid = awid;
      let dtoOut;
      dtoOut = await this.dao.create(dtoIn);

      // hds 3
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;

  }

}

module.exports = new ItemAbl();

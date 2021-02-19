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

  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },

  completeUnsupportedKeys: {
    code: `${Errors.Complete.UC_CODE}unsupportedKeys`,
  },

  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
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

      let dtoOut = await this.dao.list({awid})
      return {dtoOut, uuAppErrorMap}
  }

  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("itemDeleteDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
      );
      let item = await this.dao.get({awid, id: dtoIn.id})
      if(item.itemList.length === 0 ){
        throw new Errors.Delete.ItemDaoDeleteFailed({uuAppErrorMap}, {id:dtoIn.id})
      }
      await this.dao.delete({awid, id: dtoIn.id})
      return {uuAppErrorMap}
  }

  async complete(awid, dtoIn) {
    let validationResult = this.validator.validate("itemCompleteDtoInType", dtoIn);
    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.completeUnsupportedKeys.code,
      Errors.Complete.InvalidDtoIn
      );
      let uuObject = await this.dao.get({awid, id: dtoIn.itemId})
      uuObject = {
        ...dtoIn
      }
      delete uuObject.itemId
      let dtoOut = await this.dao.complete({awid, id: dtoIn.itemId}, uuObject, "NONE")
      return {dtoOut, uuAppErrorMap}
  }

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("itemUpdateDtoInType", dtoIn);
    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
      );
      let uuObject = await this.dao.get({awid, id: dtoIn.itemId})

      uuObject = {
        ...dtoIn
      }

      delete uuObject.itemId
      let dtoOut = await this.dao.update({awid, id: dtoIn.itemId}, uuObject, "NONE")
      return {dtoOut, uuAppErrorMap}
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
    let dtoOut = this.dao.get({awid, id: dtoIn.id})
    return {dtoOut, uuAppErrorMap}
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
      
      return {dtoOut, uuAppErrorMap};

  }

}

module.exports = new ItemAbl();

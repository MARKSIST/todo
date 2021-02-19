"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/list-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },

  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },

};

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("list");
  }

  async list(awid, dtoIn) {
     // HDS 1.1
     let validationResult = this.validator.validate("listListDtoInType", dtoIn);

     // HDS 1.2, 1.3 // A1, A2
     let uuAppErrorMap = ValidationHelper.processValidationResult(
       dtoIn,
       validationResult,
       WARNINGS.listUnsupportedKeys.code,
       Errors.List.InvalidDtoIn,
       Errors.List.ListDaoListFailed
     );
      let dtoOut = await this.dao.list({ awid });
     return {dtoOut, uuAppErrorMap};
  }

  async delete(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listDeleteDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn,
      Errors.Delete.ListDaoDeleteFailed
    );

    try {
      await this.dao.delete({ awid, listId: dtoIn.listId });
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Delete.ListDaoDeleteFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    return {uuAppErrorMap}
  }

  async update(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listUpdateDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn,
      Errors.Update.ListDaoUpdateFailed
    );

    let uuObject = await this.dao.get(awid, dtoIn.listId);
    if (!uuObject) {
      throw new Error(`List with ${dtoIn.listId} not found`);
    }

    uuObject = {
      ...dtoIn
    }

    delete uuObject.id;

    let dtoOut;
    
    try {
      dtoOut = await this.dao.update({ awid, listId: dtoIn.listId }, uuObject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Update.ListDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    
    return {dtoOut, uuAppErrorMap};
  }

  async get(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listGetDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn,
      Errors.Get.ListDaoGetFailed
    );

    let dtoOut;

    try {
      dtoOut = await this.dao.get({ awid, listId: dtoIn.listId });
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Get.listDoesNotExist({ uuAppErrorMap }, e);
      }
      throw e;
    }
  
    return {dtoOut, uuAppErrorMap};
  }

  async create(awid, dtoIn) {
    // HDS 1.1
    let validationResult = this.validator.validate("listCreateDtoInType", dtoIn);

    // HDS 1.2, 1.3 // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // hds 2
    let dtoOut
    try {
      dtoOut = await this.dao.create({awid, name: dtoIn.name});
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Create.ListDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    // hds 3
    return {dtoOut, uuAppErrorMap};
  }
}

module.exports = new ListAbl();

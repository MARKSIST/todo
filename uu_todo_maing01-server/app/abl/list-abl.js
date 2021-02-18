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
     dtoOut.uuAppErrorMap = uuAppErrorMap;
 
     return dtoOut;
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
      Errors.Delete.ListDaoGetFailed
    );

    await this.dao.delete({ awid, id: dtoIn.id });
      
    return uuAppErrorMap
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

    let uuObject = await this.dao.get(awid, dtoIn.id);

    if (!uuObject) {
      throw new Error(`List with ${dtoIn.id} not found`);
    }

    uuObject = {
      ...dtoIn
    }

    delete uuObject.id;

    let dtoOut = await this.dao.update({ awid, id: dtoIn.id }, uuObject);
    dtoOut.uuAppErrorMap = uuAppErrorMap; 

    return dtoOut;
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

    let dtoOut = await this.dao.get({ awid, id: dtoIn.id });
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
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
    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Create.ListDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 3
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new ListAbl();

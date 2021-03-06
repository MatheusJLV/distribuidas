"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = __importDefault(require("./../controller/indexController"));
class routerIndex {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", indexController_1.default.cargarIndex);
        this.router.get("/chat", indexController_1.default.cargarChat);
    }
}

exports.default = new routerIndex().router;

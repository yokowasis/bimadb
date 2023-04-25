"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BimaDB {
    constructor(apiURL) {
        this.table = "";
        this.where = {};
        this.apiURL = "";
        this.from = (table) => {
            this.table = table;
            return this;
        };
        this.eq = (key, value) => {
            this.where[key] = value;
            return this;
        };
        this.clearProps = () => {
            this.table = "";
            this.where = {};
        };
        this.doLogin = (username, password) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                fetch(`${this.apiURL}login`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    }),
                })
                    .then((res) => res.json())
                    .then((result) => {
                    localStorage.setItem("jwt", result.token);
                    resolve(true);
                })
                    .catch((err) => {
                    console.log(err);
                    resolve(false);
                });
            }));
        });
        this.doUpdate = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(`${this.apiURL}${this.table}/update`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data,
                        where: this.where,
                    }),
                })
                    .then((res) => res.json())
                    .then((result) => {
                    this.clearProps();
                    resolve(result);
                })
                    .catch((err) => {
                    this.clearProps();
                    reject(err);
                });
            }));
        });
        this.doDelete = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(`${this.apiURL}${this.table}/delete`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        where: this.where,
                    }),
                })
                    .then((res) => res.json())
                    .then((result) => {
                    this.clearProps();
                    resolve(result);
                })
                    .catch((err) => {
                    this.clearProps();
                    reject(err);
                });
            }));
        });
        this.doInsert = (data) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(`${this.apiURL}${this.table}/insert`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data,
                    }),
                })
                    .then((res) => res.json())
                    .then((result) => {
                    this.clearProps();
                    resolve(result);
                })
                    .catch((err) => {
                    console.log(err);
                    this.clearProps();
                    reject(err);
                });
            }));
        });
        this.doGet = (columns = ["*"]) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(`${this.apiURL}${this.table}/get`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        where: this.where,
                        columns,
                    }),
                })
                    .then((res) => res.json())
                    .then((result) => {
                    this.clearProps();
                    resolve(result);
                })
                    .catch((err) => {
                    this.clearProps();
                    reject(err);
                });
            }));
        });
        this.apiURL = apiURL;
    }
}
exports.default = BimaDB;
//# sourceMappingURL=index.js.map
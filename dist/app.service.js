"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require('path');
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const jsforce = require("jsforce");
let AppService = exports.AppService = class AppService {
    constructor() {
        this.conn = new jsforce.Connection({});
    }
    getHello() {
        return 'Hello World!';
    }
    async GenerageDocxFile() {
        console.log(path.join(__dirname, '../uploads'));
        const template = fs.readFileSync(path.join(__dirname, '../uploads/AQ041-02-GB-PS8_Offre Matériel simple (ID 1083570).docx'));
        const zip = new PizZip(template);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.render({
            name: 'sagar',
            surname: 'Lazarus',
        });
        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        fs.writeFileSync('report.docx', buf);
    }
    async login(username, password) {
        return new Promise((resolve, reject) => {
            this.conn.login(username, password, (err, userInfo) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(userInfo);
                }
            });
        });
    }
};
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map
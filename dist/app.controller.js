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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const jsforce = require('jsforce');
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async GenerateFile() {
        const username = 'cp@moreyeahs.com';
        const password = 'moreyeahs@123' + 'zdKZRTBR8cOQ4PbymrsoBz58Y';
        const value = await this.appService.login(username, password);
        console.log(value);
    }
    salesforceOauth2(req, res) {
        const oauth2 = new jsforce.OAuth2({
            clientId: '3MVG9CecKwYCDceRMr3S_mwcNmu1rZP.1TPc3SFuEL9fR0FH.G3bkeYjJTrsLKFX9d53n5U6DhDsxnQR.Ilxn',
            clientSecret: '5C5772466700A1C9BB8B91F7200E4C549DD683D1582EF6467CBE38BF8939D77C',
            redirectUri: `${req.protocol}://${req.get('host')}/getAccessToken`
        });
        res.redirect(oauth2.getAuthorizationUrl({}));
    }
    getAccessToken(req, res) {
        const oauth2 = new jsforce.OAuth2({
            clientId: '3MVG9CecKwYCDceRMr3S_mwcNmu1rZP.1TPc3SFuEL9fR0FH.G3bkeYjJTrsLKFX9d53n5U6DhDsxnQR.Ilxn',
            clientSecret: '5C5772466700A1C9BB8B91F7200E4C549DD683D1582EF6467CBE38BF8939D77C',
            redirectUri: `${req.protocol}://${req.get('host')}/getAccessToken`
        });
        const conn = new jsforce.Connection({ oauth2: oauth2 });
        conn.authorize(req.query.code, function (err, userInfo) {
            if (err) {
                return console.error(err);
            }
            const conn2 = new jsforce.Connection({
                instanceUrl: conn.instanceUrl,
                accessToken: conn.accessToken
            });
            conn2.identity(function (err, res) {
                if (err) {
                    return console.error(err);
                }
                console.log("user ID: " + res.user_id);
                console.log("organization ID: " + res.organization_id);
                console.log("username: " + res.username);
                console.log("display name: " + res.display_name);
            });
            conn2.query("SELECT Id, Name FROM Account", function (err, result) {
                if (err) {
                    return console.error(err);
                }
                console.log("total : " + result.totalSize);
                console.log("fetched : " + result.records.length);
            });
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "GenerateFile", null);
__decorate([
    (0, common_1.Get)('/oauth2/auth'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "salesforceOauth2", null);
__decorate([
    (0, common_1.Get)('/getAccessToken'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAccessToken", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map
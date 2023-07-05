import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
const jsforce = require('jsforce');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
 async GenerateFile() {
   const username= 'cp@moreyeahs.com'
   const password= 'moreyeahs@123'+'zdKZRTBR8cOQ4PbymrsoBz58Y'
    const value= await this.appService.login(username,password);
    console.log(value)
  }
  @Get('/oauth2/auth')
  salesforceOauth2(@Req() req:any,@Res() res:any){
    const oauth2 = new jsforce.OAuth2({
      clientId: '3MVG9CecKwYCDceRMr3S_mwcNmu1rZP.1TPc3SFuEL9fR0FH.G3bkeYjJTrsLKFX9d53n5U6DhDsxnQR.Ilxn',
      clientSecret: '5C5772466700A1C9BB8B91F7200E4C549DD683D1582EF6467CBE38BF8939D77C',
      redirectUri: `${req.protocol}://${req.get('host')}/getAccessToken`
    });
    res.redirect(oauth2.getAuthorizationUrl({}));

  }
  @Get('/getAccessToken')
  getAccessToken(@Req() req:any,@Res() res:any){
    const oauth2 = new jsforce.OAuth2({
      clientId: '3MVG9CecKwYCDceRMr3S_mwcNmu1rZP.1TPc3SFuEL9fR0FH.G3bkeYjJTrsLKFX9d53n5U6DhDsxnQR.Ilxn',
      clientSecret: '5C5772466700A1C9BB8B91F7200E4C549DD683D1582EF6467CBE38BF8939D77C',
      redirectUri: `${req.protocol}://${req.get('host')}/getAccessToken`
    });
    const conn = new jsforce.Connection({ oauth2 : oauth2 });
    conn.authorize(req.query.code, function(err, userInfo) {
      if (err) {
        return console.error(err);
      }
      const conn2 = new jsforce.Connection({
        instanceUrl : conn.instanceUrl,
        accessToken : conn.accessToken
      });
      conn2.identity(function(err, res) {
        if (err) { return console.error(err); }
        console.log("user ID: " + res.user_id);
        console.log("organization ID: " + res.organization_id);
        console.log("username: " + res.username);
        console.log("display name: " + res.display_name);
      });
      conn2.query("SELECT Id, Name FROM Account", function(err, result) {
        if (err) { return console.error(err); }
        console.log("total : " + result.totalSize);
        console.log("fetched : " + result.records.length);
      });
    });

  }
}

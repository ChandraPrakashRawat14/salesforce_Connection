import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
const path=require('path')
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
import * as jsforce from 'jsforce';
@Injectable()
export class AppService {
  private conn: jsforce.Connection;
  public constructor() {
    this.conn = new jsforce.Connection({
      // loginUrl: 'https://moreyeahs4-dev-ed.develop.lightning.force.com'
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
  async GenerageDocxFile() {
    console.log(path.join(__dirname , '../uploads'));
    const template = fs.readFileSync(path.join(   __dirname,
      '../uploads/AQ041-02-GB-PS8_Offre Matériel simple (ID 1083570).docx')
   ,
    );
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
  // compression: DEFLATE adds a compression step.
  // For a 50MB output document, expect 500ms additional CPU time
  compression: "DEFLATE",
});
    fs.writeFileSync('report.docx', buf);
  }
  async login(username: string, password: string): Promise<jsforce.UserInfo> {
    return new Promise<jsforce.UserInfo>((resolve, reject) => {
      this.conn.login(username, password, (err, userInfo) => {
        if (err) {
          reject(err);
        } else {
          // console.log(userInfo)
          resolve(userInfo);
        }
      });
      
    });
  }
}

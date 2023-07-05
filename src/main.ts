import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // var conn = new jsforce.Connection({
  //   // loginUrl : 'https://moreyeahs4-dev-ed.develop.lightning.force.com'
  // });
  // const password='moreyeahs@123'+'zdKZRTBR8cOQ4PbymrsoBz58Y'
  // conn.login('cp@moreyeahs.com', password, function(err, res) {
  //   if (err) { return console.error(err); }
  //   conn.query('SELECT Id, Name FROM Account', function(err, res) {
  //     if (err) { return console.error(err); }
  //     console.log(res);
  //   });
  // });
  await app.listen(3000);
}
bootstrap();

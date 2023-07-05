import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    GenerateFile(): Promise<void>;
    salesforceOauth2(req: any, res: any): void;
    getAccessToken(req: any, res: any): void;
}

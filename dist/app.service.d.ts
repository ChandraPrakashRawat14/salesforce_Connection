import * as jsforce from 'jsforce';
export declare class AppService {
    private conn;
    constructor();
    getHello(): string;
    GenerageDocxFile(): Promise<void>;
    login(username: string, password: string): Promise<jsforce.UserInfo>;
}

import { Entry, Topic, User } from "./interface";
export declare class Client {
    private baseUrl;
    private email;
    private password;
    private token;
    constructor(email: string, password: string);
    login(): Promise<any>;
    getUser(id: string): Promise<unknown>;
    getProfile(username: string): Promise<User>;
    getHotTopics(): Promise<Topic[]>;
    getRandomEntry(): Promise<Entry>;
    getLastEntries(): Promise<Entry[]>;
    getTopic(id: string): Promise<Topic>;
    getRecentlyTopics(): Promise<Topic[]>;
    private _authedPost;
    private _authedGet;
}

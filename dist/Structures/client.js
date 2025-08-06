"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const constants_1 = require("../constants");
class Client {
    constructor(email, password) {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "email", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "password", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "token", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.baseUrl = constants_1.URL;
        this.password = password;
        this.email = email;
    }
    async login() {
        const email = this.email;
        const password = this.password;
        const res = await fetch(`${this.baseUrl}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.message);
        this.token = data.token;
        return data;
    }
    async getUser(id) {
        return this._authedPost("/user/get-user", { id });
    }
    async getProfile(username) {
        return this._authedPost("/user/get-user-profile", { username });
    }
    async getHotTopics() {
        return this._authedGet("/topic/get-hot-topics");
    }
    async getRandomEntry() {
        return this._authedGet("/entry/get-random-entry");
    }
    async getLastEntries() {
        return this._authedGet("/entry/get-last-entries");
    }
    async getTopic(id) {
        return this._authedPost("/entry/get-topic", { id });
    }
    async getRecentlyTopics() {
        return this._authedGet("/entry/get-recently-topics");
    }
    async _authedPost(path, body = {}) {
        if (!this.token)
            throw new Error("Giriş yapmanız gerekiyor.");
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.message);
        return data;
    }
    async _authedGet(path) {
        if (!this.token)
            throw new Error("Giriş yapmanız gerekiyor.");
        const res = await fetch(`${this.baseUrl}${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
            },
        });
        const data = await res.json();
        if (!res.ok)
            throw new Error(data.message);
        return data;
    }
}
exports.Client = Client;

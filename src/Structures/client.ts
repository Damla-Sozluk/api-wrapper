import { URL } from "../constants";
import { Entry, Topic, User } from "./interface";

export class Client {
  private baseUrl: string;
  private email: string;
  private password: string;
  private token: string | null = null;

  constructor(email: string, password: string) {
    this.baseUrl = URL;
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
    if (!res.ok) throw new Error(data.message);

    this.token = data.token;
    return data;
  }

  async getUser(id: string) {
    return this._authedPost("/user/get-user", { id });
  }

  async getProfile(username: string): Promise<User> {
    return this._authedPost<User>("/user/get-user-profile", { username });
  }

  async getHotTopics(): Promise<Topic[]> {
    return this._authedGet<Topic[]>("/topic/get-hot-topics");
  }

  async getRandomEntry(): Promise<Entry> {
    return this._authedGet<Entry>("/entry/get-random-entry");
  }

  async getLastEntries(): Promise<Entry[]> {
    return this._authedGet<Entry[]>("/entry/get-last-entries");
  }
  
  async getTopic(id: string): Promise<Topic> {
    return this._authedPost<Topic>("/entry/get-topic", { id });
  }

  async getRecentlyTopics(): Promise<Topic[]> {
    return this._authedGet<Topic[]>("/entry/get-recently-topics");
  }


private async _authedPost<T>(path: string, body = {}): Promise<T> {
  if (!this.token) throw new Error("Giriş yapmanız gerekiyor.");
  const res = await fetch(`${this.baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data as T;
}

private async _authedGet<T>(path: string): Promise<T> {
  if (!this.token) throw new Error("Giriş yapmanız gerekiyor.");
  const res = await fetch(`${this.baseUrl}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data as T;
}

}

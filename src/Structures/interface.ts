export interface Entry {
  _id: string;
  topic: any;
  owner: any;
  text: string;
  likes: string[];
  dislikes: string[];
  favorites: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  username: string;
  birthday: string;
  gender: string;
  userType: 'User' | 'Admin' | 'Premium';
  entries: Entry[];
  favorites: Entry[];
  avatar: string;
  createdAt: string;
  updatedAt: string;
  banner: string;
  __v: number;
  
}


export interface Topic {
  _id: string;
  title: string;
  entries: Entry[];
  createdAt: string;
  updatedAt: string;
  entryCountLast24Hours: number;
}
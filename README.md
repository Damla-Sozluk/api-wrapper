# DamlaSözlük Client

Bu, [DamlaSözlük](https://damlasozluk.com) API'si ile etkileşim kurmak için yazılmış TypeScript tabanlı bir istemci (client) sınıfıdır. Giriş, profil, entry, topic gibi işlemleri kolayca yapmanı sağlar.

---

### Kurulum

```bash
npm install damlasozluk-api-wrapper
```

veya

```bash
yarn add damlasozluk-api-wrapper
```

---

### Giriş ve Kimlik Doğrulama

Client, login işlemi yapmadan önce token gerektiren metotları kullanmana izin vermez.

```ts
const client = new Client("mail@example.com", "şifren");
await client.login();
```

---

### Kullanılabilir Metotlar

#### 🔸 `getUser(id: string)`
Belirtilen kullanıcı ID’sine göre kullanıcı bilgilerini getirir.  
→ **Return:** `{ _id, username, avatar, ... }`

#### 🔸 `getProfile(username: string)`
Kullanıcının profilini getirir.  
→ **Return:** `User` interface’ine göre detaylı kullanıcı profili.

#### 🔸 `getHotTopics()`
Gündemdeki en popüler başlıkları getirir.  
→ **Return:** `Topic[]`

#### 🔸 `getRecentlyTopics()`
Son zamanlarda yazılmış başlıkları listeler.  
→ **Return:** `Topic[]`

#### 🔸 `getRandomEntry()`
Rastgele bir entry döndürür.  
→ **Return:** `Entry`

#### 🔸 `getLastEntries()`
Son yazılan entry'leri listeler.  
→ **Return:** `Entry[]`

#### 🔸 `getTopic(id: string)`
Belirli bir başlığı detaylarıyla birlikte getirir.  
→ **Return:** `Topic`

---
### Örnek Kullanım

```ts
const client = new Client("user@example.com", "123456");
await client.login();

const profile = await client.getProfile("erenvein");
console.log(profile);

const hotTopics = await client.getHotTopics();
hotTopics.forEach((topic) => {
  console.log(topic.title);
});
```

---

### 📬 Katkı

İyileştirme önerilerin varsa PR göndermekten çekinme! Bu client sürekli geliştirilecektir.
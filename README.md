# ejs-Tinysite
ejs-Tinysite 是一個用[ejs](https://ejs.co/)設計且不需要額外網頁伺服器軟體(例如：Nginx, Apache,...)的超小型完整網站。  
ejs-Tinysite is a tiny but completed website designed with [ejs](https://ejs.co/) and does not require an additional web server software(e.g. Nginx, Apache,...).  

![image](https://raw.githubusercontent.com/WayneChang65/ejs-tinysite/master/img/001.png)  
![image](https://raw.githubusercontent.com/WayneChang65/ejs-tinysite/master/img/002.png)  
![image](https://raw.githubusercontent.com/WayneChang65/ejs-tinysite/master/img/003.png)  

## 這個程式能做什麼呢？ (What can it do ?)  
麻雀雖小，五臟俱全。基本上，ejs-Tinysite就是一個網站系統，包含基礎的會員管理。  
Tiny but completed. Basically, ejs-Tinysite is a website system that includes basic membership management.  

### 功能 (Features)  
* 會員註冊。填入名字、eMail以及密碼進行註冊。
Member register. Input a name, eMail and password to register.  
* 會員登入。使用eMail及密碼可登入並建立Session維持連線。  
Member login. Build a session to keep the connection.  
* 會員登出。主畫面有一個登出Button可進行會員登出。  
Member logout. Can logout with a logout button in the home page.  
* 會員資料庫。目前只簡單儲存在users.json中，若想改存於mongoDB也不困難。  
Member database. Store users data in a json file(users.json). It can be rewrite to use mongoDB easily.  
* 頁面設計。目前是簡單使用ejs將頁面分成head、header及footer等樣板後組合成頁面。另外，也可自行依照需求設計ejs版面。  
Page design. It is simple to use ejs to divide the page into header, header and footer templates and then combine them into any single page. In addition, you can also design the ejs layout according to your needs.  

![image](https://raw.githubusercontent.com/WayneChang65/ejs-tinysite/master/img/004.png)  
![image](https://raw.githubusercontent.com/WayneChang65/ejs-tinysite/master/img/005.png)  

## 如何使用？ (How to use it?)  

### 安裝 (Install)
1. 於Github下載專案程式檔  
Download project from Github
```
  git clone https://github.com/WayneChang65/ejs-tinysite.git
```
2. 利用 npm 下載相依套件  
Use npm to install dependencies
```
cd ejs-tinysite
npm install
```
3. 執行程式  
Run program  
```
npm start
```
![image](https://raw.githubusercontent.com/WayneChang65/ejs-tinysite/master/img/006.png)  

### 額外設定 (Extra Setting)  
* 環境變數SESSION_SECRET。此環境變數為Session Secret，安全起見可以設定一個新的，若未設定也會有預設值。  
SESSION_SECRET. This environment variable is a session secret. For security, it can be set and there will be a default value if not set.  
* 環境變數EJS_TINYSITE_POST。此環境變數網站服務的Port，若未設定也會有預設值(8080)。  
EJS_TINYSITE_POST. This environment variable is the port of the service listening. It can be set and there will be a default value(8080) if not set.  

## 參考 (Reference)  
* [https://youtu.be/-RCnNyD0L-s](https://youtu.be/-RCnNyD0L-s)
* [https://youtube.com/playlist?list=PL7sCSgsRZ-slYARh3YJIqPGZqtGVqZRGt](https://youtube.com/playlist?list=PL7sCSgsRZ-slYARh3YJIqPGZqtGVqZRGt)  

## 貢獻一己之力 (Contribution)
ejs-tinysite 雖然是一個小模組，但本人還是希望這個專案能夠持續進步！若有發現臭蟲(bug)或問題，請幫忙在Issue留言告知詳細情形。  
歡迎共同開發。歡迎Fork / Pull Request，謝謝。:)  

Even though ejs-tinysite is a small project, I hope it can be improving. If there is any issue, please comment and welcome to fork or send Pull Request. Thanks. :)

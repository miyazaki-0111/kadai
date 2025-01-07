# ToDoリストアプリ仕様書

## 利用者の方々用
### 概要
ToDoリストアプリは，タスクを登録し，リストとして表示するシンプルなアプリケーションです，ブラウザ上で動作し，追加したタスクをリアルタイムに確認することができます．

##　アプリケーションの起動方法

### 実行手順
1. **依存関係のインストール**  
   以下のコマンドを実行し、必要な依存関係をインストールする．
   ```bash
   npm install 
 
   ```
2. **アプリケーションの起動**
    次に以下のコマンドを入力してアプリケーションを起動する．
    ```bash
    node app_todo.js
    ```

3. **ブラウザでアクセス**
    ブラウザを開いて，http://localhost:8081/public/todo.html　にアクセスする．

### アプリケーションの使用方法
1. **ブラウザでアプリのURLにアクセスする．**
http://localhost:8081/todo.htmlのアクセスする．
2. **タスクの追加**
    - 「タスクを入力」欄にタスク名を入力する．
    - 「追加」ボタンをクリックすると，タスクがリストに追加される．
3. **タスクリストの表示**
現在のタスク状況がリスト形式で画面に表示される．

## 管理者の方々用

### サーバの起動
ToDoリストアプリを起動するには以下の手順を実行してください．

1. **app_todo.js ファイルがあるディレクトリで以下のコマンドを実行する**

```bash
node app_todo.js
```
．
2. **サーバがポート8081で起動します．ログに以下のメッセージが表示されます**

```bash
ToDo app listening on port 8081!
```


###　APIエンドポイント
### 概要
　ToDoリストアプリでは，以下の2つのAPIエンドポイントを利用してタスクを操作します．
1. **POST/addTodo**
####　概要
新しいタスクをリストに追加する．
#### リクエスト
・HTTPメソッド ：POST
・URL：/addTodo
・リクエストボディの形式：
```bash
{
    "task":"タスク名"
}
```
#### レスポンス
・ステータスコード：200 OK
・レスポンスボディの形式：
```bash
{
    "message":"Task added",
    "todos":["タスク1","タスク2","タスク3"]
}
```
2. **POST/getTodos**
#### 概要
現在のタスクリストを取得します．
#### リクエスト
・HTTPメソッド：POST
・URL：/getTodos
・リクエストボディ：なし
#### レスポンス
・ステータスコード：200 OK
・レスポンスボディの形式：
```bash
{
    "todos":["タスク1️","タスク2","タスク3"]
}
```

## 開発者の方々用
##　ディレクトリ構造

```bash
プロジェクトルート/
├── app_todo.js        // サーバ側アプリケーション
├── public/            // 静的ファイル
│   ├── todo.html      // クライアントHTML
│   ├── todo.js        // クライアントJavaScript
│   └── todo.css       // スタイルシート
```
## サーバサイドコード
#### app_todo.js
```bash
"use strict";
const express = require("express");
const app = express();
let todos = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));

app.post("/addTodo", (req, res) => {
  const task = req.body.task;
  todos.push(task);
  res.json({ message: "Task added", todos });
});

app.post("/getTodos", (req, res) => {
  res.json({ todos });
});

app.listen(8081, () => console.log("ToDo app listening on port 8081!"));
```
##　クライアントサイドコード
#### todo.html
```bash
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ToDoリスト</title>
    <script src="./todo.js" defer></script>
</head>
<body>
    <h1>ToDoリスト</h1>
    <input type="text" id="task" placeholder="タスクを入力">
    <button id="addTask">追加</button>
    <ul id="todoList"></ul>
</body>
</html>
```
#### todo.js
```bash
"use strict";

document.getElementById("addTask").addEventListener("click", () => {
    const task = document.getElementById("task").value;
    if (!task) return;

    fetch("/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("task").value = "";
        updateList(data.todos);
    });
});

function updateList(todos) {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    todos.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        todoList.appendChild(li);
    });
}
```

## Gitでの管理方法
1. **Gitの初期化**
以下のコマンドを実行して，Gitを初期化する．
```bash
git init
```
addコマンドで変更を一時保存
```bash
git add .
```

2. **commitでディレクトリの変更を登録**

git commitでディレクトリの変更をローカルリポジトリに登録する．
```bash
git commit -m '変更済み'
```

3. **リモートリポジトリと連携させる**
以下のコマンドでリモートリポジトリと連携させる
```bash
git remote add origin <URL名>
```


4. **pushする**
```bush
git push origin main
```
このコマンドで，githubに変更後のコードをpushする．

   


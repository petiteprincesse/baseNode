const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // если метод запроса get - была простая загрузка страницы
  if (req.method === "GET") {
    // принимает статус ответа и объект - ключ/значение хэдера
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    if (req.url === "/") {
      fs.readFile(
        path.join(__dirname, "views", "index.html"),
        "utf-8",
        (err, content) => {
          if (err) {
            throw err;
          }
          // ответ пользователю на запрос
          res.end(content);
        }
      );
    } else if (req.url === "/about") {
      fs.readFile(
        path.join(__dirname, "views", "about.html"),
        "utf-8",
        (err, content) => {
          if (err) {
            throw err;
          }
          // ответ пользователю на запрос
          res.end(content);
        }
      );
    } else if (req.url === "/api/users") {
      res.writeHead(200, {
        "Content-Type": "text/json",
      });

      const users = [
        {name: 'Olenka', age: 21},
        {name: 'Mike', age: 34}
      ];
       
      res.end(JSON.stringify(users));
    }
    // если метод запроса post после клика на submit
  } else if (req.method === "POST") {
    const body = [];
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });

    // поле req наследник класса event emitter, обращаемся к методу on
    // слушаем событие data (буфер) и формируем из буфера массив данных
    req.on("data", (data) => {
      body.push(Buffer.from(data));
    });
    // далее превращаем массив данных в строчку, указывем требуемую кодировку в content-type
    req.on("end", () => {
      const message = body.toString().split("=")[1];

      res.end(`
        <h1>Ваше сообщение: ${message}</h1>
      `);
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running...");
});

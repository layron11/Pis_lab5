const http = require("http");
const fs = require("fs");
const path = require("path");

class Student {
  constructor(login, firstName, lastName, middleName, year, group) {
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.year = year;
    this.group = group;
  }

  toHtml() {
    return `
      <div>
        <h3>${this.firstName} ${this.middleName} ${this.lastName}</h3>
        <p>Логін: ${this.login}</p>
        <p>Курс: ${this.year}</p>
        <p>Група: ${this.group}</p>
      </div>
    `;
  }
}

const student = new Student(
  "is-34fiot-23-162",
  "Богдан",
  "Коваленко",
  "Вадимович",
  "2",
  "ІС-34"
);

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/" || url === "/index.html") {
    const filePath = path.join(__dirname, "pages", "index.html");
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error: ${err.code}`);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });

  } else if (url.startsWith("/student")) {
    const studentParam = url.split("/")[2];
    if (studentParam !== student.login) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Student not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(student.toHtml());
    }

  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

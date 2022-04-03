const fs = require("fs");

const requestHandler = (req, res) => {
  console.log(req.url, req.method, req.headers);
  //process.exit();

  const { url, method } = req;
  if (url === "/") {
    res.write(`
      <html>
      <body>
      <form action="/message" method='POST'>
          <input type='text' name='message' />
          <input type='submit' text='Send'>
      </form>
      </body>
      </html>
      `);

    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunck) => {
      console.log(chunck + "MMZZ");
      body.push(chunck);
    });
    req.on("end", () => {
      const params = Buffer.concat(body).toString();
      const [, message] = params.split("=");
      console.log(message);
    });
    fs.writeFileSync("test.txt", "TEST!!");
    res.writeHead(302, { Location: "/" });
    return res.end();
  }

  //Setting headers of response
  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html><body>
    Test Moataz !!!
    </body></html>
    `);
  // To send the response to client
  res.end();
};

module.exports = requestHandler;

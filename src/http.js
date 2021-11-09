var request = require("request");
var fs = require("fs");

const form_data = {
  file: fs.createReadStream("test.jpg"),
};

const options = {
  url: "https://app.nanonets.com/api/v2/OCR/Model/ca53c1dd-90ef-42da-8e98-650dd81151a8/LabelFile/",
  formData: form_data,
  headers: {
    Authorization:
      "Basic " +
      Buffer.from("bmGw4ITt8JlmzPTrcA5GsuHq4mik68CG" + ":").toString("base64"),
  },
};
request.post(options, function (err, httpResponse, body) {
  console.log(body);
});

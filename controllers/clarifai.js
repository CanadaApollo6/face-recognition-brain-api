const clarifai = require("clarifai");

const app = new clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json("Unable to work with API"));
};

module.exports = {
  handleApiCall,
};

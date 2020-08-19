const clarifai = require("clarifai");

const app = new clarifai.App({
  apiKey: "5d338cb878cc4ee2baa614d0c1a4b159",
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

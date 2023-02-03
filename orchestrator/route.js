const orchestraControl = require('./controllers/orchestraControl');

const route = require('express').Router();

route.get('/',orchestraControl.getAll);
route.post("/", orchestraControl.postOne);
route.get("/identityNumber/:identityNumber", orchestraControl.getOneId);
route.get("/accountNumber/:accountNumber", orchestraControl.getOneAcc);
route.delete("/accountNumber/:accountNumber", orchestraControl.deleteOne);
route.put("/accountNumber/:accountNumber", orchestraControl.editOne);

module.exports = route;
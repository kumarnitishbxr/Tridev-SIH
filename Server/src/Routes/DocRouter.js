const express = require('express')
const { UploadData, GetData} = require('../Controller/DocFunction');
const docRouter = express.Router();
const multer = require("multer");
const authenticateUser = require('../Middleware/authenticateUser')
const authenticateAdmin = require('../Middleware/authenticateAdmin');
const upload = multer({ dest: "uploads/" });



docRouter.post('/upload', authenticateAdmin, upload.single('file') ,UploadData)
docRouter.post('/chat', authenticateUser, GetData)



module.exports = docRouter
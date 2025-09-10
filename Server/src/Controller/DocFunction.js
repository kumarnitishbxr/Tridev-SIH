const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");



const UploadData = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // console.log("Received file:", {
        //     name: req.file.originalname,
        //     path: req.file.path,
        //     mimetype: req.file.mimetype,
        //     size: req.file.size
        // });


        const formData = new FormData();

        formData.append("file", fs.createReadStream(req.file.path), req.file.originalname);

        const response = await axios.post(`${process.env.BASE_URL}/upload`, formData, {
            
            headers: {
                ...formData.getHeaders()
            },
        });

        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if(err){
                    return console.error("Temp file delete failed:", err.message)
                };
            });
        }

        res.json(response.data);

    } catch(err){

        console.error("Upload error:", err.response?.data || err.message);
        res.status(500).json({ 
            error: "Upload failed : " + (err.response?.data?.message || err.message)
        });
    }
}




const GetData =  async (req, res) => {

    try {
        
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        // console.log(question)
        

        const response = await axios.post(`${process.env.BASE_URL}/chat`, {query: question});
        // console.log('response ', response)
        
        if(!response)
            throw new Error('Internal error')
        res.status(200).json({response:response.data});

    } catch (err) {

        console.error("Chat error:", err.response?.data|| err.message);

        res.status(500).json({
            error: "Chat failed" + (err.response?.data?.message || err.message) 
        });
    }
}

module.exports = {UploadData, GetData}

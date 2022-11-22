const express = require("express");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const PORT = process.env.PORT || 4200;

// ADD THIS
var cors = require('cors');
app.use(cors());

const sendMail = async (data) => {
    const from = process.env.FROM;
    const to = process.env.TO;
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORTMAIL,
        secure: process.env.SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
        secureConnection: false,
        tls:{
            ciphers: process.env.CIPHERS,
        },
        service: process.env.SERVICE
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: data.barcode, // subject line

        //attachments
        attachments: [
            {
                filename: "hurtig-img.jpg",
                content: data.img,
                encoding: "base64",
            },
        ],
    });
    // console.log(info);
};

//  app.get("/", (req, res)=> {

//   res.status(200).json({message: "HELLO ALL"});
//  })


app.post("/upload", async (req, res) => {
    try {
        const body = req.body.data;
        console.log("New mail incoming");
        const data = {
            barcode: body.barcode,
            img: img,
        };
        await sendMail(data);
        res.status(200).send("Request completed successfully :)");
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

app.listen(PORT, console.log("app listening at port " + PORT));
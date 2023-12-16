
// credentials = require('./middi/credentials.js');
// const corsOptions = require('./config/corsOptions.js');
const express =require("express")
const path = require("path")
const cors = require("cors")
const app = express()




app.use(express.json())

app.setMaxListeners(15)

// app.use(cors({
//   origin: "http://localhost:3000",
  
// }))

// app.use(cors(corsOptions));

app.use(cors());

   
//  for route


const htmlToPdf = require("./route.js")


app.get('/test', (req, res) => {

  res.status(200).json({staus:true , message:"api is working..."})

});


app.get('/', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'new.html');
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error sending file:', error);
    res.status(500).send('Error sending the file');
  }
});

app.use("/", htmlToPdf)


module.exports = app
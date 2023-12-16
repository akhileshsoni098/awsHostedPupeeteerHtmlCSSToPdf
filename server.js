require("dotenv/config")

const express = require("express")


const app = require("./app");

  

  const port = process.env.PORT || 3001
  
  app.listen(port , ()=>{
      console.log(`App running on port ${port}` )
  })

 

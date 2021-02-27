const express = require("express");
const router = express.Router(); // Call an Instance of the express.Router(), apply Routes to it, and then Tell the Application to use those Routes

// Import the model (user.js) to use its database functions.
const user = require("../models/user.js");


//Get Routes 

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    console.log("Route Path Hit");
    burger.selectAll((data) => {
      handlebarsObject = {
        burger: data
      };
      console.log("Diplayed users");
      res.render("index", handlebarsObject);
    });

});

//Post Routes 

router.post("/api/user", function(req, res) {
  console.log("user Route Hit");
  burger.insertOne(req.body["user_name"],  (result)=>{
    // Send back the ID of the new quote
    console.log(result);
    res.json(result);
  });
});

router.put("/api/user/:id", function(req, res) {

  let userID = req.params.id
  let condition = "id = " + userID ;

  console.log("user Route Hit. ID is "+ userID);
  console.log("Dev is " + req.body.devoured);

  user.updateOne( [req.body.devoured], condition, (result)=>{
    // Send back the ID of the new quote
    console.log("Executing First Declared CallBack");
    res.json(result);
  });
});








// Export routes for server.js to use.
module.exports = router;

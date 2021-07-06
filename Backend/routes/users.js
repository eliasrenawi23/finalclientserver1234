const router = require('express').Router();
const con_mysql = require("../db");
router.route('/').get((req, res) => {

});


router.route('/get_insurance').get((req, res) => {
  console.log('/get_insurance');

  con_mysql.query("SELECT * FROM heroku_9e9c0f583dbaf5b.new_requests;", function (err, result) {
    if (err) throw err;
    res.send(result);
  });

});


router.route('/get_data').post((req, res) => {
  const FirstName = req.body.FirstName;
  console.log('/get_data');
  console.log("FirstName", FirstName);
  con_mysql.query(`SELECT * FROM heroku_9e9c0f583dbaf5b.insurancrequest WHERE FirstName = "${FirstName}"`, function (err, result) {
    if (err) throw err;
    var SEVERITY = "TBD"
    const carstatus = result[0].CarStatus;
    const rank = result[0].UserRank;
    if (carstatus == 'NoClaims') {
      if (rank == 1) {
        SEVERITY = "LOW";
      } else {
        SEVERITY = "High";
      }
    }
    else if (carstatus == 'new_Driver') {
      SEVERITY = "Mid";
    }

    else {
      SEVERITY = "severe";
    }
    con_mysql.query('SET SQL_SAFE_UPDATES = 0;', function (err, result) {
      if (err)
        throw err;
    });
    var sql = `UPDATE heroku_9e9c0f583dbaf5b.new_requests SET SEVERITY="${SEVERITY}",Review = "Reviewed" WHERE FirstName="${FirstName}";`
    con_mysql.query(sql, function (err, result) {
      if (err) throw err;
    });
    con_mysql.query('SET SQL_SAFE_UPDATES = 1;', function (err, result) {
      if (err) throw err;
    });
    res.send(result[0]);


  });




});




router.route('/add_insurance').post((req, res) => {
  const socialNumber = req.body.SocialNumber;
  const firstname = req.body.FirstName;
  const lastname = req.body.Lastname;
  const email = req.body.Email;
  const phone = req.body.phone;
  const PrevCompName = req.body.PrevinsuranceCompanyName;
  const PrevinsuranceID = req.body.PrevinsuranceID;
  const PrevNumber = req.body.Previousinsurancenumber;
  // const insuranceAmount = req.body.insuranceAmountRequested;
  const insuranceAmount = req.body.insuranceAmountRequested;
  let RequestNumber = req.body.RequestNumber;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  console.log(today);
  console.log(req.body);
  console.log(typeof(RequestNumber));
  console.log(RequestNumber);
  // `INSERT INTO heroku_9e9c0f583dbaf5b.new_requests (socialNumber,Lastname, FirstName, Email, Phone, amount, prev_number, prev_id, prev_comp,requestNumber,date,Review)
  // VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,"In Review")`,[socialNumber, lastname, firstname, email, insuranceAmount, PrevCompName, PrevinsuranceID, PrevNumber, request_number1, today]


  con_mysql.query(`INSERT INTO heroku_9e9c0f583dbaf5b.new_requests (socialNumber,Lastname, FirstName, Email, Phone, amount, prev_number, prev_id, prev_comp,requestNumber,date,Review)
  VALUES ("${socialNumber}","${lastname}","${firstname}","${email}","${phone}","${insuranceAmount}","${PrevCompName}","${PrevinsuranceID}","${PrevNumber}","${RequestNumber}","${today}","In Review");`
    , function (err, result) {
      if (err) throw err;
      console.log("new insurance added");
      res.send('New insurance added');

    });
 



});


router.route('/add').post((req, res) => {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email;
  const password = req.body.password;
  const repassword = req.body.repassword;
  console.log(firstname, lastname, email, password, repassword)

  con_mysql.query(`SELECT * FROM heroku_9e9c0f583dbaf5b.users_table WHERE Email = "${email}"`, function (err, result) {
    if (err) throw err;
    user = {
      Email: result.email,
      Password: result.password
    }
    console.log(result);
    if (result.length > 0) {
      res.send('This Email is already in the system');
      return;
    }
  });

  valditateresult = valdiation.validateSignup(firstname, lastname, email, password, repassword);
  if (valditateresult != "") {
    res.send(valditateresult);
    return;
  }
  con_mysql.query(`INSERT INTO heroku_9e9c0f583dbaf5b.users_table(Email, first_name, last_name, password) VALUES("${email}", "${firstname}", "${lastname}", "${password}")`, function (err, result) {
    if (err) throw err;
    user = {
      Email: result.email,
      Password: result.password
    }
    res.send('New user Registered Successfully');
  });

});

router.route('/getuser').post((req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  console.log(email + " " + password);

  con_mysql.query(`SELECT password FROM heroku_9e9c0f583dbaf5b.users_table WHERE Email = "${email}"`, function (err, result) {
    if (err) throw err;
    user = {
      Email: email,
      Password: result.password
    }

    res.json(user);

  });


});

module.exports = router;
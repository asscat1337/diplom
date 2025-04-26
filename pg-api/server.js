let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
// let cors = require('cors');

const PORT = 5174;

let pool = new pg.Pool({
  port: 5432,
  password: "m1n0r.Dm",
  database: "diplom",
  max: 10,
  host: "localhost",
  user: "postgres",
});

let app = express();
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// запросы 
pool.connect((err, db, done) => {
    if (err) { return console.log(err); }
    else {
        db.query("SELECT * FROM tanks limit 100", (err, table) => {
            done();
            
            if (err) { return console.log(err); }
            else {
                console.log(table.rows);
            }
        })
    }

})
// app.get("/api/levels", function (req, res) {
//   pool.connect(function (err, db, done) {
//     if (err) {
//       return res.status(400).send(err);
//     } else {
//       db.query("SELECT * FROM levels", function (err, table) {
//         done();

//         if (err) {
//           return res.status(400).send(err);
//         } else {
//           return res.status(200).send(table.rows);
//         }
//       });
//     }
//   });
// });

app.listen(PORT, () => console.log("Listening on port " + PORT));
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('public'));

//context.callbackWaitsForEmptyEventLoop = false
   //secureConnectBundle: "/home/pop-os/kassandra/secure-connect-art.zip",
const { Client } = require("cassandra-driver");

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/elopments', (req ,res) => {
  res.render('developments');
});

app.get('/mercury', (req ,res) => {
  res.render('mercury');
});

app.post('/posting', (req, res) => {

  const client = new Client({
    cloud: {
    secureConnectBundle: 'secure-connect-art.zip',
    },
    credentials: {
    username: "vUEytCxkTZMFcTnyhBZBTygB",
    password: "rdGTT8iZUt7pTffZdYSGhSWDHZlaJz_ky0g+rMT5jEI+D7Kc05eIUP9eQ1nKaKP8q7bMabcAk+o.wPLZDHrhrm.-8r3i_5Pzo4Qp_9h29y7LWBSFucC_afX1lJ9cu6JZ",
    },
  });



  let ray = req.body.scale;

  let str = "";

  for (let i = 0; i < ray.length; i++) {
    if (i === ray.length-1) {
      str += "'" + ray[i].trim() + "'";
    } else {
      str += "'" + ray[i].trim() + '\',';
    }
  }


console.log(str)


  async function run() {

    await client.connect();
  
  const query = await client.execute(`INSERT INTO music.scales (id, name, creator, notes) VALUES (now(), '${req.body.creator}', '${req.body.name}',[${str}]);`);
  
    await client.shutdown();
  }
  
  run();
  
});

app.get('/getting', (req, res) => {

  const client = new Client({
    cloud: {
    secureConnectBundle: "secure-connect-art.zip",
    },
    credentials: {
    username: "vUEytCxkTZMFcTnyhBZBTygB",
    password: "rdGTT8iZUt7pTffZdYSGhSWDHZlaJz_ky0g+rMT5jEI+D7Kc05eIUP9eQ1nKaKP8q7bMabcAk+o.wPLZDHrhrm.-8r3i_5Pzo4Qp_9h29y7LWBSFucC_afX1lJ9cu6JZ",
    },
  });
  

  async function run() {

  client.connect();
  
  const query = await client.execute("SELECT * FROM music.scales;");

  res.send({data: query.rows});

  await client.shutdown();

  }
  
  run();
  

  

});


const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

//const rs = await client.execute("INSERT INTO music.shit (id, orientation, food) VALUES (now(), 'bi', 'pancakes');");

const express = require("express");
const app = express();
app.use(express.json());

//définit le nombre de dés lancés
const rolls = 5;
//arrray stockant les résultats
let results = [];

//variable utilisée pour la vérification du dé lancé
let result;

//fct générant la face du dé
const rollingDice = () => {
  let dice = Math.floor(Math.random() * 6);

  if (dice > 0) {
    result = dice;
  } else {
    rollingDice();
  }

  return result;
};

app.get("/", (req, res) => {
  const { url } = req;
  for (let i = 0; i < rolls; i++) {
    //réinitialise le tableau à chaque début de partie
    if (i === 0) results = [];

    //appelle la fct qui gère la génération du dé
    const result = rollingDice();
    results = [...results, result];
  }

  res.send(
    `Hello world, this is the ${
      url === "/" ? "home" : url
    } page ! Your yams score is ${results}`
  );
});

app.listen(3000, () => console.log("Listenning on port 3000..."));

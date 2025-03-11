// importTickets.js
// Ce script lit le fichier tickets.json (contenant une propriété "data" avec un tableau de tickets)
// et insère chacun d'eux dans la collection "ticket" de la base "thetiptop".
// Pour exécuter ce script, lance : node importTickets.js

const fs = require('fs');
const mongoose = require('mongoose');

// Charger le modèle Ticket.
// Assure-toi que ton modèle autorise participantId à être null ou le supprimer lors de l'insertion.
const Ticket = require('./models/Ticket');

// Connexion à MongoDB (adapter l'URI si besoin)
mongoose.connect('mongodb://root:password@tip_top_mongodb:27017/tip_top_game?authSource=admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connecté à MongoDB');
    // Lire le fichier JSON contenant les tickets
    fs.readFile('./tickets.json', 'utf8', async (err, data) => {
      if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        process.exit(1);
      }
      try {
        // On suppose que le fichier a la structure : { "data": [ { "ID": "...", "Code": "...", "Lot": "...", "Libelle": "..." }, ... ] }
        const jsonData = JSON.parse(data);
        const ticketsArray = jsonData.data;
        
        // Préparer les documents à insérer dans la collection "ticket"
        // Ici, on ne conserve que le code et on définit used à false.
        // (Si tu veux conserver Lot et Libelle, ajoute-les selon tes besoins.)
        const ticketsToInsert = ticketsArray.map(ticket => ({
          // On mappe "Code" vers le champ "code" de notre modèle
          code: ticket.Code,
          // On peut stocker les infos supplémentaires dans d'autres champs si nécessaire
          lot: ticket.Lot,        // Assure-toi que ton modèle les accepte (sinon, ajuste ton schema)
          libelle: ticket.Libelle, // idem
          used: false,
          participantId: null, // Si ton schéma nécessite ce champ, sinon supprime-le
          createdAt: new Date()
        }));

        // Insertion en masse
        const result = await Ticket.insertMany(ticketsToInsert, { ordered: false });
        console.log(`${result.length} tickets insérés avec succès`);
        process.exit(0);
      } catch (parseErr) {
        console.error('Erreur lors du parsing du JSON:', parseErr);
        process.exit(1);
      }
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
    process.exit(1);
  });

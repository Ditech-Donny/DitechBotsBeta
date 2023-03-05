// Fonction de chargement des événements
function ChargementEvenements(client) {
    const fs = require("fs");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Evenements", "Statut")

    // Récupération des dossiers contenant les événements
    const dossiers = fs.readdirSync(`./Sources/Evenements`);

    // Parcours des dossiers et fichiers pour charger les événements
    for (const dossier of dossiers) {
        const fichiers = fs.readdirSync(`./Sources/Evenements/${dossier}`).filter((fichier) => fichier.endsWith(".js"))

        for (const fichier of fichiers) {
            // Importation de l'événement
            const evenement = require(`../../Sources/Evenements/${dossier}/${fichier}`);

            // Enregistrement de l'événement selon son type et sa fréquence
            if (evenement.rest) {
                if (evenement.once) 
                    client.rest.once(evenement.name, (...args) => evenement.execute(...args, client));
                else
                    client.rest.on(evenement.name, (...args) => evenement.execute(...args, client));
            } else {
                if (evenement.once)
                    client.once(evenement.name, (...args) => evenement.execute(...args, client));
                else 
                    client.on(evenement.name, (...args) => evenement.execute(...args, client));
            }

            // Ajout d'une ligne dans le tableau de suivi des événements chargés
            table.addRow(fichier, "✅");
        }
    }

    // Affichage du tableau de suivi des événements chargés
    console.log(table.toString(), `\nEvenements chargées avec succés !`);
}

// Exportation de la fonction de chargement des événements
module.exports = { ChargementEvenements };

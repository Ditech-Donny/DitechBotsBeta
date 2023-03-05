function ChargementCommandes(client) {
    const fs = require('fs');
    const ascii = require('ascii-table')
    const table = new ascii().setHeading("Commandes", "Statut")

    let TableauCommandes = [];

    const dossiers = fs.readdirSync("./Sources/Commandes")
    for (const dossier of dossiers) {
        const fichiers = fs.readdirSync(`./Sources/Commandes/${dossier}`).filter((fichier) => fichier.endsWith(".js"));

        for (const fichier of fichiers) {
            const commande = require(`../Commandes/${dossier}/${fichier}`);

            client.commands.set(commande.data.name, commande);

            TableauCommandes.push(commande.data.toJSON());

            table.addRow(fichier, "✅")
            continue;
        }
    }

    client.application.commands.set(TableauCommandes)

    return console.log(table.toString(), `\nCommandes chargées avec succès !`)
}

module.exports = { ChargementCommandes }
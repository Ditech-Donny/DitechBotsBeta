// Importation des modules nécessaires
const { Client, ActivityType, PresenceUpdateStatus } = require("discord.js");
const { version } = require("../../../package.json");

// Exportation de l'événement "ready"
module.exports = {
    name: "ready",
    once: true,

    /**
     * Fonction exécutée lorsque le bot est prêt
     * @param {Client} client - Le client Discord.js
     */
    async execute(client) {
        // Affichage d'un message dans la console
        console.log(`${client.user.username} est connecté !`);

        // Mise à jour de la présence du bot
        client.user.setPresence({ 
            activities: [{ name: `la version ${version}`, type: ActivityType.Playing }], 
            status: `${PresenceUpdateStatus.Idle}`
        });
    }
}

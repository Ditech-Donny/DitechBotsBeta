const { Client, CommandInteraction, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "interactionCreate", // Nom de l'événement à gérer

    /**
     * @param {Client} client - Le client Discord.js
     * @param {CommandInteraction} interaction - L'interaction de commande
     */

    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return; // Vérifier si l'interaction est une commande de chat

        const command = client.commands.get(interaction.commandName); // Récupérer la commande

        if (!command) { // Vérifier si la commande existe
            const errorEmbed = new EmbedBuilder()
                .setDescription(`❌ | Commande inexistante`) // Embed d'erreur
                .setColor(client.config.embed.couleur)//Embed d'erreur
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true }); // Répondre avec l'embed d'erreur
        }

        try {
            await command.execute(interaction, client); // Exécuter la commande
        } catch (error) {
            console.error(error);
            const errorEmbed = new EmbedBuilder()
                .setDescription(`❌ | Une erreur est survenue lors de l'exécution de la commande`) // Embed d'erreur
                .setColor(client.config.embed.couleur) //Embed d'erreur
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true }); // Répondre avec l'embed d'erreur
        }
    }
}

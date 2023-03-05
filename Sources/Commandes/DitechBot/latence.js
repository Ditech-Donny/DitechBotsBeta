const { SlashCommandBuilder, ChannelSelectMenuInteraction, EmbedBuilder, Client, PermissionFlagsBits } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("latence") // Nom de la commande
    .setDescription("Affiche la latence du bot") // Description de la commande
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Permissions par défaut de la commande

  /**
   * @param {ChannelSelectMenuInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    // Création de l'embed qui affiche la latence du bot
    const reponse = new EmbedBuilder()
      .setDescription(`✅ | La latence du bot est à ${client.ws.ping}ms`) // Message à afficher dans l'embed
      .setColor(client.config.embed.couleur)

    // Envoi de la réponse de la commande
    interaction.reply({ embeds: [reponse], ephemeral: true})
    // - { embeds: [reponse] } : contenu de la réponse sous forme d'embed
    // - { ephemeral: true } : le message sera visible uniquement pour l'utilisateur qui a exécuté la commande
  }
}

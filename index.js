// Importation des modules nécessaires
const { Client, GatewayIntentBits, Partials, Collection} = require("discord.js");

// Définition des intents et partials requis pour le bot
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, ThreadMember, GuildMember } = Partials

// Chargement des gestionnaires d'événements et de commandes
const { ChargementEvenements } = require('./Sources/Gestionnaire/evenements')
const { ChargementCommandes } = require('./Sources/Gestionnaire/commandes');

// Création de l'instance du client Discord
const client = new Client({
    intents: [ Guilds, GuildMembers, GuildMessages], // intents requis pour le bot
    partials: [ User, Message, ThreadMember, GuildMember ] // partials requis pour le bot
})

// Création d'une collection pour stocker les commandes du bot
client.commands = new Collection()

// Chargement de la configuration du bot
client.config = require('./config.js')

// Connexion du client à l'API Discord et chargement des événements et commandes
client.login(client.config.bot.token).then(() =>{
    ChargementEvenements(client)
    ChargementCommandes(client)
})

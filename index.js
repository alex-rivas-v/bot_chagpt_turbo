"use strict";

const { Telegraf } = require( 'telegraf' );
const { Configuration, OpenAIApi } = require( 'openai' );

// APIs
const API_TELEGRAM = 'API_TELEGRAM';
const API_OPENAI = 'API_OPENAI';

// Iniciamos Bot de Telegram
const bot = new Telegraf( API_TELEGRAM );

// Definimos el tono del bot y algunas reglas
const lastMessages = [
    { role: 'system', content: 'You are a helpful assistant.' }
];

// Mensaje que se muestra al iniciar el Chat
bot.start(( chat ) => {
    chat.reply('¡Hola! ¿En qué puedo ayudarte?');
});

// Escuchamos las peticiones del usuario.
bot.on( 'message', async ( chat ) => {
    let reply = "";

    // Recuperamos el mensaje del usuario.
    let message = chat.message.text;

    // Filtramos el mensaje '/start' que inicia el chat
    if (message.toString().toLowerCase() === '/start') {
        return;
    }

    // Guardamos el mensaje en el array para darle contexto al bot.
    lastMessages.push( { role: 'user', content: message });

    // Conectamos con la api de Open AI.
    const config = new Configuration({
        apiKey: API_OPENAI
    });
    const openai = new OpenAIApi( config );

    // Genera la respuesta usando la API de OpenAI
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: lastMessages
    });

    // Envía la respuesta al usuario
    reply = response.data.choices[0].message['content'];

    chat.reply( reply );

    // Guardamos la respuesta.
    lastMessages.push( 
        { role: 'assistant', content: reply }
    );

    // Si los mensajes guardados son mas de 10, eliminamos el primero.
    if( lastMessages.length > 10 ){
        lastMessages.slice( 1, 1 );
    }

});

// Inicia el bot
bot.launch();

# bot_chatgpt_turbo

# Introducción

Recientemente, Open AI ha liberado el modelo de chat gpt-3.5-turbo, que es el que se usa para ChatGPT.

La idea de bot_chatgpt_turbo es crear un bot que permita contestar como si de ChatGPT se tratará. Incluso recordando parte de la conversación.

# Instalación

Crea un bot en telegram mediante el usuario @BotFather, quién te dará la API para telegram.

Descarga este repositorio e instala sus dependencias con el comando:

`npm install`

En el archivo index.js tienes que agregar tanto la API de Telegram como la de OpenAI.

# Ejecución

`node index.js`

# Resultado

Una vez que el bot esté corriendo, iniciar conversación con él.

Solo tiene la posibilidad de recordar las últimas 5 preguntas y respuestas.

Se puede establecer el tono del bot en la declaración de lastMessage:

``` js
const lastMessages = [
    { role: 'system', content: 'You are a helpful assistant.' }
];
```

Eso es todo. El bot utiliza la API de Open AI, por lo que es importante considerar que esto **consume creditos de tu cuenta.**
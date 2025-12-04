import express from 'express'
import axios from 'axios'
import 'dotenv/config'

// Crear la aplicación Express
const app = express()

// Middleware para procesar el cuerpo en formato JSON
app.use(express.json())

// Configuración de variables de entorno
const port = process.env.PORT || 3000
const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN // Token de verificación
const apiToken = process.env.API_TOKEN // Token de acceso de WhatsApp
const apiVersion = process.env.API_VERSION || 'v19.0' // Versión de la API (por defecto 'v19.0')

// Ruta para GET (verificación del webhook)
app.get('/', (req, res) => {
  const {
    'hub.mode': mode,
    'hub.challenge': challenge,
    'hub.verify_token': token
  } = req.query

  // Verificar el token y responder con el challenge
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED')
    res.status(200).send(challenge) // Responde con el challenge
  } else {
    console.log('Token de verificación incorrecto')
    res.status(403).end() // Si el token no coincide
  }
})

// Ruta para POST (procesamiento de mensajes entrantes)
app.post('/', (req, res) => {
  const data = req.body // Cuerpo de la solicitud

  // Verificar la estructura del payload
  console.log('Webhook recibido:', JSON.stringify(data, null, 2))

  // Extraer el número de teléfono y el mensaje
  const userNumber = data.entry[0].changes[0].value.messages[0].from
  const messageText = data.entry[0].changes[0].value.messages[0].text.body
  const phoneId = data.entry[0].changes[0].value.metadata.phone_number_id

  console.log(`Mensaje recibido de: ${userNumber}`)
  console.log(`Mensaje: ${messageText}`)

  // Enviar el mensaje de eco
  sendMessage(userNumber, messageText, phoneId)

  // Responder con éxito
  res.status(200).end()
})

// Función para enviar un mensaje de eco
const sendMessage = (to, messageText, phoneId) => {
  const url = `https://graph.facebook.com/${apiVersion}/${phoneId}/messages`

  const payload = {
    messaging_product: 'whatsapp',
    to: to,
    type: 'text',
    text: { body: `Eco: ${messageText}` }
  }

  // Realizar la solicitud a la API de WhatsApp
  axios
    .post(url, payload, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('Mensaje enviado exitosamente')
    })
    .catch((error) => {
      console.error(
        'Error al enviar mensaje:',
        error.response ? error.response.data : error
      )
    })
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`)
})

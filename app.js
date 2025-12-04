import express from 'express'
import axios from 'axios'
import 'dotenv/config'

// Crear la aplicación Express
const app = express()

// Middleware para procesar el cuerpo en formato JSON
app.use(express.json())

// Configuración de variables de entorno
const port = process.env.PORT || 3000
const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN
const apiToken = process.env.API_TOKEN
const bussinessPhone = process.env.BUSINESS_PHONE
const apiVersion = process.env.API_VERSION

// Ruta para GET (verificación)
app.get('/', (req, res) => {
  const {
    'hub.mode': mode,
    'hub.challenge': challenge,
    'hub.verify_token': token
  } = req.query

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED')
    res.status(200).send(challenge)
  } else {
    res.status(403).end()
  }
})

// Ruta para POST (procesamiento de mensajes)
app.post('/', (req, res) => {
  const data = req.body
  const userNumber = data.entry[0].changes[0].value.messages[0].from
  const messageText = data.entry[0].changes[0].value.messages[0].text.body
  const phoneId = data.entry[0].changes[0].value.metadata.phone_number_id

  console.log(`Mensaje recibido de: ${userNumber}`)
  console.log(`Mensaje: ${messageText}`)

  sendMessage(userNumber, messageText, phoneId)
  res.status(200).end()
})

// Función para enviar el mensaje de eco
const sendMessage = (to, messageText, phoneId) => {
  const url = `https://graph.facebook.com/v19.0/${phoneId}/messages`

  const payload = {
    messaging_product: 'whatsapp',
    to: to,
    type: 'text',
    text: { body: `Eco: ${messageText}` }
  }

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
      console.error('Error al enviar mensaje:', error)
    })
}

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`)
})

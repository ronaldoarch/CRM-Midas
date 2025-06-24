// Defina um token secreto para validar as requisições do webhook
const SECRET_TOKEN = process.env.WEBHOOK_SECRET_TOKEN || 'seu_token_secreto_aqui'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  // Validação do token (pode vir em header ou no body)
  const token = req.headers['x-webhook-token'] || req.body.token
  if (token !== SECRET_TOKEN) {
    return res.status(401).json({ error: 'Token inválido' })
  }

  // Aqui você pode processar o evento recebido
  const event = req.body
  console.log('Evento recebido do webhook:', event)

  // TODO: Salvar no banco, disparar ações, etc.

  return res.status(200).json({ success: true })
} 
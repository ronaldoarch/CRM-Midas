// Defina um token secreto para validar as requisições do webhook
const SECRET_TOKEN = process.env.WEBHOOK_SECRET_TOKEN || 'seu_token_secreto_aqui'

import { saveUser, saveDeposit, saveWithdrawal, saveBet } from '../../lib/crmActions'

export default function handler(req: any, res: any) {
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

  // Processamento dos eventos
  switch (event.event) {
    case 'user_registered':
      saveUser(event.data)
      break
    case 'deposit_made':
      saveDeposit(event.data)
      break
    case 'withdrawal_made':
      saveWithdrawal(event.data)
      break
    case 'bet_placed':
      saveBet(event.data)
      break
    default:
      console.log('Evento desconhecido:', event.event)
  }

  return res.status(200).json({ success: true })
} 
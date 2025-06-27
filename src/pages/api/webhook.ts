// Defina um token secreto para validar as requisições do webhook
const SECRET_TOKEN = process.env.WEBHOOK_SECRET_TOKEN || 'seu_token_secreto_aqui'

import { saveUser, saveDeposit, saveWithdrawal, saveBet } from '../../lib/crmActions'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  // Validação do token removida temporariamente para teste
  // const token = req.headers['x-webhook-token'] || req.body.token
  // if (token !== SECRET_TOKEN) {
  //   return res.status(401).json({ error: 'Token inválido' })
  // }

  const event = req.body
  console.log('Evento recebido do webhook:', event)

  switch (event.event) {
    case 'novo':
      await saveUser(event)
      break
    case 'deposit_made':
      await saveDeposit(event.data)
      break
    case 'withdrawal_made':
      await saveWithdrawal(event.data)
      break
    case 'bet_placed':
      await saveBet(event.data)
      break
    default:
      console.log('Evento desconhecido:', event.event)
  }

  return res.status(200).json({ success: true })
} 
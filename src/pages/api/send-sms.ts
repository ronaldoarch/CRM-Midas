// Endpoint de API para envio de SMS
import SMSService from '../../services/smsService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    const smsData = req.body;
    const result = await SMSService.sendSMS(smsData);
    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Erro ao enviar SMS' });
  }
} 
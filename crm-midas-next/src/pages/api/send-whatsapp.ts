// Endpoint de API para envio de WhatsApp
import WhatsAppService from '../../services/whatsappService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    const whatsappData = req.body;
    const result = await WhatsAppService.sendWhatsApp(whatsappData);
    return res.status(200).json({ success: true, result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Erro ao enviar WhatsApp' });
  }
} 
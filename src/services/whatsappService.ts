import twilio from 'twilio';

// Configurar Twilio WhatsApp
const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = import.meta.env.VITE_TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Sandbox padrão

let twilioClient: twilio.Twilio | null = null;

if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

export interface WhatsAppData {
  to: string;
  body: string;
  from?: string;
  mediaUrl?: string;
}

export class WhatsAppService {
  /**
   * Envia uma mensagem WhatsApp individual
   */
  static async sendWhatsApp(whatsappData: WhatsAppData): Promise<boolean> {
    try {
      if (!twilioClient) {
        console.warn('Twilio não configurado');
        return false;
      }

      const fromNumber = whatsappData.from || TWILIO_WHATSAPP_NUMBER;
      const toNumber = whatsappData.to.startsWith('whatsapp:') 
        ? whatsappData.to 
        : `whatsapp:${whatsappData.to}`;

      const messageData: any = {
        body: whatsappData.body,
        from: fromNumber,
        to: toNumber,
      };

      // Adiciona media se fornecida
      if (whatsappData.mediaUrl) {
        messageData.mediaUrl = [whatsappData.mediaUrl];
      }

      const message = await twilioClient.messages.create(messageData);

      console.log(`WhatsApp enviado com sucesso para: ${whatsappData.to} (SID: ${message.sid})`);
      return true;
    } catch (error) {
      console.error('Erro ao enviar WhatsApp:', error);
      return false;
    }
  }

  /**
   * Envia múltiplas mensagens WhatsApp em lote
   */
  static async sendBulkWhatsApp(bulkData: any): Promise<{ success: number; failed: number }> {
    try {
      if (!twilioClient) {
        console.warn('Twilio não configurado');
        return { success: 0, failed: bulkData.messages.length };
      }

      const fromNumber = TWILIO_WHATSAPP_NUMBER;

      const promises = bulkData.messages.map(whatsappData => {
        const toNumber = whatsappData.to.startsWith('whatsapp:') 
          ? whatsappData.to 
          : `whatsapp:${whatsappData.to}`;

        const messageData: any = {
          body: whatsappData.body,
          from: fromNumber,
          to: toNumber,
        };

        if (whatsappData.mediaUrl) {
          messageData.mediaUrl = [whatsappData.mediaUrl];
        }

        return twilioClient!.messages.create(messageData)
          .then(() => true)
          .catch(() => false);
      });

      const results = await Promise.all(promises);
      const success = results.filter(Boolean).length;
      const failed = results.length - success;

      console.log(`WhatsApp em lote enviados: ${success} sucessos, ${failed} falhas`);
      return { success, failed };
    } catch (error) {
      console.error('Erro ao enviar WhatsApp em lote:', error);
      return { success: 0, failed: bulkData.messages.length };
    }
  }

  /**
   * Envia notificação WhatsApp
   */
  static async sendNotification(to: string, message: string): Promise<boolean> {
    return this.sendWhatsApp({
      to,
      body: `🎰 Casino CRM: ${message}`,
    });
  }

  /**
   * Envia mensagem de campanha WhatsApp
   */
  static async sendCampaignWhatsApp(to: string, campaignMessage: string): Promise<boolean> {
    return this.sendWhatsApp({
      to,
      body: campaignMessage,
    });
  }

  /**
   * Envia mensagem com imagem
   */
  static async sendImageMessage(to: string, message: string, imageUrl: string): Promise<boolean> {
    return this.sendWhatsApp({
      to,
      body: message,
      mediaUrl: imageUrl,
    });
  }

  /**
   * Valida se um número de WhatsApp é válido
   */
  static isValidWhatsAppNumber(phoneNumber: string): boolean {
    // Remove todos os caracteres não numéricos
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Verifica se tem pelo menos 10 dígitos (formato internacional)
    return cleanNumber.length >= 10;
  }

  /**
   * Formata número para formato WhatsApp
   */
  static formatWhatsAppNumber(phoneNumber: string): string {
    // Remove todos os caracteres não numéricos
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Se não começar com +, adiciona o código do Brasil (+55)
    if (!phoneNumber.startsWith('+')) {
      return `+55${cleanNumber}`;
    }
    
    return phoneNumber;
  }

  /**
   * Verifica o status de uma mensagem WhatsApp enviada
   */
  static async getMessageStatus(messageSid: string): Promise<string | null> {
    try {
      if (!twilioClient) {
        return null;
      }

      const message = await twilioClient.messages(messageSid).fetch();
      return message.status;
    } catch (error) {
      console.error('Erro ao verificar status do WhatsApp:', error);
      return null;
    }
  }

  /**
   * Verifica se o número está inscrito no WhatsApp (para sandbox)
   */
  static async isSubscribed(to: string): Promise<boolean> {
    try {
      if (!twilioClient) {
        return false;
      }

      const toNumber = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
      
      // Tenta enviar uma mensagem de teste
      const message = await twilioClient.messages.create({
        body: 'Teste de inscrição',
        from: TWILIO_WHATSAPP_NUMBER,
        to: toNumber,
      });

      return message.status !== 'failed';
    } catch (error) {
      console.error('Erro ao verificar inscrição WhatsApp:', error);
      return false;
    }
  }
}

export default WhatsAppService; 
import twilio from 'twilio';

// Configurar Twilio
const TWILIO_ACCOUNT_SID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = import.meta.env.VITE_TWILIO_PHONE_NUMBER;

let twilioClient: twilio.Twilio | null = null;

if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

export interface SMSData {
  to: string;
  body: string;
  from?: string;
}

export interface BulkSMSData {
  messages: SMSData[];
}

export class SMSService {
  /**
   * Envia um SMS individual
   */
  static async sendSMS(smsData: SMSData): Promise<boolean> {
    try {
      if (!twilioClient) {
        console.warn('Twilio não configurado');
        return false;
      }

      const fromNumber = smsData.from || TWILIO_PHONE_NUMBER;
      
      if (!fromNumber) {
        console.error('Número de telefone remetente não configurado');
        return false;
      }

      const message = await twilioClient.messages.create({
        body: smsData.body,
        from: fromNumber,
        to: smsData.to,
      });

      console.log(`SMS enviado com sucesso para: ${smsData.to} (SID: ${message.sid})`);
      return true;
    } catch (error) {
      console.error('Erro ao enviar SMS:', error);
      return false;
    }
  }

  /**
   * Envia múltiplos SMS em lote
   */
  static async sendBulkSMS(bulkData: BulkSMSData): Promise<{ success: number; failed: number }> {
    try {
      if (!twilioClient) {
        console.warn('Twilio não configurado');
        return { success: 0, failed: bulkData.messages.length };
      }

      const fromNumber = TWILIO_PHONE_NUMBER;
      
      if (!fromNumber) {
        console.error('Número de telefone remetente não configurado');
        return { success: 0, failed: bulkData.messages.length };
      }

      const promises = bulkData.messages.map(smsData =>
        twilioClient!.messages.create({
          body: smsData.body,
          from: fromNumber,
          to: smsData.to,
        }).then(() => true).catch(() => false)
      );

      const results = await Promise.all(promises);
      const success = results.filter(Boolean).length;
      const failed = results.length - success;

      console.log(`SMS em lote enviados: ${success} sucessos, ${failed} falhas`);
      return { success, failed };
    } catch (error) {
      console.error('Erro ao enviar SMS em lote:', error);
      return { success: 0, failed: bulkData.messages.length };
    }
  }

  /**
   * Envia SMS de notificação
   */
  static async sendNotification(to: string, message: string): Promise<boolean> {
    return this.sendSMS({
      to,
      body: `🎰 Casino CRM: ${message}`,
    });
  }

  /**
   * Envia SMS de campanha
   */
  static async sendCampaignSMS(to: string, campaignMessage: string): Promise<boolean> {
    return this.sendSMS({
      to,
      body: campaignMessage,
    });
  }

  /**
   * Valida se um número de telefone é válido
   */
  static isValidPhoneNumber(phoneNumber: string): boolean {
    // Remove todos os caracteres não numéricos
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Verifica se tem pelo menos 10 dígitos (formato internacional)
    return cleanNumber.length >= 10;
  }

  /**
   * Formata número de telefone para formato internacional
   */
  static formatPhoneNumber(phoneNumber: string): string {
    // Remove todos os caracteres não numéricos
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Se não começar com +, adiciona o código do Brasil (+55)
    if (!phoneNumber.startsWith('+')) {
      return `+55${cleanNumber}`;
    }
    
    return phoneNumber;
  }

  /**
   * Verifica o status de um SMS enviado
   */
  static async getMessageStatus(messageSid: string): Promise<string | null> {
    try {
      if (!twilioClient) {
        return null;
      }

      const message = await twilioClient.messages(messageSid).fetch();
      return message.status;
    } catch (error) {
      console.error('Erro ao verificar status do SMS:', error);
      return null;
    }
  }
}

export default SMSService; 
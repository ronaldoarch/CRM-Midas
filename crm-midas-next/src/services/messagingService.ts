import EmailService from './emailService';
import SMSService from './smsService';
import WhatsAppService from './whatsappService';

export interface PlayerContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  segment?: string;
}

export interface CampaignMessage {
  subject?: string;
  emailBody?: string;
  smsBody?: string;
  whatsappBody?: string;
  templateId?: string;
  dynamicData?: Record<string, any>;
}

export interface CampaignResult {
  email: { success: number; failed: number };
  sms: { success: number; failed: number };
  whatsapp: { success: number; failed: number };
  total: { success: number; failed: number };
}

export class MessagingService {
  /**
   * Envia campanha para um jogador específico
   */
  static async sendCampaignToPlayer(
    player: PlayerContact,
    message: CampaignMessage
  ): Promise<{ email: boolean; sms: boolean; whatsapp: boolean }> {
    const results = {
      email: false,
      sms: false,
      whatsapp: false,
    };

    // Enviar e-mail
    if (player.email && message.emailBody && EmailService.isValidEmail(player.email)) {
      results.email = await EmailService.sendEmail({
        to: player.email,
        subject: message.subject || 'Mensagem do Casino',
        html: message.emailBody,
        templateId: message.templateId,
        dynamicTemplateData: message.dynamicData,
      });
    }

    // Enviar SMS
    if (player.phone && message.smsBody && SMSService.isValidPhoneNumber(player.phone)) {
      const formattedPhone = SMSService.formatPhoneNumber(player.phone);
      results.sms = await SMSService.sendCampaignSMS(formattedPhone, message.smsBody);
    }

    // Enviar WhatsApp
    if (player.whatsapp && message.whatsappBody && WhatsAppService.isValidWhatsAppNumber(player.whatsapp)) {
      const formattedWhatsApp = WhatsAppService.formatWhatsAppNumber(player.whatsapp);
      results.whatsapp = await WhatsAppService.sendCampaignWhatsApp(formattedWhatsApp, message.whatsappBody);
    }

    return results;
  }

  /**
   * Envia campanha para múltiplos jogadores
   */
  static async sendBulkCampaign(
    players: PlayerContact[],
    message: CampaignMessage
  ): Promise<CampaignResult> {
    let emailSuccess = 0, emailFailed = 0;
    let smsSuccess = 0, smsFailed = 0;
    let whatsappSuccess = 0, whatsappFailed = 0;

    for (const player of players) {
      // E-mail
      if (player.email && message.emailBody && EmailService.isValidEmail(player.email)) {
        const result = await EmailService.sendEmail({
          to: player.email,
          subject: message.subject || 'Mensagem do Casino',
          html: message.emailBody,
          templateId: message.templateId,
          dynamicTemplateData: message.dynamicData,
        });
        result ? emailSuccess++ : emailFailed++;
      }
      // SMS
      if (player.phone && message.smsBody && SMSService.isValidPhoneNumber(player.phone)) {
        const formattedPhone = SMSService.formatPhoneNumber(player.phone);
        const result = await SMSService.sendCampaignSMS(formattedPhone, message.smsBody);
        result ? smsSuccess++ : smsFailed++;
      }
      // WhatsApp
      if (player.whatsapp && message.whatsappBody && WhatsAppService.isValidWhatsAppNumber(player.whatsapp)) {
        const formattedWhatsApp = WhatsAppService.formatWhatsAppNumber(player.whatsapp);
        const result = await WhatsAppService.sendCampaignWhatsApp(formattedWhatsApp, message.whatsappBody);
        result ? whatsappSuccess++ : whatsappFailed++;
      }
    }

    return {
      email: { success: emailSuccess, failed: emailFailed },
      sms: { success: smsSuccess, failed: smsFailed },
      whatsapp: { success: whatsappSuccess, failed: whatsappFailed },
      total: { success: emailSuccess + smsSuccess + whatsappSuccess, failed: emailFailed + smsFailed + whatsappFailed },
    };
  }

  /**
   * Envia notificação de alerta para um jogador
   */
  static async sendAlertToPlayer(
    player: PlayerContact,
    alertMessage: string
  ): Promise<{ email: boolean; sms: boolean; whatsapp: boolean }> {
    const results = {
      email: false,
      sms: false,
      whatsapp: false,
    };

    const message = {
      subject: '🚨 Alerta do Casino',
      emailBody: `<h2>Alerta Importante</h2><p>${alertMessage}</p>`,
      smsBody: `🚨 ${alertMessage}`,
      whatsappBody: `🚨 *Alerta Importante*\n\n${alertMessage}`,
    };

    if (player.email) {
      results.email = await EmailService.sendEmail({
        to: player.email,
        subject: message.subject,
        html: message.emailBody,
      });
    }

    if (player.phone) {
      const formattedPhone = SMSService.formatPhoneNumber(player.phone);
      results.sms = await SMSService.sendNotification(formattedPhone, alertMessage);
    }

    if (player.whatsapp) {
      const formattedWhatsApp = WhatsAppService.formatWhatsAppNumber(player.whatsapp);
      results.whatsapp = await WhatsAppService.sendNotification(formattedWhatsApp, alertMessage);
    }

    return results;
  }

  /**
   * Envia notificação de alerta para múltiplos jogadores
   */
  static async sendBulkAlert(
    players: PlayerContact[],
    alertMessage: string
  ): Promise<CampaignResult> {
    const message = {
      subject: '🚨 Alerta do Casino',
      emailBody: `<h2>Alerta Importante</h2><p>${alertMessage}</p>`,
      smsBody: `🚨 ${alertMessage}`,
      whatsappBody: `🚨 *Alerta Importante*\n\n${alertMessage}`,
    };

    return this.sendBulkCampaign(players, message);
  }

  /**
   * Envia mensagem de boas-vindas para novo jogador
   */
  static async sendWelcomeMessage(player: PlayerContact): Promise<{ email: boolean; sms: boolean; whatsapp: boolean }> {
    const message = {
      subject: '🎰 Bem-vindo ao Casino!',
      emailBody: `
        <h1>🎰 Bem-vindo ao Casino!</h1>
        <p>Olá ${player.name},</p>
        <p>Seja bem-vindo ao nosso casino! Estamos muito felizes em tê-lo conosco.</p>
        <p>Como presente de boas-vindas, você ganhou um bônus de 100% até R$ 500!</p>
        <p>Aproveite e boa sorte!</p>
      `,
      smsBody: `🎰 Bem-vindo ${player.name}! Bônus de 100% até R$ 500 para você!`,
      whatsappBody: `🎰 *Bem-vindo ao Casino!*\n\nOlá ${player.name}!\n\nSeja bem-vindo ao nosso casino! 🎉\n\nComo presente de boas-vindas, você ganhou um *bônus de 100% até R$ 500*! 💰\n\nAproveite e boa sorte! 🍀`,
    };

    return this.sendCampaignToPlayer(player, message);
  }

  /**
   * Envia mensagem de reativação para jogador inativo
   */
  static async sendReactivationMessage(player: PlayerContact): Promise<{ email: boolean; sms: boolean; whatsapp: boolean }> {
    const message = {
      subject: '💔 Sentimos sua falta! Volte com 200% de bônus',
      emailBody: `
        <h1>💔 Sentimos sua falta!</h1>
        <p>Olá ${player.name},</p>
        <p>Notamos que você não está jogando há um tempo. Sentimos sua falta!</p>
        <p>Para te trazer de volta, preparamos um bônus especial de 200% até R$ 1000!</p>
        <p>Volte e aproveite!</p>
      `,
      smsBody: `💔 ${player.name}, sentimos sua falta! Volte com 200% de bônus até R$ 1000!`,
      whatsappBody: `💔 *Sentimos sua falta!*\n\nOlá ${player.name}!\n\nNotamos que você não está jogando há um tempo. Sentimos sua falta! 😢\n\nPara te trazer de volta, preparamos um *bônus especial de 200% até R$ 1000*! 🎁\n\nVolte e aproveite! 🎰`,
    };

    return this.sendCampaignToPlayer(player, message);
  }

  /**
   * Verifica se os serviços estão configurados
   */
  static getServiceStatus(): {
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
  } {
    return {
      email: !!import.meta.env.VITE_SENDGRID_API_KEY,
      sms: !!(import.meta.env.VITE_TWILIO_ACCOUNT_SID && import.meta.env.VITE_TWILIO_AUTH_TOKEN),
      whatsapp: !!(import.meta.env.VITE_TWILIO_ACCOUNT_SID && import.meta.env.VITE_TWILIO_AUTH_TOKEN),
    };
  }
}

export default MessagingService; 
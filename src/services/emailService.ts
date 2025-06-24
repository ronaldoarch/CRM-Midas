import sgMail from '@sendgrid/mail';

// Configurar SendGrid
const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL || 'noreply@seucasino.com';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, any>;
}

export interface BulkEmailData {
  emails: EmailData[];
}

export class EmailService {
  /**
   * Envia um e-mail individual
   */
  static async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      if (!SENDGRID_API_KEY) {
        console.warn('SendGrid API Key não configurada');
        return false;
      }

      const msg = {
        to: emailData.to,
        from: FROM_EMAIL,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
        templateId: emailData.templateId,
        dynamicTemplateData: emailData.dynamicTemplateData,
      };

      await sgMail.send(msg as any);
      console.log(`E-mail enviado com sucesso para: ${emailData.to}`);
      return true;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      return false;
    }
  }

  /**
   * Envia múltiplos e-mails em lote
   */
  static async sendBulkEmails(bulkData: BulkEmailData): Promise<{ success: number; failed: number }> {
    try {
      if (!SENDGRID_API_KEY) {
        console.warn('SendGrid API Key não configurada');
        return { success: 0, failed: bulkData.emails.length };
      }

      const messages = bulkData.emails.map(emailData => ({
        to: emailData.to,
        from: FROM_EMAIL,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
        templateId: emailData.templateId,
        dynamicTemplateData: emailData.dynamicTemplateData,
      }));

      const results = await sgMail.sendMultiple(messages as any);
      
      const success = results.length;
      const failed = bulkData.emails.length - success;

      console.log(`E-mails em lote enviados: ${success} sucessos, ${failed} falhas`);
      return { success, failed };
    } catch (error) {
      console.error('Erro ao enviar e-mails em lote:', error);
      return { success: 0, failed: bulkData.emails.length };
    }
  }

  /**
   * Envia e-mail usando template do SendGrid
   */
  static async sendTemplateEmail(
    to: string,
    templateId: string,
    dynamicTemplateData: Record<string, any>
  ): Promise<boolean> {
    return this.sendEmail({
      to,
      subject: 'Mensagem do Casino',
      templateId,
      dynamicTemplateData,
    });
  }

  /**
   * Valida se um e-mail é válido
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default EmailService; 
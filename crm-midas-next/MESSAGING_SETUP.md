# 🚀 Configuração dos Serviços de Mensagens

Este documento explica como configurar os serviços de envio de mensagens (E-mail, SMS e WhatsApp) no CRM-Midas.

## 📧 SendGrid (E-mail)

### 1. Criar conta no SendGrid
- Acesse [sendgrid.com](https://sendgrid.com)
- Crie uma conta gratuita (100 e-mails/dia)
- Verifique seu domínio de e-mail

### 2. Obter API Key
- No painel do SendGrid, vá em **Settings > API Keys**
- Crie uma nova API Key com permissões de **Mail Send**
- Copie a chave gerada

### 3. Configurar variáveis de ambiente
```env
VITE_SENDGRID_API_KEY=SG.sua_chave_aqui
VITE_FROM_EMAIL=noreply@seucasino.com
```

## 📱 Twilio (SMS e WhatsApp)

### 1. Criar conta no Twilio
- Acesse [twilio.com](https://twilio.com)
- Crie uma conta gratuita
- Complete a verificação

### 2. Obter credenciais
- No painel do Twilio, vá em **Console > Dashboard**
- Copie o **Account SID** e **Auth Token**

### 3. Configurar número de telefone
- Vá em **Phone Numbers > Manage > Active numbers**
- Compre um número para SMS
- Para WhatsApp, use o sandbox gratuito

### 4. Configurar variáveis de ambiente
```env
VITE_TWILIO_ACCOUNT_SID=AC_sua_account_sid_aqui
VITE_TWILIO_AUTH_TOKEN=seu_auth_token_aqui
VITE_TWILIO_PHONE_NUMBER=+1234567890
VITE_TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

## 🔧 Configuração Local

### 1. Criar arquivo .env
Crie um arquivo `.env` na raiz do projeto com as variáveis acima.

### 2. Instalar dependências
```bash
npm install
```

### 3. Testar os serviços
- Execute o projeto: `npm run dev`
- Acesse a aba "Teste de Mensagens" no CRM
- Teste cada serviço individualmente

## 📋 Variáveis de Ambiente Completas

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# SendGrid Configuration (Email)
VITE_SENDGRID_API_KEY=SG.sua_chave_aqui
VITE_FROM_EMAIL=noreply@seucasino.com

# Twilio Configuration (SMS & WhatsApp)
VITE_TWILIO_ACCOUNT_SID=AC_sua_account_sid_aqui
VITE_TWILIO_AUTH_TOKEN=seu_auth_token_aqui
VITE_TWILIO_PHONE_NUMBER=+1234567890
VITE_TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

## 🧪 Testando os Serviços

### E-mail
- Use um e-mail válido
- Verifique a caixa de spam
- SendGrid envia logs detalhados

### SMS
- Use formato: (11) 99999-9999
- O número será formatado automaticamente
- Verifique o painel do Twilio para status

### WhatsApp
- Use formato: (11) 99999-9999
- Para sandbox, o número precisa estar inscrito
- Siga as instruções do Twilio para ativar

## 🚨 Troubleshooting

### E-mail não enviado
- Verifique se a API Key está correta
- Confirme se o domínio está verificado no SendGrid
- Verifique os logs no painel do SendGrid

### SMS não enviado
- Verifique se o número está ativo no Twilio
- Confirme se há créditos na conta
- Verifique o formato do número

### WhatsApp não enviado
- Para sandbox, o número precisa estar inscrito
- Use o comando fornecido pelo Twilio
- Verifique se o número está no formato correto

## 💰 Custos

### SendGrid
- **Gratuito:** 100 e-mails/dia
- **Pago:** $14.95/mês para 50k e-mails

### Twilio
- **SMS:** ~$0.0075 por mensagem
- **WhatsApp:** ~$0.005 por mensagem
- **Crédito gratuito:** $15-20 na criação da conta

## 🔒 Segurança

- Nunca commite o arquivo `.env` no Git
- Use variáveis de ambiente no servidor de produção
- Rotacione as API Keys regularmente
- Monitore o uso dos serviços

## 📞 Suporte

- **SendGrid:** [support.sendgrid.com](https://support.sendgrid.com)
- **Twilio:** [support.twilio.com](https://support.twilio.com)
- **Documentação:** Consulte os links oficiais para mais detalhes 
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, MessageCircle, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import EmailService from "@/services/emailService"

export default function MessageTester() {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "Teste do CRM Casino",
    body: "Esta é uma mensagem de teste do CRM Casino Pro! 🎰",
  })

  const [smsData, setSmsData] = useState({
    to: "",
    body: "🎰 Teste do CRM Casino - Esta é uma mensagem de teste!",
  })

  const [whatsappData, setWhatsappData] = useState({
    to: "",
    body: "🎰 *Teste do CRM Casino*\n\nEsta é uma mensagem de teste do WhatsApp!",
  })

  const [loading, setLoading] = useState({
    email: false,
    sms: false,
    whatsapp: false,
  })

  const [results, setResults] = useState({
    email: null as boolean | null,
    sms: null as boolean | null,
    whatsapp: null as boolean | null,
  })

  const handleEmailTest = async () => {
    if (!emailData.to) {
      toast.error("Digite um e-mail válido")
      return
    }

    setLoading(prev => ({ ...prev, email: true }))
    setResults(prev => ({ ...prev, email: null }))

    try {
      const success = await EmailService.sendEmail({
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.body,
      })

      setResults(prev => ({ ...prev, email: success }))
      
      if (success) {
        toast.success("E-mail enviado com sucesso!")
      } else {
        toast.error("Falha ao enviar e-mail")
      }
    } catch (error) {
      setResults(prev => ({ ...prev, email: false }))
      toast.error("Erro ao enviar e-mail")
    } finally {
      setLoading(prev => ({ ...prev, email: false }))
    }
  }

  const handleSMSTest = async () => {
    if (!smsData.to) {
      toast.error("Digite um número de telefone válido")
      return
    }

    setLoading(prev => ({ ...prev, sms: true }))
    setResults(prev => ({ ...prev, sms: null }))

    try {
      const formattedPhone = smsData.to.replace(/\D/g, '')
      const to = formattedPhone.startsWith('+') ? formattedPhone : `+55${formattedPhone}`
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          body: smsData.body,
        })
      })
      const result = await response.json()
      setResults(prev => ({ ...prev, sms: result.success }))
      if (result.success) {
        toast.success("SMS enviado com sucesso!")
      } else {
        toast.error("Falha ao enviar SMS")
      }
    } catch (error) {
      setResults(prev => ({ ...prev, sms: false }))
      toast.error("Erro ao enviar SMS")
    } finally {
      setLoading(prev => ({ ...prev, sms: false }))
    }
  }

  const handleWhatsAppTest = async () => {
    if (!whatsappData.to) {
      toast.error("Digite um número de WhatsApp válido")
      return
    }

    setLoading(prev => ({ ...prev, whatsapp: true }))
    setResults(prev => ({ ...prev, whatsapp: null }))

    try {
      const formattedWhatsApp = whatsappData.to.replace(/\D/g, '')
      const to = formattedWhatsApp.startsWith('+') ? formattedWhatsApp : `+55${formattedWhatsApp}`
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          body: whatsappData.body,
        })
      })
      const result = await response.json()
      setResults(prev => ({ ...prev, whatsapp: result.success }))
      if (result.success) {
        toast.success("WhatsApp enviado com sucesso!")
      } else {
        toast.error("Falha ao enviar WhatsApp")
      }
    } catch (error) {
      setResults(prev => ({ ...prev, whatsapp: false }))
      toast.error("Erro ao enviar WhatsApp")
    } finally {
      setLoading(prev => ({ ...prev, whatsapp: false }))
    }
  }

  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return <AlertCircle className="h-4 w-4 text-gray-400" />
    if (status) return <CheckCircle className="h-4 w-4 text-green-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  const getStatusText = (status: boolean | null) => {
    if (status === null) return "Não testado"
    if (status) return "Sucesso"
    return "Falha"
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="email" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>E-mail</span>
            {getStatusIcon(results.email)}
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>SMS</span>
            {getStatusIcon(results.sms)}
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
            {getStatusIcon(results.whatsapp)}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Teste de E-mail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email-to">Para:</Label>
                <Input
                  id="email-to"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={emailData.to}
                  onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email-subject">Assunto:</Label>
                <Input
                  id="email-subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email-body">Mensagem:</Label>
                <Textarea
                  id="email-body"
                  rows={4}
                  value={emailData.body}
                  onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
                />
              </div>
              <Button 
                onClick={handleEmailTest} 
                disabled={loading.email}
                className="w-full"
              >
                {loading.email ? "Enviando..." : "Enviar E-mail de Teste"}
              </Button>
              {results.email !== null && (
                <div className="text-sm text-muted-foreground">
                  Status: {getStatusText(results.email)}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>Teste de SMS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sms-to">Para:</Label>
                <Input
                  id="sms-to"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={smsData.to}
                  onChange={(e) => setSmsData(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="sms-body">Mensagem:</Label>
                <Textarea
                  id="sms-body"
                  rows={4}
                  value={smsData.body}
                  onChange={(e) => setSmsData(prev => ({ ...prev, body: e.target.value }))}
                />
              </div>
              <Button 
                onClick={handleSMSTest} 
                disabled={loading.sms}
                className="w-full"
              >
                {loading.sms ? "Enviando..." : "Enviar SMS de Teste"}
              </Button>
              {results.sms !== null && (
                <div className="text-sm text-muted-foreground">
                  Status: {getStatusText(results.sms)}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle>Teste de WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="whatsapp-to">Para:</Label>
                <Input
                  id="whatsapp-to"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={whatsappData.to}
                  onChange={(e) => setWhatsappData(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="whatsapp-body">Mensagem:</Label>
                <Textarea
                  id="whatsapp-body"
                  rows={4}
                  value={whatsappData.body}
                  onChange={(e) => setWhatsappData(prev => ({ ...prev, body: e.target.value }))}
                />
              </div>
              <Button 
                onClick={handleWhatsAppTest} 
                disabled={loading.whatsapp}
                className="w-full"
              >
                {loading.whatsapp ? "Enviando..." : "Enviar WhatsApp de Teste"}
              </Button>
              {results.whatsapp !== null && (
                <div className="text-sm text-muted-foreground">
                  Status: {getStatusText(results.whatsapp)}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
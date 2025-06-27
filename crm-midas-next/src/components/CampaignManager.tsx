import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Plus, FileText, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import MessageTester from "./MessageTester"

const templates = [
  {
    id: 1,
    name: "Novos Jogadores",
    subject: "🎰 Sua sorte te espera! Bônus de 100% até R$ 500",
    description: "Template para boas-vindas com bônus inicial",
  },
  {
    id: 2,
    name: "VIP",
    subject: "👑 VIP: Acesso antecipado aos novos jogos",
    description: "Template para jogadores VIP com benefícios exclusivos",
  },
  {
    id: 3,
    name: "Reativação",
    subject: "💔 Sentimos sua falta! Volte com 200% de bônus",
    description: "Template para reativação de jogadores inativos",
  },
]

const segmentos = [
  "Novos Jogadores",
  "Jogadores VIP",
  "Jogadores Inativos",
  "Churn Alto Risco",
  "Jogadores Regulares",
]

function getInitialCampaigns() {
  const local = localStorage.getItem("campanhas")
  if (local) return JSON.parse(local)
  return [
    {
      id: 1,
      name: "Reativação VIP - Bônus Exclusivo",
      sent: 89,
      opened: 67,
      clicked: 23,
      converted: 8,
      revenue: "R$ 15.750",
    },
    {
      id: 2,
      name: "Novos Jogos - Preview VIP",
      sent: 156,
      opened: 142,
      clicked: 98,
      converted: 45,
      revenue: "R$ 32.500",
    },
    {
      id: 3,
      name: "Campanha de Aniversário",
      sent: 234,
      opened: 198,
      clicked: 156,
      converted: 78,
      revenue: "R$ 45.200",
    },
  ]
}

export default function CampaignManager() {
  const [campaigns, setCampaigns] = useState(getInitialCampaigns)
  const [nome, setNome] = useState("")
  const [segmento, setSegmento] = useState(segmentos[0])
  const [template, setTemplate] = useState("")

  // Segmentação inteligente
  const [users, setUsers] = useState<any[]>([])
  const [deposits, setDeposits] = useState<any[]>([])
  const [bets, setBets] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/users").then(res => res.json()).then(setUsers)
    fetch("/api/deposits").then(res => res.json()).then(setDeposits)
    fetch("/api/bets").then(res => res.json()).then(setBets)
  }, [])

  const usersNoDeposit = users.filter(u =>
    !deposits.some(d => d.user_id === u.user_id)
  )

  const usersDepositNoBet = users.filter(u =>
    deposits.some(d => d.user_id === u.user_id) &&
    !bets.some(b => b.user_id === u.user_id)
  )

  async function sendCampaign(segment: any[], tipo: string) {
    // Aqui você pode integrar com o serviço de envio real
    // Exemplo: await sendBulkEmail(segment, tipo)
    alert(`Campanha enviada para ${segment.length} usuários do segmento: ${tipo}`)
  }

  useEffect(() => {
    localStorage.setItem("campanhas", JSON.stringify(campaigns))
  }, [campaigns])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!nome) {
      toast.error("Digite o nome da campanha!")
      return
    }
    const novo = {
      id: Date.now(),
      name: nome,
      sent: Math.floor(Math.random() * 200) + 50,
      opened: Math.floor(Math.random() * 200),
      clicked: Math.floor(Math.random() * 100),
      converted: Math.floor(Math.random() * 50),
      revenue: `R$ ${(Math.random() * 50000 + 5000).toLocaleString("pt-BR", {maximumFractionDigits:0})}`,
      segmento,
      template,
    }
    // Para integração real, use a linha abaixo:
    // await apiPost('/campanhas', novo, token)
    setCampaigns([novo, ...campaigns])
    setNome("")
    setSegmento(segmentos[0])
    setTemplate("")
    toast.success("Campanha criada com sucesso!")
  }

  function usarTemplate(nomeTemplate: string) {
    setTemplate(nomeTemplate)
    toast.info(`Template "${nomeTemplate}" selecionado! Preencha o restante e crie a campanha.`)
  }

  return (
    <Tabs defaultValue="active" className="space-y-6">
      <TabsList>
        <TabsTrigger value="active">
          <Mail className="h-4 w-4 mr-2" />
          Campanhas Ativas
        </TabsTrigger>
        <TabsTrigger value="create">
          <Plus className="h-4 w-4 mr-2" />
          Criar Campanha
        </TabsTrigger>
        <TabsTrigger value="templates">
          <FileText className="h-4 w-4 mr-2" />
          Templates
        </TabsTrigger>
        <TabsTrigger value="test">
          <MessageSquare className="h-4 w-4 mr-2" />
          Testar Mensagens
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <div className="space-y-4">
          {campaigns.length === 0 && (
            <div className="text-center text-muted-foreground">Nenhuma campanha cadastrada.</div>
          )}
          {campaigns.map((campaign: any) => (
            <Card key={campaign.id}>
              <CardHeader>
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Enviados</p>
                    <p className="text-2xl font-bold">{campaign.sent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Abertos</p>
                    <p className="text-2xl font-bold">{campaign.opened}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cliques</p>
                    <p className="text-2xl font-bold">{campaign.clicked}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversões</p>
                    <p className="text-2xl font-bold">{campaign.converted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Receita</p>
                    <p className="text-2xl font-bold">{campaign.revenue}</p>
                  </div>
                </div>
                {campaign.segmento && (
                  <div className="mt-2 text-xs text-muted-foreground">Segmento: {campaign.segmento}</div>
                )}
                {campaign.template && (
                  <div className="text-xs text-muted-foreground">Template: {campaign.template}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Campanhas Inteligentes (Segmentação Real)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Cadastrou, mas não depositou</h4>
              <p className="text-xs text-muted-foreground mb-2">Usuários que se cadastraram mas ainda não fizeram nenhum depósito.</p>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded mb-2"
                onClick={() => sendCampaign(usersNoDeposit, "Cadastro sem depósito")}
                disabled={usersNoDeposit.length === 0}
              >
                Enviar E-mail/SMS para {usersNoDeposit.length} usuários
              </button>
              <ul className="text-xs max-h-32 overflow-y-auto">
                {usersNoDeposit.slice(0, 10).map(u => (
                  <li key={u.user_id}>{u.name} - {u.email} - {u.phone}</li>
                ))}
                {usersNoDeposit.length > 10 && <li>...e mais {usersNoDeposit.length - 10} usuários</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Depositou, mas não apostou</h4>
              <p className="text-xs text-muted-foreground mb-2">Usuários que depositaram mas ainda não fizeram nenhuma aposta.</p>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded mb-2"
                onClick={() => sendCampaign(usersDepositNoBet, "Depositou sem apostar")}
                disabled={usersDepositNoBet.length === 0}
              >
                Enviar E-mail/SMS para {usersDepositNoBet.length} usuários
              </button>
              <ul className="text-xs max-h-32 overflow-y-auto">
                {usersDepositNoBet.slice(0, 10).map(u => (
                  <li key={u.user_id}>{u.name} - {u.email} - {u.phone}</li>
                ))}
                {usersDepositNoBet.length > 10 && <li>...e mais {usersDepositNoBet.length - 10} usuários</li>}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Campanha</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleCreate}>
              <div>
                <label className="text-sm font-medium">Nome da Campanha</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 rounded-md border bg-background"
                  placeholder="Digite o nome da campanha"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Segmento</label>
                <select
                  className="w-full mt-1 p-2 rounded-md border bg-background"
                  value={segmento}
                  onChange={e => setSegmento(e.target.value)}
                >
                  {segmentos.map((seg) => (
                    <option key={seg}>{seg}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Template</label>
                <select
                  className="w-full mt-1 p-2 rounded-md border bg-background"
                  value={template}
                  onChange={e => setTemplate(e.target.value)}
                >
                  <option value="">Selecione um template</option>
                  {templates.map((template) => (
                    <option key={template.id}>{template.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-primary text-primary-foreground p-2 rounded-md">
                Criar Campanha
              </button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="templates">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium mb-2">{template.subject}</p>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
                <button
                  className="mt-4 w-full bg-primary text-primary-foreground p-2 rounded-md"
                  onClick={() => usarTemplate(template.name)}
                  type="button"
                >
                  Usar Template
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="test">
        <MessageTester />
      </TabsContent>
    </Tabs>
  )
} 
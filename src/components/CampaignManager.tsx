import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Plus, FileText } from "lucide-react"
import { toast } from "sonner"
import { apiGet, apiPost } from "@/lib/api"

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

  // Ao integrar com a API, descomente o useEffect abaixo e ajuste o endpoint:
  /*
  useEffect(() => {
    apiGet('/campanhas', token)
      .then(data => setCampaigns(data))
      .catch(() => setCampaigns(getInitialCampaigns()))
  }, [token])
  */

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
    </Tabs>
  )
} 
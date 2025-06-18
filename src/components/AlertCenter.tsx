import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, TrendingDown, TrendingUp, Info } from "lucide-react"
import { toast } from "sonner"

const activeAlerts = [
  {
    id: 1,
    type: "critical",
    title: "Alto Risco de Churn",
    description: "23 jogadores VIP com risco de abandono",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    id: 2,
    type: "warning",
    title: "Queda no Ticket Médio",
    description: "Redução de 15% no valor médio das apostas",
    icon: TrendingDown,
    color: "text-orange-500",
  },
  {
    id: 3,
    type: "opportunity",
    title: "Pico de Registros",
    description: "Aumento de 250% em novos cadastros",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    id: 4,
    type: "info",
    title: "Primeiro Depósito",
    description: "Novo jogador realizou primeiro depósito",
    icon: Info,
    color: "text-blue-500",
  },
]

const defaultRules = [
  {
    id: 1,
    name: "Alerta de Churn VIP",
    description: "Notificar quando jogador VIP ficar inativo por 7 dias",
    enabled: true,
  },
  {
    id: 2,
    name: "Monitoramento de Ticket",
    description: "Alertar sobre quedas significativas no valor médio",
    enabled: true,
  },
  {
    id: 3,
    name: "Detecção de Fraude",
    description: "Monitorar padrões suspeitos de apostas",
    enabled: true,
  },
  {
    id: 4,
    name: "Oportunidades de Upsell",
    description: "Identificar jogadores prontos para upgrade VIP",
    enabled: false,
  },
  {
    id: 5,
    name: "Campanhas Automáticas",
    description: "Disparar campanhas baseadas em comportamento",
    enabled: true,
  },
]

function getInitialRules() {
  const local = localStorage.getItem("alertRules")
  if (local) return JSON.parse(local)
  return defaultRules
}

// Definir tipo para as regras
interface RuleType {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
}

export default function AlertCenter() {
  const [rules, setRules] = useState<RuleType[]>(getInitialRules)

  // Ao integrar com a API, descomente o useEffect abaixo e ajuste o endpoint:
  /*
  useEffect(() => {
    apiGet('/regras', token)
      .then(data => setRules(data))
      .catch(() => setRules(getInitialRules()))
  }, [token])
  */

  useEffect(() => {
    localStorage.setItem("alertRules", JSON.stringify(rules))
  }, [rules])

  function handleSwitch(id: number) {
    setRules((rules: RuleType[]) => rules.map((rule: RuleType) =>
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ))
    const rule = rules.find((r: RuleType) => r.id === id)
    if (rule) {
      toast.info(`${rule.name} ${rule.enabled ? 'desativada' : 'ativada'}`)
    }
    // Para integração real, envie a alteração para a API:
    // apiPost('/regras', { id, enabled: !rule.enabled }, token)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeAlerts.map((alert) => (
          <Card key={alert.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{alert.title}</CardTitle>
              <alert.icon className={`h-4 w-4 ${alert.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{alert.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuração de Regras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule: RuleType) => (
              <div
                key={rule.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{rule.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {rule.description}
                  </p>
                </div>
                <Switch checked={rule.enabled} onCheckedChange={() => handleSwitch(rule.id)} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recomendações Inteligentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Otimização de Campanhas</h4>
              <p className="text-sm text-muted-foreground">
                Sugestão: Ajustar horário de envio para 18h-20h para melhor
                engajamento.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Prevenção de Churn</h4>
              <p className="text-sm text-muted-foreground">
                Recomendação: Implementar sistema de recompensas por fidelidade
                para jogadores VIP.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Aumento de Conversão</h4>
              <p className="text-sm text-muted-foreground">
                Sugestão: Criar campanha de bônus progressivo para novos
                jogadores.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
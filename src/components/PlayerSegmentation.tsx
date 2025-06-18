import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Crown, AlertTriangle, TrendingDown, UserCheck } from "lucide-react"
import { toast } from "sonner"
import { apiGet } from "@/lib/api"

const defaultSegments = [
  {
    id: 1,
    name: "Novos Jogadores",
    count: 247,
    percentage: 15,
    growth: "+23%",
    avgValue: "R$ 150",
    retention: "45%",
    icon: Users,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: 2,
    name: "Jogadores VIP",
    count: 89,
    percentage: 5,
    growth: "+12%",
    avgValue: "R$ 2.500",
    retention: "92%",
    icon: Crown,
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: 3,
    name: "Jogadores Inativos",
    count: 432,
    percentage: 26,
    growth: "-8%",
    avgValue: "R$ 80",
    retention: "15%",
    icon: AlertTriangle,
    color: "from-red-500 to-red-600",
  },
  {
    id: 4,
    name: "Churn Alto Risco",
    count: 156,
    percentage: 9,
    growth: "-15%",
    avgValue: "R$ 200",
    retention: "25%",
    icon: TrendingDown,
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 5,
    name: "Jogadores Regulares",
    count: 743,
    percentage: 45,
    growth: "+5%",
    avgValue: "R$ 450",
    retention: "68%",
    icon: UserCheck,
    color: "from-blue-500 to-blue-600",
  },
]

function getInitialSegments() {
  const local = localStorage.getItem("segmentos")
  if (local) return JSON.parse(local)
  return defaultSegments
}

export default function PlayerSegmentation() {
  const [segments, setSegments] = useState(getInitialSegments)
  const [editId, setEditId] = useState<number | null>(null)
  const [avgValue, setAvgValue] = useState("")
  const [retention, setRetention] = useState("")
  const [token] = useState("") // Troque pelo token real se necessário

  // Ao integrar com a API, descomente o useEffect abaixo e ajuste o endpoint:
  /*
  useEffect(() => {
    apiGet('/segmentos', token)
      .then(data => setSegments(data))
      .catch(() => setSegments(getInitialSegments()))
  }, [token])
  */

  useEffect(() => {
    localStorage.setItem("segmentos", JSON.stringify(segments))
  }, [segments])

  function startEdit(segment: any) {
    setEditId(segment.id)
    setAvgValue(segment.avgValue)
    setRetention(segment.retention)
  }

  function saveEdit(id: number) {
    setSegments(segments.map(seg =>
      seg.id === id ? { ...seg, avgValue, retention } : seg
    ))
    setEditId(null)
    toast.success("Segmento atualizado com sucesso!")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {segments.map((segment) => (
          <Card key={segment.id} className={`bg-gradient-to-br ${segment.color}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-white">
                {segment.name}
              </CardTitle>
              <segment.icon className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{segment.count}</div>
              <div className="flex items-center justify-between text-xs text-white/80">
                <span>{segment.percentage}% do total</span>
                <span>{segment.growth}</span>
              </div>
              <div className="mt-2 space-y-1">
                {editId === segment.id ? (
                  <>
                    <div className="flex justify-between text-xs text-white/80 items-center gap-2">
                      <span>Valor Médio:</span>
                      <input
                        className="rounded px-1 text-black w-20"
                        value={avgValue}
                        onChange={e => setAvgValue(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/80 items-center gap-2">
                      <span>Retenção:</span>
                      <input
                        className="rounded px-1 text-black w-16"
                        value={retention}
                        onChange={e => setRetention(e.target.value)}
                      />
                    </div>
                    <button
                      className="mt-2 bg-white/80 text-black rounded px-2 py-1 text-xs"
                      onClick={() => saveEdit(segment.id)}
                    >Salvar</button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-xs text-white/80">
                      <span>Valor Médio:</span>
                      <span>{segment.avgValue}</span>
                    </div>
                    <div className="flex justify-between text-xs text-white/80">
                      <span>Retenção:</span>
                      <span>{segment.retention}</span>
                    </div>
                    <button
                      className="mt-2 bg-white/20 text-white rounded px-2 py-1 text-xs hover:bg-white/40"
                      onClick={() => startEdit(segment)}
                    >Editar</button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insights Detalhados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Jogadores VIP</h4>
              <p className="text-sm text-muted-foreground">
                Alta taxa de retenção ({segments[1].retention}) indica forte engajamento. Recomendamos criar
                campanhas exclusivas para manter o interesse.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Churn Alto Risco</h4>
              <p className="text-sm text-muted-foreground">
                Necessidade de ações imediatas para recuperação. Sugerimos bônus
                personalizados e contato direto.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Novos Jogadores</h4>
              <p className="text-sm text-muted-foreground">
                Crescimento positivo ({segments[0].growth}) com boa conversão inicial. Focar em
                onboarding e primeiras experiências.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
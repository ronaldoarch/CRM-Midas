import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { apiGet, apiPost } from "@/lib/api"

const defaultActiveTests = [
  {
    id: 1,
    name: "Layout da Página Inicial",
    variantA: "Layout Atual",
    variantB: "Layout Novo",
    metrics: {
      a: { conversion: 12.5, revenue: 45000 },
      b: { conversion: 15.2, revenue: 52000 },
    },
    segmento: "Todos os Jogadores",
  },
  {
    id: 2,
    name: "Copy do Botão de Depósito",
    variantA: "Depositar Agora",
    variantB: "Começar a Ganhar",
    metrics: {
      a: { conversion: 8.3, revenue: 32000 },
      b: { conversion: 9.1, revenue: 35000 },
    },
    segmento: "Todos os Jogadores",
  },
]

const defaultCompletedTests = [
  {
    id: 1,
    name: "Cor do Botão de Registro",
    winner: "B",
    metrics: {
      a: { conversion: 5.2, revenue: 28000 },
      b: { conversion: 7.8, revenue: 42000 },
    },
  },
  {
    id: 2,
    name: "Posição do Formulário",
    winner: "A",
    metrics: {
      a: { conversion: 9.5, revenue: 38000 },
      b: { conversion: 8.2, revenue: 32000 },
    },
  },
]

const insights = [
  {
    title: "Impacto no Faturamento",
    description: "Testes A/B geraram aumento de 15% no faturamento médio",
  },
  {
    title: "Melhorias de Conversão",
    description: "Taxa de conversão aumentou em 23% após implementação dos testes",
  },
  {
    title: "Engajamento",
    description: "Tempo médio de sessão aumentou em 18% com as otimizações",
  },
]

const segmentos = [
  "Todos os Jogadores",
  "Novos Jogadores",
  "Jogadores VIP",
  "Jogadores Inativos",
]

// Definir tipo para os testes
interface TestType {
  id: number;
  name: string;
  variantA?: string;
  variantB?: string;
  segmento?: string;
  metrics: {
    a: { conversion: number; revenue: number };
    b: { conversion: number; revenue: number };
  };
  winner?: string;
}

function getInitialActive() {
  const local = localStorage.getItem("abActive")
  if (local) return JSON.parse(local)
  return defaultActiveTests
}

export default function ABTesting() {
  const [activeTests, setActiveTests] = useState(getInitialActive)
  const [nome, setNome] = useState("")
  const [variantA, setVariantA] = useState("")
  const [variantB, setVariantB] = useState("")
  const [segmento, setSegmento] = useState(segmentos[0])

  // Ao integrar com a API, descomente o useEffect abaixo e ajuste o endpoint:
  /*
  useEffect(() => {
    apiGet('/abtests', token)
      .then(data => setActiveTests(data))
      .catch(() => setActiveTests(getInitialActive()))
  }, [token])
  */

  useEffect(() => {
    localStorage.setItem("abActive", JSON.stringify(activeTests))
  }, [activeTests])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!nome || !variantA || !variantB) {
      toast.error("Preencha todos os campos!")
      return
    }
    const novo = {
      id: Date.now(),
      name: nome,
      variantA,
      variantB,
      segmento,
      metrics: {
        a: { conversion: +(Math.random() * 10 + 5).toFixed(1), revenue: Math.floor(Math.random() * 50000 + 10000) },
        b: { conversion: +(Math.random() * 10 + 5).toFixed(1), revenue: Math.floor(Math.random() * 50000 + 10000) },
      },
    }
    // Para integração real, use a linha abaixo:
    // await apiPost('/abtests', novo, token)
    setActiveTests([novo, ...activeTests])
    setNome("")
    setVariantA("")
    setVariantB("")
    setSegmento(segmentos[0])
    toast.success("Teste A/B criado com sucesso!")
  }

  return (
    <Tabs defaultValue="active" className="space-y-6">
      <TabsList>
        <TabsTrigger value="active">Em Execução</TabsTrigger>
        <TabsTrigger value="completed">Concluídos</TabsTrigger>
        <TabsTrigger value="insights">Insights</TabsTrigger>
        <TabsTrigger value="create">Criar Teste</TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <div className="space-y-6">
          {activeTests.length === 0 && (
            <div className="text-center text-muted-foreground">Nenhum teste em execução.</div>
          )}
          {activeTests.map((test: TestType) => (
            <Card key={test.id}>
              <CardHeader>
                <CardTitle>{test.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Variante A: {test.variantA}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Conversão:
                        </span>
                        <span className="font-medium">{test.metrics.a.conversion}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Receita:
                        </span>
                        <span className="font-medium">
                          R$ {test.metrics.a.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Variante B: {test.variantB}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Conversão:
                        </span>
                        <span className="font-medium">{test.metrics.b.conversion}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Receita:
                        </span>
                        <span className="font-medium">
                          R$ {test.metrics.b.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="space-y-6">
          {defaultCompletedTests.length === 0 && (
            <div className="text-center text-muted-foreground">Nenhum teste concluído.</div>
          )}
          {defaultCompletedTests.map((test: TestType) => (
            <Card key={test.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {test.name}
                  <span className="text-sm font-medium text-emerald-500">
                    Vencedor: Variante {test.winner}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Variante A",
                          conversão: test.metrics.a.conversion,
                          receita: test.metrics.a.revenue,
                        },
                        {
                          name: "Variante B",
                          conversão: test.metrics.b.conversion,
                          receita: test.metrics.b.revenue,
                        },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar
                        yAxisId="left"
                        dataKey="conversão"
                        fill="#3B82F6"
                        name="Conversão (%)"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="receita"
                        fill="#10B981"
                        name="Receita (R$)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="insights">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>Criar Novo Teste A/B</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleCreate}>
              <div>
                <label className="text-sm font-medium">Nome do Teste</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 rounded-md border bg-background"
                  placeholder="Digite o nome do teste"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Variante A</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 rounded-md border bg-background"
                  placeholder="Descreva a variante A"
                  value={variantA}
                  onChange={e => setVariantA(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Variante B</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 rounded-md border bg-background"
                  placeholder="Descreva a variante B"
                  value={variantB}
                  onChange={e => setVariantB(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Segmento</label>
                <select
                  className="w-full mt-1 p-2 rounded-md border bg-background"
                  value={segmento}
                  onChange={e => setSegmento(e.target.value)}
                >
                  {segmentos.map(seg => (
                    <option key={seg}>{seg}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="w-full bg-primary text-primary-foreground p-2 rounded-md">
                Iniciar Teste
              </button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 
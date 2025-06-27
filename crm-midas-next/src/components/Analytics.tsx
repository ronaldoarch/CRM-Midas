import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"

export default function Analytics() {
  const [metricsByDate, setMetricsByDate] = useState<any>(null)
  const [pageviewsData, setPageviewsData] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  // Função para buscar dados com filtro de data
  function fetchAllData(start?: string, end?: string) {
    const params = start && end ? `?start=${start}&end=${end}` : ""
    fetch(`/api/metrics-by-date${params}`).then(res => res.json()).then(setMetricsByDate)
    fetch(`/api/pageviews${params}`).then(res => res.json()).then(data => setPageviewsData(data.pageviews || []))
    fetch(`/api/metrics${params}`).then(res => res.json()).then(setMetrics)
    fetch(`/api/users${params}`).then(res => res.json()).then(setUsers)
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  function handleFilter() {
    if (startDate && endDate) {
      fetchAllData(startDate, endDate)
    }
  }

  // Gráficos reais
  const depositData = metricsByDate?.deposits?.map((d: any) => ({
    name: d._id.slice(5, 10),
    Depositos: d.total,
    Valor: d.sum,
  })) || []

  const betData = metricsByDate?.bets?.map((d: any) => ({
    name: d._id.slice(5, 10),
    Apostas: d.total,
    Valor: d.sum,
  })) || []

  // Pageviews reais
  const pageviewsByDate: Record<string, number> = {}
  pageviewsData.forEach((pv: any) => {
    if (!pageviewsByDate[pv._id.date]) pageviewsByDate[pv._id.date] = 0
    pageviewsByDate[pv._id.date] += pv.total
  })
  const pageviewsChartData = Object.entries(pageviewsByDate).map(([date, total]) => ({ date, total }))

  // LTV Médio (Lifetime Value)
  const ltv = metrics && users.length > 0 ? (metrics.sumDeposits / users.length) : null
  // Taxa de Retenção e Churn: Exemplo simples (ajuste conforme sua lógica real)
  const retention = users.length > 0 ? ((users.filter(u => u.last_login).length / users.length) * 100) : null
  const churn = retention !== null ? (100 - retention) : null

  return (
    <div className="space-y-6">
      {/* Filtro de data */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <label className="text-white">Data inicial:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="rounded px-2 py-1" />
        <label className="text-white">Data final:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="rounded px-2 py-1" />
        <button onClick={handleFilter} className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Filtrar</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>LTV Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ltv !== null ? `R$ ${ltv.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">{ltv !== null ? "+ calculado sobre dados reais" : "Sem dados suficientes"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {retention !== null ? `${retention.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">{retention !== null ? "+ calculado sobre dados reais" : "Sem dados suficientes"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Churn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {churn !== null ? `${churn.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">{churn !== null ? "+ calculado sobre dados reais" : "Sem dados suficientes"}</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Depósitos por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={depositData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="Depositos" fill="#3B82F6" name="Depósitos" />
                  <Bar yAxisId="right" dataKey="Valor" fill="#10B981" name="Valor (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Apostas por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={betData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="Apostas" fill="#8B5CF6" name="Apostas" />
                  <Bar yAxisId="right" dataKey="Valor" fill="#F59E0B" name="Valor (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pageviews por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageviewsChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#6366F1" name="Pageviews" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
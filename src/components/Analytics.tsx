import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"

const revenueData = [
  { name: "Jan", revenue: 65000, players: 1200 },
  { name: "Fev", revenue: 72000, players: 1350 },
  { name: "Mar", revenue: 85000, players: 1500 },
  { name: "Abr", revenue: 92000, players: 1650 },
  { name: "Mai", revenue: 88000, players: 1580 },
  { name: "Jun", revenue: 95000, players: 1700 },
]

const gamePreferences = [
  { name: "Slots", value: 45, color: "#10B981" },
  { name: "Blackjack", value: 25, color: "#3B82F6" },
  { name: "Roleta", value: 15, color: "#F59E0B" },
  { name: "Poker", value: 10, color: "#8B5CF6" },
  { name: "Outros", value: 5, color: "#6B7280" },
]

const activityData = [
  { hour: "00:00", sessions: 120 },
  { hour: "04:00", sessions: 80 },
  { hour: "08:00", sessions: 200 },
  { hour: "12:00", sessions: 350 },
  { hour: "16:00", sessions: 420 },
  { hour: "20:00", sessions: 380 },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>LTV Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.847</div>
            <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73,2%</div>
            <p className="text-xs text-muted-foreground">+2,1% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Taxa de Churn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,4%</div>
            <p className="text-xs text-muted-foreground">-1,2% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Receita vs Jogadores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="Receita" />
                  <Bar yAxisId="right" dataKey="players" fill="#10B981" name="Jogadores" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências de Jogos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gamePreferences}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {gamePreferences.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Atividade por Horário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sessions" stroke="#8B5CF6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
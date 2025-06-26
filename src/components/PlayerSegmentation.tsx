import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Crown, AlertTriangle, TrendingDown, UserCheck, LucideIcon } from "lucide-react"
import { toast } from "sonner"

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

function restoreIcons(segments: any[]): any[] {
  const iconMap: Record<number, LucideIcon> = {
    1: Users,
    2: Crown,
    3: AlertTriangle,
    4: TrendingDown,
    5: UserCheck,
  }
  return segments.map(seg => ({
    ...seg,
    icon: iconMap[Number(seg.id)] || Users,
  }))
}

function getInitialSegments() {
  const local = localStorage.getItem("segmentos")
  if (local) {
    const parsed = JSON.parse(local)
    return restoreIcons(parsed)
  }
  return defaultSegments
}

export default function PlayerSegmentation() {
  const [segments, setSegments] = useState(getInitialSegments)

  useEffect(() => {
    localStorage.setItem("segmentos", JSON.stringify(segments))
  }, [segments])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {segments.map((segment: any) => {
          const Icon = segment.icon as LucideIcon
          return (
            <Card key={segment.id} className={`bg-gradient-to-br ${segment.color}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {segment.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{segment.count}</div>
                <div className="flex items-center justify-between text-xs text-white/80">
                  <span>{segment.percentage}% do total</span>
                  <span>{segment.growth}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} 
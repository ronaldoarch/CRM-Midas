import { useState, useEffect } from "react"
import StatCard from "@/components/StatCard"
import { Users, Crown, AlertTriangle, TrendingDown, UserCheck } from "lucide-react"

export default function PlayerSegmentation() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/users").then(res => res.json()).then(setUsers)
  }, [])

  // Segmentação real
  const now = new Date()
  const novos = users.filter(u => {
    const created = u.created_at ? new Date(u.created_at) : null
    return created && (now.getTime() - created.getTime()) < 7 * 24 * 60 * 60 * 1000
  })
  const vip = users.filter(u => u.vip)
  const inativos = users.filter(u => {
    const last = u.last_login ? new Date(u.last_login) : null
    return !last || (now.getTime() - last.getTime()) > 30 * 24 * 60 * 60 * 1000
  })
  const churn = users.filter(u => {
    const last = u.last_login ? new Date(u.last_login) : null
    return !last || (now.getTime() - last.getTime()) > 60 * 24 * 60 * 60 * 1000
  })
  const regulares = users.length - novos.length - vip.length - inativos.length - churn.length

  const total = users.length || 1

  const segments = [
    {
      name: "Novos Jogadores",
      count: novos.length,
      percentage: Math.round((novos.length / total) * 100),
      icon: Users,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Jogadores VIP",
      count: vip.length,
      percentage: Math.round((vip.length / total) * 100),
      icon: Crown,
      color: "from-amber-500 to-yellow-500",
    },
    {
      name: "Jogadores Inativos",
      count: inativos.length,
      percentage: Math.round((inativos.length / total) * 100),
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
    },
    {
      name: "Churn Alto Risco",
      count: churn.length,
      percentage: Math.round((churn.length / total) * 100),
      icon: TrendingDown,
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Jogadores Regulares",
      count: regulares,
      percentage: Math.round((regulares / total) * 100),
      icon: UserCheck,
      color: "from-blue-500 to-blue-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {segments.map((segment) => {
          const Icon = segment.icon
          return (
            <StatCard
              key={segment.name}
              value={segment.count}
              label={`${segment.name} (${segment.percentage}% do total)`}
              icon={<Icon className="h-7 w-7" />}
              color={segment.color}
            />
          )
        })}
      </div>
    </div>
  )
} 
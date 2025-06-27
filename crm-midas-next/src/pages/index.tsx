import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StatCard from "@/components/StatCard"
import { Users, DollarSign, Crown, Bell } from "lucide-react"
import Analytics from "@/components/Analytics"
import PlayerSegmentation from "../components/PlayerSegmentation"
import CampaignManager from "@/components/CampaignManager"
import AlertCenter from "@/components/AlertCenter"
import ABTesting from "@/components/ABTesting"
import { useEffect, useState } from "react"
import usePageview from "../hooks/usePageview"

export default function Index() {
  usePageview();
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    fetch("/api/metrics")
      .then(res => res.json())
      .then(setMetrics)
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
        Casino CRM Pro
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          value={metrics ? metrics.totalUsers : "..."}
          label="Jogadores Ativos"
          icon={<Users className="h-7 w-7" />}
          color="from-emerald-500 to-emerald-600"
        />
        <StatCard
          value={metrics ? `R$ ${metrics.sumDeposits?.toLocaleString("pt-BR")}` : "..."}
          label={metrics ? `${metrics.totalDeposits} Depósitos` : "Total de Depósitos"}
          icon={<DollarSign className="h-7 w-7" />}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          value={metrics ? `R$ ${metrics.sumWithdrawals?.toLocaleString("pt-BR")}` : "..."}
          label={metrics ? `${metrics.totalWithdrawals} Saques` : "Total de Saques"}
          icon={<Crown className="h-7 w-7" />}
          color="from-amber-500 to-yellow-500"
        />
        <StatCard
          value={metrics ? metrics.totalBets : "..."}
          label={metrics ? `Total apostado: R$ ${metrics.sumBets?.toLocaleString("pt-BR")}` : "Apostas"}
          icon={<Bell className="h-7 w-7" />}
          color="from-purple-500 to-purple-600"
        />
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="segmentation" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
            Segmentação
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Campanhas
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
            Alertas
          </TabsTrigger>
          <TabsTrigger value="ab-testing" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            Teste A/B
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
        <TabsContent value="segmentation">
          <PlayerSegmentation />
        </TabsContent>
        <TabsContent value="campaigns">
          <CampaignManager />
        </TabsContent>
        <TabsContent value="alerts">
          <AlertCenter />
        </TabsContent>
        <TabsContent value="ab-testing">
          <ABTesting />
        </TabsContent>
      </Tabs>
    </div>
  )
} 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Crown, Bell } from "lucide-react"
import Analytics from "@/components/Analytics"
import PlayerSegmentation from "@/components/PlayerSegmentation"
import CampaignManager from "@/components/CampaignManager"
import AlertCenter from "@/components/AlertCenter"
import ABTesting from "@/components/ABTesting"

export default function Index() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
        Casino CRM Pro
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Jogadores Ativos</CardTitle>
            <Users className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2.847</div>
            <p className="text-xs text-emerald-100">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Faturamento Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">R$ 89,2 mil</div>
            <p className="text-xs text-blue-100">+8% em relação ao dia anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Conversão VIP</CardTitle>
            <Crown className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7,3%</div>
            <p className="text-xs text-amber-100">+2,1% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white">Campanhas Ativas</CardTitle>
            <Bell className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">15</div>
            <p className="text-xs text-purple-100">3 com alta performance</p>
          </CardContent>
        </Card>
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
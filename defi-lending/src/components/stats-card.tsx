import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: ReactNode
  changeNegative?: boolean
}

export function StatsCard({ title, value, change, icon, changeNegative = false }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeNegative ? "text-red-500" : "text-green-500"} flex items-center`}>{change}</p>
      </CardContent>
    </Card>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface InterestRatesChartProps {
  utilizationRate: number
  optimalUtilizationRate: number
  baseVariableBorrowRate: number
  variableRateSlope1: number
  variableRateSlope2: number
}

export function InterestRatesChart({
  utilizationRate,
  optimalUtilizationRate,
  baseVariableBorrowRate,
  variableRateSlope1,
  variableRateSlope2,
}: InterestRatesChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Définir la taille du canvas
    const width = canvas.width
    const height = canvas.height

    // Effacer le canvas
    ctx.clearRect(0, 0, width, height)

    // Définir les marges
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Dessiner les axes
    ctx.beginPath()
    ctx.moveTo(margin.left, height - margin.bottom)
    ctx.lineTo(width - margin.right, height - margin.bottom) // axe X
    ctx.moveTo(margin.left, margin.top)
    ctx.lineTo(margin.left, height - margin.bottom) // axe Y
    ctx.strokeStyle = "#94a3b8" // slate-400
    ctx.lineWidth = 1
    ctx.stroke()

    // Étiquettes des axes
    ctx.fillStyle = "#64748b" // slate-500
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("Taux d'utilisation (%)", width / 2, height - 5)

    ctx.save()
    ctx.translate(15, height / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.textAlign = "center"
    ctx.fillText("Taux d'intérêt (%)", 0, 0)
    ctx.restore()

    // Dessiner les graduations sur l'axe X
    for (let i = 0; i <= 100; i += 20) {
      const x = margin.left + (i / 100) * innerWidth
      ctx.beginPath()
      ctx.moveTo(x, height - margin.bottom)
      ctx.lineTo(x, height - margin.bottom + 5)
      ctx.stroke()
      ctx.fillText(i.toString(), x, height - margin.bottom + 15)
    }

    // Dessiner les graduations sur l'axe Y (de 0% à 30%)
    const maxRate = 30
    for (let i = 0; i <= maxRate; i += 5) {
      const y = height - margin.bottom - (i / maxRate) * innerHeight
      ctx.beginPath()
      ctx.moveTo(margin.left, y)
      ctx.lineTo(margin.left - 5, y)
      ctx.stroke()
      ctx.textAlign = "right"
      ctx.fillText(i.toString(), margin.left - 8, y + 3)
    }

    // Fonction pour calculer le taux d'emprunt variable en fonction du taux d'utilisation
    const calculateVariableBorrowRate = (utilization: number) => {
      if (utilization <= optimalUtilizationRate) {
        return baseVariableBorrowRate + (utilization / optimalUtilizationRate) * variableRateSlope1
      } else {
        return (
          baseVariableBorrowRate +
          variableRateSlope1 +
          ((utilization - optimalUtilizationRate) / (1 - optimalUtilizationRate)) * variableRateSlope2
        )
      }
    }

    // Fonction pour calculer le taux de dépôt en fonction du taux d'utilisation et du taux d'emprunt
    const calculateDepositRate = (utilization: number, borrowRate: number) => {
      return utilization * borrowRate * 0.8 // 80% des intérêts vont aux déposants
    }

    // Dessiner la courbe du taux d'emprunt variable
    ctx.beginPath()
    ctx.moveTo(margin.left, height - margin.bottom)

    for (let i = 0; i <= 100; i++) {
      const utilization = i / 100
      const rate = calculateVariableBorrowRate(utilization)
      const x = margin.left + utilization * innerWidth
      const y = height - margin.bottom - (Math.min(rate, maxRate) / maxRate) * innerHeight

      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = "#f43f5e" // rose-500
    ctx.lineWidth = 2
    ctx.stroke()

    // Dessiner la courbe du taux de dépôt
    ctx.beginPath()
    ctx.moveTo(margin.left, height - margin.bottom)

    for (let i = 0; i <= 100; i++) {
      const utilization = i / 100
      const borrowRate = calculateVariableBorrowRate(utilization)
      const depositRate = calculateDepositRate(utilization, borrowRate)
      const x = margin.left + utilization * innerWidth
      const y = height - margin.bottom - (Math.min(depositRate, maxRate) / maxRate) * innerHeight

      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = "#10b981" // emerald-500
    ctx.lineWidth = 2
    ctx.stroke()

    // Dessiner le taux d'utilisation actuel
    const currentX = margin.left + utilizationRate * innerWidth
    ctx.beginPath()
    ctx.moveTo(currentX, margin.top)
    ctx.lineTo(currentX, height - margin.bottom)
    ctx.setLineDash([5, 5])
    ctx.strokeStyle = "#6366f1" // indigo-500
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.setLineDash([])

    // Ajouter une légende
    const legendX = width - margin.right - 120
    const legendY = margin.top + 20

    // Taux d'emprunt
    ctx.beginPath()
    ctx.moveTo(legendX, legendY)
    ctx.lineTo(legendX + 20, legendY)
    ctx.strokeStyle = "#f43f5e" // rose-500
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = "#f43f5e"
    ctx.textAlign = "left"
    ctx.fillText("Taux d'emprunt", legendX + 25, legendY + 4)

    // Taux de dépôt
    ctx.beginPath()
    ctx.moveTo(legendX, legendY + 20)
    ctx.lineTo(legendX + 20, legendY + 20)
    ctx.strokeStyle = "#10b981" // emerald-500
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = "#10b981"
    ctx.textAlign = "left"
    ctx.fillText("Taux de dépôt", legendX + 25, legendY + 24)

    // Taux d'utilisation actuel
    ctx.beginPath()
    ctx.moveTo(legendX, legendY + 40)
    ctx.lineTo(legendX + 20, legendY + 40)
    ctx.setLineDash([5, 5])
    ctx.strokeStyle = "#6366f1" // indigo-500
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = "#6366f1"
    ctx.textAlign = "left"
    ctx.fillText("Utilisation actuelle", legendX + 25, legendY + 44)
  }, [utilizationRate, optimalUtilizationRate, baseVariableBorrowRate, variableRateSlope1, variableRateSlope2])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modèle de Taux d'Intérêt</CardTitle>
        <CardDescription>Visualisation des taux d'intérêt en fonction du taux d'utilisation du marché</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full">
          <canvas ref={canvasRef} width={600} height={300} className="w-full h-full" />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground">
            Taux d'utilisation actuel: {(utilizationRate * 100).toFixed(2)}%
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"

interface CollateralRatioIndicatorProps {
  currentRatio: number
  liquidationRatio: number
  safeRatio: number
}

export function CollateralRatioIndicator({ currentRatio, liquidationRatio, safeRatio }: CollateralRatioIndicatorProps) {
  // Calculer le pourcentage pour la barre de progression
  // Nous considérons que 0% est le ratio de liquidation et 100% est 2 fois le ratio sécurisé
  const maxRatio = safeRatio * 2
  const percentage = Math.min(((currentRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100, 100)

  // Déterminer le statut de santé
  const getHealthStatus = () => {
    if (currentRatio < liquidationRatio * 1.1) {
      return "danger"
    } else if (currentRatio < safeRatio) {
      return "warning"
    } else {
      return "safe"
    }
  }

  const healthStatus = getHealthStatus()

  // Déterminer la couleur de la barre de progression
  const getProgressColor = () => {
    switch (healthStatus) {
      case "danger":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      case "safe":
        return "bg-green-500"
      default:
        return "bg-green-500"
    }
  }

  // Calculer la distance à la liquidation
  const distanceToLiquidation = (((currentRatio - liquidationRatio) / liquidationRatio) * 100).toFixed(1)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">Ratio de Collatéralisation</span>
          {healthStatus === "danger" && <AlertCircle className="h-4 w-4 text-red-500" />}
          {healthStatus === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
          {healthStatus === "safe" && <CheckCircle className="h-4 w-4 text-green-500" />}
        </div>
        <span className="font-bold">{currentRatio.toFixed(2)}%</span>
      </div>

      <div className="relative pt-1">
        <Progress value={percentage} className="h-2" indicatorClassName={getProgressColor()} />

        {/* Marqueur pour le ratio de liquidation */}
        <div
          className="absolute bottom-0 w-0.5 h-3 bg-red-500"
          style={{ left: `${((liquidationRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100}%` }}
        />
        <span
          className="absolute text-xs text-red-500 -bottom-5"
          style={{
            left: `${((liquidationRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {liquidationRatio}%
        </span>

        {/* Marqueur pour le ratio sécurisé */}
        <div
          className="absolute bottom-0 w-0.5 h-3 bg-green-500"
          style={{ left: `${((safeRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100}%` }}
        />
        <span
          className="absolute text-xs text-green-500 -bottom-5"
          style={{
            left: `${((safeRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100}%`,
            transform: "translateX(-50%)",
          }}
        >
          {safeRatio}%
        </span>
      </div>

      {healthStatus === "danger" && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Risque élevé de liquidation ! Votre position est à seulement {distanceToLiquidation}% du seuil de
            liquidation.
          </AlertDescription>
        </Alert>
      )}

      {healthStatus === "warning" && (
        <Alert variant="warning" className="mt-2 border-yellow-500 text-yellow-700">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Attention : Votre ratio est inférieur au niveau recommandé. Envisagez d'ajouter du collatéral.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

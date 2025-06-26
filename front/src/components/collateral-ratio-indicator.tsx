'use client';

import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface CollateralRatioIndicatorProps {
  currentRatio: number;
  liquidationRatio: number;
  safeRatio: number;
}

export function CollateralRatioIndicator({
  currentRatio,
  liquidationRatio,
  safeRatio,
}: CollateralRatioIndicatorProps) {
  // Calculer le pourcentage pour la barre de progression
  // Nous considérons que 0% est le ratio de liquidation et 100% est 2 fois le ratio sécurisé
  const maxRatio = safeRatio * 2;
  const percentage = Math.min(
    ((currentRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100,
    100
  );

  // Déterminer le statut de santé
  const getHealthStatus = () => {
    if (currentRatio < liquidationRatio * 1.1) {
      return 'danger';
    }
    if (currentRatio < safeRatio) {
      return 'warning';
    }
    return 'safe';
  };

  const healthStatus = getHealthStatus();

  // Déterminer la couleur de la barre de progression
  const getProgressColor = () => {
    switch (healthStatus) {
      case 'danger':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'safe':
        return 'bg-green-500';
      default:
        return 'bg-green-500';
    }
  };

  // Calculer la distance à la liquidation
  const distanceToLiquidation = (
    ((currentRatio - liquidationRatio) / liquidationRatio) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">Ratio de Collatéralisation</span>
          {healthStatus === 'danger' && (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
          {healthStatus === 'warning' && (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          )}
          {healthStatus === 'safe' && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </div>
        <span className="font-bold">{currentRatio.toFixed(2)}%</span>
      </div>

      <div className="relative pt-1">
        <div className="relative">
          <Progress className="h-2" value={percentage} />
          <div
            className={`absolute top-0 left-0 h-2 rounded-full transition-all ${getProgressColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Marqueur pour le ratio de liquidation */}
        <div
          className="absolute bottom-0 h-3 w-0.5 bg-red-500"
          style={{
            left: `${((liquidationRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100}%`,
          }}
        />
        <span
          className="-bottom-5 absolute text-red-500 text-xs"
          style={{
            left: `${((liquidationRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {liquidationRatio}%
        </span>

        {/* Marqueur pour le ratio sécurisé */}
        <div
          className="absolute bottom-0 h-3 w-0.5 bg-green-500"
          style={{
            left: `${((safeRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100}%`,
          }}
        />
        <span
          className="-bottom-5 absolute text-green-500 text-xs"
          style={{
            left: `${((safeRatio - liquidationRatio) / (maxRatio - liquidationRatio)) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {safeRatio}%
        </span>
      </div>

      {healthStatus === 'danger' && (
        <Alert className="mt-2" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Risque élevé de liquidation ! Votre position est à seulement{' '}
            {distanceToLiquidation}% du seuil de liquidation.
          </AlertDescription>
        </Alert>
      )}

      {healthStatus === 'warning' && (
        <Alert
          className="mt-2 border-yellow-500 bg-yellow-50 text-yellow-700"
          variant="default"
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Attention : Votre ratio est inférieur au niveau recommandé.
            Envisagez d'ajouter du collatéral.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

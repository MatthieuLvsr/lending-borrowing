
// ABI simplifié pour un contrat de prêt décentralisé
export const LENDING_CONTRACT_ABI = [
  // Fonctions de lecture
  "function getAccountData(address user) view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)",
  "function getUserReserveData(address reserve, address user) view returns (uint256 currentATokenBalance, uint256 currentStableDebt, uint256 currentVariableDebt, uint256 principalStableDebt, uint256 scaledVariableDebt, uint256 stableBorrowRate, uint256 liquidityRate, uint40 stableRateLastUpdated, bool usageAsCollateralEnabled)",
  "function getReserveData(address asset) view returns (uint256 availableLiquidity, uint256 totalStableDebt, uint256 totalVariableDebt, uint256 liquidityRate, uint256 variableBorrowRate, uint256 stableBorrowRate, uint256 averageStableBorrowRate, uint256 liquidityIndex, uint256 variableBorrowIndex, uint40 lastUpdateTimestamp)",

  // Fonctions d'écriture
  "function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
  "function withdraw(address asset, uint256 amount, address to)",
  "function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf)",
  "function repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf)",
]

// Adresse du contrat (à remplacer par l'adresse réelle)
export const LENDING_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"

// Fonction pour obtenir une instance du contrat

// Types pour les données du compte
export interface AccountData {
  totalCollateralETH: string
  totalDebtETH: string
  availableBorrowsETH: string
  currentLiquidationThreshold: number
  ltv: number
  healthFactor: string
}

// Types pour les données de réserve de l'utilisateur
export interface UserReserveData {
  currentATokenBalance: string
  currentStableDebt: string
  currentVariableDebt: string
  principalStableDebt: string
  scaledVariableDebt: string
  stableBorrowRate: string
  liquidityRate: string
  stableRateLastUpdated: number
  usageAsCollateralEnabled: boolean
}

// Types pour les données de réserve
export interface ReserveData {
  availableLiquidity: string
  totalStableDebt: string
  totalVariableDebt: string
  liquidityRate: string
  variableBorrowRate: string
  stableBorrowRate: string
  averageStableBorrowRate: string
  liquidityIndex: string
  variableBorrowIndex: string
  lastUpdateTimestamp: number
}

// Fonction pour formater les données du compte


// Fonction pour calculer le ratio de collatéralisation
export const calculateCollateralRatio = (totalCollateralETH: string, totalDebtETH: string): number => {
  if (Number(totalDebtETH) === 0) return Number.POSITIVE_INFINITY
  return (Number(totalCollateralETH) / Number(totalDebtETH)) * 100
}

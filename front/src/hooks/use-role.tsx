import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getUserRoles } from '@/lib/role.action';

export function useRole() {
  const { address } = useAccount();
  const [roles, setRoles] = useState<{
    isAdmin: boolean;
    isLending: boolean;
    isGovernor: boolean;
    isLiquidator: boolean;
  }>({
    isAdmin: false,
    isLending: false,
    isGovernor: false,
    isLiquidator: false,
  });

  useEffect(() => {
    if (!address) {
      return;
    }
    getUserRoles(address).then((_roles) => setRoles(_roles));
  }, [address]);

  return roles;
}

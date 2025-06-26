'use client';

import { useRole } from '@/hooks/use-role';
import { NewPoolModal } from './new-pool-modal';
import { Button } from './ui/button';

export const NewPoolButton = () => {
  const { isGovernor } = useRole();
  if (!isGovernor) {
    return;
  }
  return <NewPoolModal trigger={<Button>New pool</Button>} />;
};

'use server';

import { readContract } from '@wagmi/core';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { protocolAccessControlAbi } from '@/generated';
import { PROTOCOL_ACCESS_CONTROL } from './contracts';
import { config } from './wallet';

const getDefaultAdminRole = async () => {
  'use cache';
  cacheLife('max');
  const result = await readContract(config, {
    abi: protocolAccessControlAbi,
    address: PROTOCOL_ACCESS_CONTROL,
    functionName: 'DEFAULT_ADMIN_ROLE',
  });
  return result;
};

export const isAdmin = async (address: `0x${string}`) => {
  const result = await readContract(config, {
    address: PROTOCOL_ACCESS_CONTROL,
    abi: protocolAccessControlAbi,
    functionName: 'hasRole',
    args: [await getDefaultAdminRole(), address],
  });
  return result;
};

const getGovernorRole = async () => {
  'use cache';
  cacheLife('max');
  const result = await readContract(config, {
    abi: protocolAccessControlAbi,
    address: PROTOCOL_ACCESS_CONTROL,
    functionName: 'GOVERNOR_ROLE',
  });
  return result;
};

export const isGovernor = async (address: `0x${string}`) => {
  const result = await readContract(config, {
    address: PROTOCOL_ACCESS_CONTROL,
    abi: protocolAccessControlAbi,
    functionName: 'hasRole',
    args: [await getGovernorRole(), address],
  });
  return result;
};

const getLendingRole = async () => {
  'use cache';
  cacheLife('max');
  const result = await readContract(config, {
    abi: protocolAccessControlAbi,
    address: PROTOCOL_ACCESS_CONTROL,
    functionName: 'LENDING_ROLE',
  });
  return result;
};

export const isLending = async (address: `0x${string}`) => {
  const result = await readContract(config, {
    address: PROTOCOL_ACCESS_CONTROL,
    abi: protocolAccessControlAbi,
    functionName: 'hasRole',
    args: [await getLendingRole(), address],
  });
  return result;
};

const getLiquidatorRole = async () => {
  'use cache';
  cacheLife('max');
  const result = await readContract(config, {
    abi: protocolAccessControlAbi,
    address: PROTOCOL_ACCESS_CONTROL,
    functionName: 'LIQUIDATOR_ROLE',
  });
  return result;
};

export const isLiquidator = async (address: `0x${string}`) => {
  const result = await readContract(config, {
    address: PROTOCOL_ACCESS_CONTROL,
    abi: protocolAccessControlAbi,
    functionName: 'hasRole',
    args: [await getLiquidatorRole(), address],
  });
  return result;
};

export const getUserRoles = async (address: `0x${string}`) => {
  const [adminResult, governorResult, lendingResult, liquidatorResult] =
    await Promise.all([
      isAdmin(address),
      isGovernor(address),
      isLending(address),
      isLiquidator(address),
    ]);

  const roles = {
    isAdmin: adminResult,
    isGovernor: governorResult,
    isLending: lendingResult,
    isLiquidator: liquidatorResult,
  };
  return roles;
};

'use server';

import { cookies } from 'next/headers';
import { AppMenuItem } from '@/types';

export async function getUserMenu(): Promise<AppMenuItem[]> {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  //if (!token) return [];

  const fullMenu = [] as AppMenuItem[];

  return fullMenu;
};

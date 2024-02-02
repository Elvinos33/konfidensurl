import Front from './front';
import { getAllUsers, validateUser } from '@/lib/login';
import { cookies } from 'next/headers';

export default async function Page() {
  const users = await getAllUsers();
  const session = await validateUser(cookies().get('token')?.value);
  console.log('Session:', session.token);
  return <Front users={users} />;
}

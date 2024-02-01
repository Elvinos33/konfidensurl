import Front from './front';
import { getAllUsers } from '@/lib/login';

export default async function Page() {
  const users = await getAllUsers();
  return <Front users={users} />;
}

import Front from './front';
import { getAllLinks } from '@/lib/links';
import { getAllUsers } from '@/lib/login';

export default async function Page() {
  const links = await getAllLinks();
  const users = await getAllUsers();
  return <Front links={links} users={users} />;
}

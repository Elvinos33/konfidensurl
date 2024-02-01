import Front from './front';
import { getAllLinks, getAllUsers } from '@/lib/links';

export default async function Page() {
  const links = await getAllLinks();
  const users = await getAllUsers();
  return <Front links={links} users={users} />;
}

import Front from './front';
import { getAllLinks } from '../lib/links';

export default async function Page() {
  const links = await getAllLinks();
  return <Front links={links} />;
}

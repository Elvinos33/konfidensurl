import Redirect from '@/components/Redirect';
import { getLink, incrementClicks } from '@/lib/links';

export default async function Home() {
  const link = await getLink('');

  await incrementClicks('');
  return (
    <main className='absolute inset-0 bg-white'>
      <Redirect url={link?.url} />
    </main>
  );
}

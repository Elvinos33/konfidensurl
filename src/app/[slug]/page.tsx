import Redirect from '@/components/Redirect';
import { getLink, incrementClicks } from '@/lib/links';

export default async function Page({ params }: { params: { slug: string } }) {
  const link = await getLink(params.slug);

  await incrementClicks(params.slug);

  return <Redirect url={link?.url} />;
}

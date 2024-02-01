import { permanentRedirect } from 'next/navigation';
import { getLink } from '../lib/links';

export default async function Page({ params }: { params: { slug: string } }) {
  const link = await getLink(params.slug);
  if (!link)
    return (
      <h1 className='text-4xl'>
        404: did not find url for {params.slug} in database
      </h1>
    );
  permanentRedirect(link.url);
}

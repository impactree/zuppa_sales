import SignInForm from '@/components/SignInForm/SignInForm';
import { headers } from 'next/headers';

export default async function page() {
  const headersList = headers();
  const host = headersList.get('host');
  const slug = host?.split('.')[0] ?? '';

  return <SignInForm slug={slug} />;
}

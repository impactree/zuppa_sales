import ResetPasswordForm from '@/components/ResetPasswordForm/ResetPasswordForm';
import { headers } from 'next/headers';

export default async function page({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const headersList = headers();
  const host = headersList.get('host');
  const slug = host?.split('.')[0] ?? '';

  return <ResetPasswordForm slug={slug} token={searchParams?.token} />;
}

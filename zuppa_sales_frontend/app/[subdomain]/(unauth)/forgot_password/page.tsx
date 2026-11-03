import ForgotPasswordForm from '@/components/ForgotPasswordForm/ForgotPasswordForm';
import { headers } from 'next/headers';

export default async function page() {
  const headersList = headers();
  const host = headersList.get('host');
  const slug = host?.split('.')[0] ?? '';

  return <ForgotPasswordForm slug={slug} />;
}

/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
// 'use client';

import PlateEditor from '@/components/ui/plate-editor';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
// import { Download } from 'lucide-react';

export default async function IndexPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;
  const documentId = params.id; // Report ID from URL

  return <PlateEditor token={token} apiKey={apiKey} documentId={documentId} />;
}

import { AuthService } from '@/lib/service';
import { redirect } from 'next/navigation';

export default async function page({ searchParams }: { searchParams: { token: string } }) {
  const res = await AuthService.tokenVerify(searchParams?.token);
  const { success } = res?.data as {
    success: boolean;
  };

  if (success) {
    return redirect('/sign_in');
  }
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center fs-3 text-danger">
      Account is Activated
    </div>
  );
}

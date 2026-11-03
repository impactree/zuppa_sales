'use client';

import { AuthService } from '@/lib/service';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';

interface SkipButtonProps {
  apiKey: string;
  type: 'standard' | 'invite' | 'plan' | 'business_unit' | undefined;
}

export default function SkipButton({ apiKey, type }: SkipButtonProps) {
  const router = useRouter();

  const getNextRoute = () => {
    switch (type) {
      case 'standard':
        return '/company_profile/invite_user';
      case 'business_unit':
        return '/company_profile/standard_regulations';
      case 'invite':
        return '/home';
      // case 'plan':
      //   return '/home';
      default:
        return '/company_profile/business_unit';
    }
  };

  const handleSkipClick = async () => {
    const response = await AuthService.updateOnboarding(apiKey, type);
    const { success } = response?.data as { success: boolean };
    if (success) {
      const nextRoute = getNextRoute();
      router.push(nextRoute);
    } else {
      toast.error('Something went wrong, please try again later');
    }
  };

  return (
    // <Button
    //   onClick={handleSkipClick}
    //   text="Skip, Do it Later!"
    //   className="text-center mt-3 w-100"
    //   isLink
    //   isSolid
    // />
    <Button
      className="btn btn-link text-decoration-none textPrimary text-center fw-600 mt-0 fs-15 w-100 skip-btn"
      onClick={handleSkipClick}
    >
      <span className="fw700" style={{ color: '#e9af25' }}>
        Skip
      </span>
      <span className="textPrimary fw700">, Do it Later!</span>
    </Button>
  );
}

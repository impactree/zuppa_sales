'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useUser } from '../Context/userProvider';
import { Loader } from '../Loader/Loader';
import PageNotFound from '../PageNotFound/PageNotFound';

interface AccessWrapperProps {
  module: string;
  feature: string;
  children: ReactNode;
}

const AccessWrapper = ({
  module,
  feature,
  children,
}: AccessWrapperProps) => {
  const context = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!context?.currentRole) {
        await context?.getCurrentUser();
      }
      setLoading(false);
    };

    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !context?.currentRole) {
    return <Loader />;
  }

  const hasAccess = context.currentRole[module]?.includes(feature);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return hasAccess ? <>{children}</> : <PageNotFound isAccessDenied />;
};

export default AccessWrapper;

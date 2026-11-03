/* eslint-disable max-len */

'use client';

import blueCube from '@/assests/cube login.gif';
import rubicrDashboardLogo from '@/assests/rubic-logo-white 2.png';
import appLogoMobile from '@/assests/RubiCrLogo 2.png';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { AuthService } from '@/lib/service';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';
import { Button } from '../Button/Button';
import MultiStepProgressBar from '../MultiStepProgressBar/MultiStepProgressBar';
import './AuthLayout.css';
import LandingLayout from './LandingLayout';

export function AuthLayout({
  children,
  slug,
}: Readonly<{
  children: ReactNode;
  slug: string;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, isMobileOnly } = useDeviceDetection();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkZoom = () => {
      const zoom = Math.round((window.devicePixelRatio || 1) * 100);
      const page = containerRef.current;

      if (page) {
        if (zoom > 110) {
          page.classList.remove('align-items-center');
          page.style.paddingTop = '5rem';
          page.style.marginBottom = '2rem';
        } else if (!page.classList.contains('align-items-center')) {
          page.classList.add('align-items-center');
          page.style.paddingTop = '0rem';
          page.style.marginBottom = '0rem';
        }
      }
    };

    checkZoom();
    window.addEventListener('resize', checkZoom);

    return () => {
      window.removeEventListener('resize', checkZoom);
    };
  }, []);

  const isSignIn = ['/sign_in', '/forgot_password', '/reset_password'].some(
    (path) => pathname.startsWith(path),
  );
  const isSignUp = [
    '/sign_up',
    '/accept_invitation',
    '/email_verify',
    '/terms_of_service',
    '/privacy_policy',
    '/confirm_account',
  ].some((path) => pathname.startsWith(path));
  const isAuthorized = ['/company_profile'].some((path) => pathname.startsWith(path));

  const isLanding = [
    '/users',
    '/settings',
    '/home',
    '/data_cubes',
    '/tasks',
    '/report',
    '/insights/analytics',
    '/insights/department_dashboard',
    '/insights/standard_dashboard',
    '/insights/custom_dashboard/view',
    '/insights/custom_dashboard/create',
    '/disclosure/general',
    '/disclosure/management',
    '/disclosure/miscellaneous',
    '/disclosure/stakeholder_identification',
    '/disclosure/impact_assessment',
    // '/analytics',
    '/department_dashboard',
    '/editor',
    '/access_denied',
  ].some((path) => pathname.startsWith(path));

  const renderAuthButton = () => {
    if (isAuthorized && !isSignUp) {
      return (
        <div>
          <Button
            onClick={async () => {
              await AuthService.logout({ slug });
              await signOut({ redirect: false });
              router.refresh();
              router.push('/sign_in');
            }}
            text="Logout!"
            isDanger
          />
        </div>
      );
    }
    return isSignUp
      || pathname === '/forgot_password'
      || pathname.includes('reset_password') ? (
        <Button
          onClick={() => router.push('/sign_in')}
          text="Sign In"
          className="mt-1"
          isSolid
        />
      ) : (
        <Button
          onClick={() => router.push('/sign_up')}
          text="Sign up"
          className="mt-1"
          isSolid
        />
      );
  };

  return (
    <main className="layout-container position-relative">
      {(isAuthorized || pathname.startsWith('/company_profile')) && (
        <div className="pt-5 h-100">
          <div
            className={`header-container p-3 w-100 ${!pathname.startsWith('/company_profile') ? '' : ''}`}
          >
            <div aria-hidden="true" onClick={() => router.push('/sign_in')}>
              <Image
                src={appLogoMobile}
                alt="App Logo"
                width={isMobile ? 110 : 130}
              />
            </div>

            {renderAuthButton()}
          </div>
          <div className="pb-0">
            <div className="w-100 py-5 my-3 company-profile-progress-header">
              <MultiStepProgressBar />
            </div>
            <div className="animated-element">{children}</div>
          </div>
        </div>
      )}
      {(isLanding || pathname.startsWith('/home')) && (
        <LandingLayout>{children}</LandingLayout>
      )}
      {(isSignUp || isSignIn) && (
        <div className="row layout-container-row position-relative overflow-x-hidden">
          <div
            aria-hidden="true"
            onClick={() => router.push('/sign_in')}
            className={isMobile ? 'logo-mobile' : 'container-product-logo'}
          >
            <Image
              // src={isMobile ? appLogoMobile : appLogo}
              src={isMobile ? appLogoMobile : rubicrDashboardLogo}
              alt="App Logo"
              width={isMobile ? 110 : 130}
            />
          </div>
          <div className="col-12 col-lg-6  p-0 vh-100 d-none d-lg-block">
            {/* <div className="position-relative h-100 d-flex justify-content-center align-items-center layout-column"> */}
            <Image
              // src={greenGlobe}
              src={blueCube}
              alt="Green Globe"
              className="globe-opacity h-100 img-fluid"
              // width={400}
            />
            {/* </div> */}
          </div>
          <div className="col-12 col-lg-6  p-0 vh-100 ">
            <div
              ref={containerRef}
              className={`position-relative vh-100 w-100 overflow-y-scroll d-flex justify-content-center right-panel ${(pathname.startsWith('/sign_up') || pathname.startsWith('/accept_invitation')) && isMobileOnly ? 'align-items-start' : 'align-items-center'}`}
            >
              <div className="animated-element  px-3 pb-5 pb-md-0">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

import { useEffect, useState } from 'react';
import {
  isDesktop as detectDesktop,
  isIOS as detectIos,
  isMobile as detectMobile,
  isMobileOnly as detectMobileOnly,
  isTablet as detectTablet,
} from 'react-device-detect';

export const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOnly, setIsMobileOnly] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsMobile(detectMobile);
    setIsMobileOnly(detectMobileOnly);
    setIsTablet(detectTablet);
    setIsDesktop(detectDesktop);
    setIsIOS(detectIos);
  }, []);

  return {
    isMobile, isMobileOnly, isTablet, isDesktop, isIOS,
  };
};

import { useImperativeHandle, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

import type { SharedRef } from '../types/Reftype';
import { sharedRef } from '../utils/sharedRef';

const NavigationBridge = ({ ref }: { ref: RefObject<SharedRef | null> }) => {
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    navigate: (path: string) => {
      navigate(path);
    },
  }));

  return null;
};

export const NavigationBridgeComponent = () => {
  return <NavigationBridge ref={sharedRef} />;
};

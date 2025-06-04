import { useState } from 'react';

function useToggle() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return { isOpen, toggle, setIsOpen };
}

export default useToggle;

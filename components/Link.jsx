import { useState, useEffect } from 'react';
import NextLink from 'next/link';

export const Link = ({
  children,
  classNames = '',
  activeClassName = '',
  href = '#',
  c,
  isActive = false,
  onClick = (e) => {},
}) => {
  const [className, setClassName] = useState(classNames);
  const [linkIsActive, setLinkIsActive] = useState(isActive);

  useEffect(() => {
    const newClassName = isActive
      ? `${classNames} ${activeClassName}`.trim()
      : classNames;
    setClassName(newClassName);
    setLinkIsActive(isActive);
  }, [isActive]);

  return (
    <NextLink href={href} passHref>
      <a
        onClick={onClick}
        className={`inline-block w-full text-center ${className}`}
      >
        {children}
      </a>
    </NextLink>
  );
};

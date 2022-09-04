import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export const Link = ({
  children,
  classNames = '',
  activeClassName = '',
  href = '#',
  onClick = (e) => {},
}) => {
  const { asPath, pathname } = useRouter();
  const [className, setClassName] = useState(classNames);
  const normalizedHref = href.startsWith('/') ? href : '/' + href;

  useEffect(() => {
    const newClassName =
      pathname === normalizedHref || asPath === normalizedHref
        ? `${classNames} ${activeClassName}`.trim()
        : classNames;

    if (newClassName !== className) {
      setClassName(newClassName);
    }
  }, [asPath, pathname, href, classNames, activeClassName]);

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

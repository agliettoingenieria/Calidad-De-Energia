import { useState } from 'react';
import { Link } from './Link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const ListItem = ({ children, className }) => {
  return (
    <li className={'transition-colors duration-100 ' + className}>
      {children}
    </li>
  );
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed inset-0 max-h-20 h-20 bg-slate-900 z-40">
      <ul className="flex justify-between items-center h-full px-4 gap-4">
        <ListItem className="w-fit">
          <Link href="/">
            <Image src="/images/logo/logo.jfif" width={'180'} height={'80'} />
          </Link>
        </ListItem>
        <li
          className={`before:fixed ${
            isOpen ? 'before:inline-block' : 'before:hidden'
          } before-content-[''] before:left-0 
          before:top-0 before:w-full before:h-full before:opacity-80 before:bg-zinc-900 md:before:hidden md:w-3/4`}
        >
          <ul
            className={`absolute w-full ${
              isOpen ? 'right-0' : 'right-full'
            } top-32 flex flex-col gap-4 items-center md:relative md:right-0 md:top-0 md:flex-row md:justify-end`}
          >
            <ListItem className="w-9/12 text-center md:w-1/5">
              <Link
                activeClassName="bg-blue-600"
                classNames="py-2 md:hover:bg-blue-800 rounded-md"
                href="/"
                isActive={router.pathname === '/'}
              >
                Inicio
              </Link>
            </ListItem>
            {/* <ListItem className="w-9/12 text-center md:w-1/5">
              <Link
                activeClassName="bg-blue-600"
                classNames="py-2 md:hover:bg-blue-800 rounded-md"
                href="/#22"
              >
                Benimalist
              </Link>
            </ListItem> */}
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="py-2 px-4 ring-2 ring-pink-500 ring-inset isolate z-40 md:hidden"
          >
            {!isOpen ? 'Open' : 'Close'}
          </button>
        </li>
      </ul>
    </header>
  );
};

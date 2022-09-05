import { useState } from 'react';
import { ListItem } from './Header';
import { Link } from './Link';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav
        className={`${
          isOpen ? 'fixed' : 'hidden'
        } flex flex-col w-screen left-0 top-0 items-center justify-self-center
			${
        isOpen ? 'before:absolute' : 'before:hidden'
      } before:w-full before:h-screen before:bg-neutral-900 before:opacity-80 z-10
			md:before:hidden md:sticky md:top-20 md:p-4 md:h-fit md:w-fit md:inline-block
			`}
      >
        <aside className="relative top-32 w-9/12 md:w-fit md:top-0">
          <ol className={`flex flex-col gap-4`}>
            <ListItem className="w-full">
              <Link
                activeClassName="bg-blue-600 md:hover:bg-blue-800"
                classNames="py-1 px-2 md:hover:bg-blue-900 rounded-md"
                href="#ceop"
              >
                CEOP
                <div className="bg-indigo-700"></div>
              </Link>
            </ListItem>
            <ListItem className="w-full">
              <Link
                activeClassName="bg-blue-600 md:hover:bg-blue-800"
                classNames="py-1 px-2 md:hover:bg-blue-900 rounded-md"
                href="#protecciones"
              >
                Protecciones
              </Link>
            </ListItem>
          </ol>
        </aside>
      </nav>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 px-4 py-2 rounded-md bg-red-400 isolate z-40 md:hidden"
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
    </>
  );
};

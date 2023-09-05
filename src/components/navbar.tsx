"use client"
import { usePathname } from 'next/navigation';
import { FC} from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ui/theme-toggle';
import { Button } from './ui/button';
import { UserButton } from '@clerk/nextjs';

interface NavbarProps {
  isLogin:boolean
}

const Links = [
  { id: 2, href: '/categories', title: 'Categories' },
  { id: 4, href: '/products', title: 'Products' },
];

const Navbar: FC<NavbarProps> = ({isLogin}) => {
  const pathname=usePathname()
  
 
 
  

  return (
    <div className="h-16 w-screen border flex items-center px-7 justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <h1 className="text-xl font-bold">SNX</h1>
        </Link>

        {Links.map((link) => (
          <Link key={link.id} href={link.href}>
            <p
              className={`text-sm transition-all ${
                pathname === link.href ? 'text-primary font-medium' : 'text-gray-400 hover:text-primary hover:font-medium'
              }`}
            >
              {link.title}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {isLogin ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Button variant={'outline'}>Sign in</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

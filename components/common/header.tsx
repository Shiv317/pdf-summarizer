import { FileText } from 'lucide-react';
import NavLink from './nav-link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import PlanBadge from '@/components/common/plan-badge';

export default function Header() {
  
  return (
    <nav className="container flex items-center 
    justify-between py-4 px-4 lg:px-8 mx-auto">
      {/* Left: Logo */}
      <div className="flex lg:flex-1 text-lg font-semibold">
      <NavLink href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
        <FileText className="w-5 h-5 lg:w-6 lg:h-6
         text-gray-900 hover:rotate-12 transform 
         transition duration-300 ease-in-out" />
       <span className="font-extrabold
       lg:text-xl text-gray-900">
        Summarizer.ai
       </span>
      </NavLink>
      </div>

      {/* Center: Pricing */}
      <div className="flex lg:justify-center gap-4 lg:gap-12
      lg:items-center text-center text-base font-medium">
        <NavLink href="/#pricing">Pricing</NavLink>
         <SignedIn>
          <NavLink href="/dashboard"> Your Summary </NavLink> 
         </SignedIn>
      </div>

      {/* Right: Sign in */}
      <div className="flex lg:flex-1 justify-end text-base font-medium">
        
            <SignedIn>
            <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <PlanBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
            </SignedIn>
           
            <SignedOut>
            <NavLink href="/sign-in">Sign in</NavLink>
            </SignedOut>
          
        </div>
    </nav>
  );
}

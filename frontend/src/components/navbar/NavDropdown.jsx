import {useRouter} from 'next/navigation';
import {usePathname} from 'next/navigation';

import Link from 'next/link';

import {LogOut, Settings, LibraryBig} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {logout} from '@/lib/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProfileDropdown = ({profile, setIsAuthenticated}) => {
  const pathname = usePathname ();
  const router = useRouter ();
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Avatar className="border-slate-300">
          {profile &&
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${profile.avatar_url}`}
            />}
          <AvatarFallback className="bg-gradient-to-r from-green-300 to-green-700 text-black">
            CN
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className={
            pathname === '/books'
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline'
          }
        >

          <Link href="/books">
            <LibraryBig className="mr-2 h-4 w-4" />

            <span>Books</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className={
            pathname.startsWith ('/settings')
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline'
          }
        >
          <Link href="/settings/profile">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <button
            className="flex w-full"
            onClick={async () => {
              try {
                await logout (); 
                setIsAuthenticated (false); // Update the authentication state
                router.push ('/'); // Redirect to the home page
              } catch (error) {
                console.error ('Error during logout:', error);
                // Optionally, handle the error state
              }
            }}
          >
            <LogOut className="mr-2 h-4 w-4" color="red" />
            <span>Logout</span>

          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;

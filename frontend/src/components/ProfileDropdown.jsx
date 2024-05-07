import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { LogOut, User, LibraryBig } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/lib/actions';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProfileDropdown = ({ profile, setIsAuthenticated }) => {
    const router = useRouter();
    return <DropdownMenu >

        <DropdownMenuTrigger asChild>

            <Avatar className="border-slate-300">
                {profile &&
                    <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${profile.avatar_url}`}
                    />}
                <AvatarFallback className="bg-gradient-to-r from-green-300 to-green-700 text-black">CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/profile">
                <User className="mr-2 h-4 w-4" />

                    <span>Profile</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>

                <Link href="/books">
                <LibraryBig className="mr-2 h-4 w-4" />

                    <span>Books</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <button
                    className="flex"
                    onClick={async () => {
                        await logout();
                        setIsAuthenticated(false);
                        router.push('/');
                    }}
                >
                    <LogOut className="mr-2 h-4 w-4" color="red" />
                    <span>Logout</span>

                </button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

}

export default ProfileDropdown;
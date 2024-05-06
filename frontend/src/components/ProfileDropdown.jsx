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
    return <DropdownMenu>

        <DropdownMenuTrigger>

            <Avatar>
                {profile &&
                    <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${profile.avatar_url}`}
                    />}
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/profile">

                    <span>Profile</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>

                <LibraryBig className="mr-2 h-4 w-4" />
                <Link href="/books">

                    <span>Books</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
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
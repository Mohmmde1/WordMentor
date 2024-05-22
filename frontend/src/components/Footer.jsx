import Link from "next/link";
import { Icons } from "@/components/icons";

export default function MainFooter() {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            {/* Left side of the footer */}
            <div className="flex items-center space-x-2">
              <Icons.logo className="h-6 w-6" />
              <span className="font-semibold text-lg">WordMentor</span>
            </div>
  
            {/* Right side of the footer */}
            <div>
              {/* Add any footer links or content here */}
              <ul className="flex space-x-4">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Additional footer content, such as copyright notice */}
          <div className="mt-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} WordMentor. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  
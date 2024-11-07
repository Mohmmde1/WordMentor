export const dynamic = 'force-dynamic'
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import MainFooter from '@/app/_components/Footer';
import { MainNav } from '@/app/_components/navbar/Navbar';
import { ThemeProvider } from '@/app/_components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Word Mentor',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">

            <MainNav />
            <main className='mb-auto'>{children}</main>

            <MainFooter />
            <Toaster className="top-right" />
          </div>
        </ThemeProvider>
      </body>

    </html>
  );
}

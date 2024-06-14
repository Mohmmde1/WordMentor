'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function FlashcardsLayout({ children }) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  return (
    <div className="flex flex-col justify-center align-middle m-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            return (
              <div key={href} className="flex items-center">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <span>{segment}</span>
                  ) : (
                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

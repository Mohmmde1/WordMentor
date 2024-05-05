import {Skeleton} from '@/components/ui/skeleton';


export default function ProfileFormSkeleton () {
  return (
    <div className="space-y-8">
      <FormField />
      <FormField />
      <FormField />
      <FormField />
      <ButtonSkeleton />
    </div>
  );
}

// Helper components
function FormField () {
  return (
    <div className='space-y-3'>
      <Skeleton className="h-14" />
      <Skeleton className="h-4" />
    </div>
  );
}

function ButtonSkeleton () {
  return <Skeleton className="h-8 w-24" />;
}

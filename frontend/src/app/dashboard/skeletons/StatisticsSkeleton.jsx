import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component for placeholders
import { Book, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const cardData = [
    { id: 'learning-01-chunk-0', title: 'Known Words', icon: CheckCircle },
    { id: 'learning-01-chunk-1', title: 'Unknown Words', icon: Book },
    { id: 'learning-01-chunk-2', title: 'Progress', icon: TrendingUp },
    { id: 'learning-01-chunk-3', title: 'Active Sessions', icon: Clock }
];

export default function StatisticsSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {cardData.map(({ id, title, icon: Icon }) => (
                <Card key={id} x-chunk={id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {title}
                        </CardTitle>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="text-2xl font-bold">
                            <Skeleton className="h-8 w-16" />{/* Adjusted skeleton for number */}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            <Skeleton className="h-4 w-[150px]" />{/* Adjusted skeleton for change from last week */}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

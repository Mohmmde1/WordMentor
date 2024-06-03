import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Book, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function LearningStatistics({noKnown=0, noUnknown=0}) {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="learning-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Known Words
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{noKnown}</div>
                    <p className="text-xs text-muted-foreground">
                        +150 from last week
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="learning-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Unknown Words
                    </CardTitle>
                    <Book className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{noUnknown}</div>
                    <p className="text-xs text-muted-foreground">
                        -50 from last week
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="learning-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">75%</div>
                    <p className="text-xs text-muted-foreground">
                        +10% from last week
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="learning-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                        +2 since last session
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

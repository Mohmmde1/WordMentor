import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Book, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export default function Statistics({
    noKnown = 0,
    noUnknown = 0,
    knownWordsChange = 0,
    unknownWordsChange = 0,
    progress = 0,
    progressChange = 0,
    sessions = 0,
    sessionsChange = 0
}) {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <HoverCard>
                <HoverCardTrigger asChild>
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
                                {knownWordsChange >= 0 ? `+${knownWordsChange}` : knownWordsChange} from last week
                            </p>
                        </CardContent>
                    </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <p className="text-sm">
                        The number of words you have marked as known.
                    </p>
                </HoverCardContent>
            </HoverCard>

            <HoverCard>
                <HoverCardTrigger asChild>
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
                                {unknownWordsChange >= 0 ? `+${unknownWordsChange}` : unknownWordsChange} from last week
                            </p>
                        </CardContent>
                    </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <p className="text-sm">
                        The number of words you have marked as unknown.
                    </p>
                </HoverCardContent>
            </HoverCard>

            <HoverCard>
                <HoverCardTrigger asChild>
                    <Card x-chunk="learning-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Progress</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{progress}%</div>
                            <p className="text-xs text-muted-foreground">
                                {progressChange >= 0 ? `+${progressChange}%` : `${progressChange}%`} from last week
                            </p>
                        </CardContent>
                    </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <p className="text-sm">
                        Your progress in learning new words, shown as a percentage. Your known words divided by all words.
                    </p>
                </HoverCardContent>
            </HoverCard>

            <HoverCard>
                <HoverCardTrigger asChild>
                    <Card x-chunk="learning-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{sessions}</div>
                            <p className="text-xs text-muted-foreground">
                                {sessionsChange >= 0 ? `+${sessionsChange}` : sessionsChange} since last session
                            </p>
                        </CardContent>
                    </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                    <p className="text-sm">
                        The number of learning sessions you have.
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}

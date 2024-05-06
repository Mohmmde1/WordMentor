import Link from "next/link";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"





import { Badge } from '@/components/ui/badge';
import { FlaskConical, FlaskConicalOff } from 'lucide-react';

const Badges = ({ isAssessed }) => {
    return (
        <>

            {isAssessed
                ? <HoverCard><HoverCardTrigger><Badge className="inline-flex  items-center w-30 h-5 px-2 py-1  text-white bg-gradient-to-r from-slate-600 to-slate-800">
                    <FlaskConical size={16} />
                    <span className="ml-1">
                        Assessed
                    </span>
                </Badge></HoverCardTrigger><HoverCardContent>
                        Already have taken the assessment.
                    </HoverCardContent></HoverCard>

                : <HoverCard><HoverCardTrigger><Link href="/assessment">

                    <Badge className="inline-flex items-center w-30 h-5 px-2 py-1  text-white bg-gradient-to-l from-blue-400 to-blue-800">
                        <FlaskConicalOff size={16} />
                        <span className="ml-1">
                            Assess
                        </span>
                    </Badge>
                </Link></HoverCardTrigger><HoverCardContent>
                        Take the assessment to get your badge.
                    </HoverCardContent></HoverCard>}
        </>
    );
};

export default Badges;

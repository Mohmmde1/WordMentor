import { useState } from "react";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

const Selection = () => {
    const [fromPage, setFromPage] = useState(1);
    const [toPage, setToPage] = useState(1);

    return (
        <div >
            <div className="flex items-center space-x-4">
            <label className="text-lg font-bold mb-2">From: </label>
                <Input 
                    type="number" 
                    value={fromPage} 
                    onChange={(e) => setFromPage(e.target.value)} 
                    
                />
                <span className="text-lg font-bold">-</span>
            <label className="text-lg font-bold mb-2">To: </label>
                <Input 
                    type="number" 
                    value={toPage} 
                    onChange={(e) => setToPage(e.target.value)} 
                    
                />
            </div>
            <DialogFooter>

            <Button className="mt-4">Select</Button>
            </DialogFooter>
        </div>
    );
}

export default Selection;

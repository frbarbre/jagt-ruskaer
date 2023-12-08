
// SHARED component imports
import Box from '@/components/shared/Box'
import Heading from "@/components/shared/Heading";
import EventCard from '@/components/shared/EventCard'

// ICON import
import { CalendarPlus } from 'lucide-react'




export default function LatestRegistrations({ latestRegistrations }) {


    // let latestRegs = latestRegistrations.map((reg) => {
    //  return(
    //      
    //  )   
    // })


    return (
        <Box className="w-full lg:max-w-[890px]">
            <Heading title={'The Honey Badger is fierce'} icon={<CalendarPlus />} />
        </Box>
    )
}
import Box from '@/components/shared/Box'
import { BellPlus, Clock, CalendarDays } from 'lucide-react'
import Heading from '@/components/shared/Heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function Current({ currentEvent }) {

    // console.log('from current' + currentEvent.date)

    // -------------- DATE ------------------

    // formatting the date
    const pubDateObject = new Date(currentEvent.date);
    let formattedPubDate = pubDateObject.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
          
    // splitting the formatted date - parts is now an array
    let parts = formattedPubDate.split(' ')
    
    // capitalizing the first letter of 'weekday' and 'month'
    parts[0] = parts?.[0]?.charAt(0).toUpperCase() + parts?.[0]?.slice(1);
    parts[3] = parts?.[3]?.charAt(0).toUpperCase() + parts?.[3]?.slice(1);
    
    // changing 'den' to 'd.'
    parts[1] = 'd.';
    
    // joining the parts back together
    formattedPubDate = parts.join(' ');

    // ------------- DATE END ---------------

    // ------------ TIME ---------------

    // time from
    let timeFromData = currentEvent.timeFrom.split(':')
    let timeFrom = `${timeFromData?.[0]}:${timeFromData?.[1]}`
    
    // time to
    let timeToData = currentEvent.timeTo.split(':')
    let timeTo = `${timeToData?.[0]}:${timeToData?.[1]}`

    // ---------- TIME END ------------


    // to be rendered
    return(
        <Box className='w-full flex flex-col gap-3'>
            <Heading title={'Aktuelt'} icon={<BellPlus />} />
            <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className='w-full h-[342px] object-cover rounded-[5px]'
            />
            <h2 className='text-xl font-semibold'>{currentEvent.title}</h2>
            <p className='text-sm h-10 overflow-hidden'>{currentEvent.description}</p>
            <div className='flex items-end justify-between'>
                <div className='flex flex-col gap-2'>
                    <p className='text-xs opacity-70 flex'>
                        <CalendarDays className='opacity-70 h-[14px] -ml-1' />
                        {formattedPubDate}
                    </p>
                    <p className='text-xs opacity-70 flex'>
                        <Clock className='opacity-70 h-[14px] -ml-1' />
                        {timeFrom} - {timeTo}
                    </p>
                </div>
                {/* skal gå til /aktiviteter/'aktivitetens id' */}
                <Link href={`/aktiviteter/${currentEvent.id}`}>
                    <Button>Læs mere</Button>
                </Link>
            </div>
        </Box>
    )
}
import Box from '@/components/shared/Box'
import { BellPlus, Clock, CalendarDays } from 'lucide-react'
import Heading from '@/components/shared/Heading'
import { Button } from '@/components/ui/button'


export default function Current({ query }) {

    // formatting the date
    const pubDateObject = new Date(query.data.date);
    let formattedPubDate = pubDateObject.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })
          
    // splitting the formatted date - parts is now an array
    let parts = formattedPubDate.split(' ')
    
    // capitalizing the first letter of 'weekday' and 'month'
    parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    parts[3] = parts[3].charAt(0).toUpperCase() + parts[3].slice(1);
    
    // changing 'den' to 'd.'
    parts[1] = 'd.';
    
    // joining the parts back together
    formattedPubDate = parts.join(' ');


    // console.log(query)
    return(
        <Box className='w-full flex flex-col gap-3'>
            <Heading title={'Aktuelt'} icon={<BellPlus />} />
            <img
                src={query.data.image}
                alt={query.data.title}
                className='w-full h-[342px] object-cover rounded-[5px]'
            />
            <h2 className='text-xl font-semibold'>{query.data.title}</h2>
            <p className='text-sm'>{query.data.description}</p>
            <div className='flex items-end justify-between'>
                <div className='flex flex-col gap-2'>
                    <p className='text-xs opacity-70 flex'>
                        <CalendarDays className='opacity-70 h-[14px] -ml-1' />
                        {formattedPubDate}
                    </p>
                    <p className='text-xs opacity-70 flex'>
                        <Clock className='opacity-70 h-[14px] -ml-1' />
                        {query.data.timeFrom} - {query.data.timeTo}
                    </p>
                </div>
                <Button>Læs mere</Button>
            </div>
        </Box>
    )
}
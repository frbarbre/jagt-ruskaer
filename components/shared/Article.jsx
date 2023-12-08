
// Article component

import Link from 'next/link'

// SHARED component import
import Box from '@/components/shared/Box'
import Heading from '@/components/shared/Heading'

// UI component import
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

export default function Article({ article }) {
    return (
        // TODO - copy the styling of the ActivityCard - remember to grab the styling for 'isOnAdminPage' set to 'true'
        <Box className='min-w-[335px]'>
            <section className='w-full flex flex-col gap-3'>
                <div>
                    <Heading isTiny={true} title={article.category} icon={article.icon} />
                    <Separator className='my-3' />
                    <img className='w-full object-cover rounded-[5px]' src={article.img} alt={article.title} />
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='font-semibold text-sm mb-1 '>
                        {article.title}
                    </h2>
                    <p className='text-[14px] h-[40px] overflow-hidden mt-2 mb-3'>
                        {article.description}
                    </p>
                </div>
                <Button>
                    Læs mere
                </Button>
            </section>
        </Box>
    )
}
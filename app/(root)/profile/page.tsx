import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventsByUser } from '@/lib/actions/Event.actions'
import { getOrdersByUser } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/database/models/order.model'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'

const Profilepage = async({searchParams}:SearchParamProps) => {
    const {page} = await searchParams;
       const authObject = await auth();
       const ordersPage = Number(page) || 1;
       console.log(ordersPage)
       const eventPage = Number(page) || 1;
     const { sessionClaims } = authObject;
     const userId = sessionClaims?.userId as string

     const orders = await getOrdersByUser({userId,page:ordersPage})
     const orderEvents = orders?.data.map((order:IOrder)=>order.event) || []
     const organizedEvent = await getEventsByUser({userId,page:eventPage})
    return (
        <>
            {/* My Tickets */}
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between'>
                    <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
                    <Button asChild size='lg' className='button hidden sm:flex'>
                        <Link href="/#events">
                            Explore More Events
                        </Link>
                    </Button>
                </div>
            </section>

            <section className='wrapper my-8'>
                <Collection 
          data={orderEvents}
          emptyTitle="No Events Tickets purchased"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName='orderPage'
          totalPages={orders?.totalPages}
        />
            </section>

            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex items-center justify-center sm:justify-between'>
                    <h3 className='h3-bold text-center sm:text-left'>Events Organized</h3>
                    <Button asChild size="lg" className='button hidden sm:flex'>
                        <Link href="/events/create">
                            Create New Event
                        </Link>
                    </Button>
                </div>
            </section>

            <section className='wrapper my-8'>
                <Collection 
          data={organizedEvent?.data}
          emptyTitle="No Events have been created yet "
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized" 
          limit={6}
          page={eventPage}
          urlParamName='eventPage'
          totalPages={organizedEvent?.totalPages}
        />
            </section>
        </>
    )
}

export default Profilepage
import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/Event.actions';
import { SearchParamProps, UpdateEventParams } from '@/types';
import { auth } from '@clerk/nextjs/server';
import React from 'react'



const UpdateEvent = async({params}:SearchParamProps) => {
    const {id} = await params;
    const authObject = await auth();
 const { sessionClaims } = authObject;
 const userId = sessionClaims?.userId as string
 const event = await getEventById(id)
    return (
        <>
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <h3 className="wrapper h3-bold text-center sm:text-left ">UpdateEvent</h3>
            </section>

            <div className='wrapper my-8'>
               <EventForm 
               userId={userId}
                event={event}
                eventId={event._id}
                 type="Update"
                 />
            </div>
        </>
    )
}

export default UpdateEvent

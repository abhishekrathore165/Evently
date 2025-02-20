'use client'
import { IEvent } from '@/lib/database/models/event.model'
import { SignIn, useUser } from '@clerk/nextjs';
import React, { useRef } from 'react'
import { Button } from '../ui/button';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Link from 'next/link';
import CheckOut from './CheckOut';

const CheckOutButton = ({event}:{event:IEvent}) => {
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;
    const closedEvent = new Date(event.endDateTime) < new Date();

  return (
    <div className='flex items-center gap-3'>
         {/* cannot buy past event */}
         {
            closedEvent? (
                <p className='p-2 text-red-400'>Sorry, tickets are no longer available</p>
            ):(
                <>
                  <SignedOut>
                  <Button asChild className='button rounded-full' size="lg">
                    <Link href={"/sign-in"}>Get Tickets</Link>
                  </Button>
                  </SignedOut>
                  <SignedIn>
                    <CheckOut event={event} userId={userId}/>
                  </SignedIn>
                </>
            )
         }
    </div>
  )
}

export default CheckOutButton
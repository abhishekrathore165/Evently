import { IEvent } from '@/lib/database/models/event.model'
import {loadStripe} from '@stripe/stripe-js'
import React from 'react'
import { Button } from '../ui/button'
import { checkOutOrder } from '@/lib/actions/order.actions'


 loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CheckOut = ({event,userId}:{event:IEvent,userId:string}) => {
    React.useEffect(()=>{
        const query = new URLSearchParams(window.location.search);
        if(query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.')
        }
        if(query.get('canceled')) {
            console.log('Order placed! You will receive an email confirmation.')
        }
    },[])

    const oncheckOut=async()=>{
       const order ={
        eventTitle: event.title,
        eventId:event._id,
        price:event.price,
        isFree:event.isFree,
        buyerId:userId
       }

       await checkOutOrder(order)
    }
  return (
    <form action={oncheckOut} method='post'>
        <Button type='submit' role='link' size="lg" className='button sm:w-fit'>
             {
                event.isFree ? 'Get Ticket' : 'Buy Ticket'
             }
        </Button>
    </form>
  )
}

export default CheckOut

import profile from '../../assets/profile.jpg'
import price from '../../assets/bg/price1.png'
import profile1 from '../../assets/dummy/captain.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { notificationAction } from '../../store/notfications'
import { useState } from 'react'
import Message from '../helpers/Message'

const EventCard = ({ event }) => {


   const dispatch = useDispatch()
   const navigate = useNavigate()
   
   const applyHandler = async(e)=>{
    
      dispatch(notificationAction.setFunction({functionMessage:`sending notification to ${event?.creater[0]?.name}`}))
      const {name} = e.target
      try {
          const token = await localStorage.getItem('token')
          const res =await axios.post('http://localhost:3000/kheloNITH/notifications/event/apply',{id:name,token})
          console.log(res.data)
          if(res.data.error){
             dispatch(notificationAction.setNotification({type:'error',message:res.data.error}))
             dispatch(notificationAction.setDontFunction())
             return 
          }
          dispatch(notificationAction.setNotification({type:'success',message:res.data.message}))
          dispatch(notificationAction.setDontFunction())

      } 
      catch (error) {
         console.log(error.message)
         dispatch(notificationAction.setDontFunction())

      }
   }


   return (
      <div className="w-[320px] h-[320px] bg-gradient-to-br from-[#9361ef] to-[#bb74ee] flex-none animate-slideleft rounded-xl flex flex-col items-center p-2 pb-4 gap-2
         backdrop-blur-xl opacity-90 hover:scale-105 shadow-xl shadow-white/30 relative ">
         <Link to={`/specific/oneUser/${event.creater[0]._id}`} className=' w-full flex flex-col items-center hover:bg-[#de7bfc] p-2 rounded-lg'>
            <img className="w-[120px] h-[120px] rounded-full bg-white border-2 border-[#ffffff]" src={event?event?.creater[0]?.avtar?.avtar:profile1} />
            <h1 className="text-3xl font-serif font-bold text-white text-center">{event?.creater[0]?.name}</h1>
         </Link>
         <h1 className="text-xl font-serif font-bold text-white/80">{event?.date}</h1>
         <h1 className="text-xl font-serif font-bold text-white/80">{event?.time}</h1>
         <input type='button' value='Challenge' name={event?._id} className="bg-green-500 rounded-lg px-4 py-2 hover:scale-110 text-white
             cursor-pointer active:scale-95" onClick={applyHandler}/>
      </div>

   )
}

export default EventCard
import { useClockHands } from '@/app/Hooks/useClockHands';
import Image from 'next/image';

const Clock = () => {
    const { hourDegrees, minuteDegrees, secondDegrees } = useClockHands();
  return (
     <div className="absolute border-white/20 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50">
           <div className="relative isolate bg-transparent rounded-full w-65 h-65 lg:w-64 lg:h-64 xl:h-105 xl:w-105 mx-auto my-12 flex justify-center items-center group border border-zinc-300 shadow-xl dark:border-white/10 dark:shadow-none ">
             <Image
               width={600}
               height={500}
               alt="clock"
               src="/images/clockDial.png"
               className="object-contain z-0"
             />
   
             <div className="absolute h-full overflow-hidden w-full flex justify-center items-center z-60">
               <div
                 className="w-full absolute z-60 h-full pointer-events-none will-change-transform transition-transform duration-500 ease-linear"
                 style={{ transform: `rotate(${hourDegrees}deg)` }}
               >
                 <Image
                   alt="hour"
                   width={600}
                   height={500}
                   src="/images/hourHand.png"
                   className="object-contain"
                 />
               </div>
   
               <div
                 className="w-full absolute z-20 h-full pointer-events-none will-change-transform transition-transform duration-500 ease-linear"
                 style={{ transform: `rotate(${minuteDegrees}deg)` }}
               >
                 <Image
                   alt="minute"
                   width={600}
                   height={500}
                   src="/images/minuteHand.png"
                 />
               </div>
   
               <div
                 className="w-full absolute z-30 h-full pointer-events-none will-change-transform transition-transform duration-100 ease-linear"
                 style={{ transform: `rotate(${secondDegrees}deg)` }}
               >
                 <Image
                   width={600}
                   height={500}
                   alt="second"
                   src="/images/secondHand.png"
                 />
               </div>
             </div>
   
             <div className="absolute inset-0 rounded-full bg-linear-to-br to-transparent pointer-events-none z-40 from-black/5 border border-black/5 shadow-lg dark:from-white/5 dark:border-white/5 dark:shadow-2xl" />
           </div>
         </div>
  )
}

export default Clock
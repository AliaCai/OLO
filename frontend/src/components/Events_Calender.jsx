import React, { useState, useEffect } from 'react'
import '../styles/Events_Calender.css'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createCurrentTimePlugin } from '@schedule-x/current-time'

import '@schedule-x/theme-default/dist/index.css'
// import plugin from 'eslint-plugin-import'


const Events_Calender = () => {
        const eventService=useState(()=>createEventsServicePlugin())[0]
        const eventModal = createEventModalPlugin()

        const calender=useCalendarApp({
            views:[createViewMonthAgenda(),createViewMonthGrid(),createViewWeek(),createViewDay()],
            events:[
                {
                    id:1,
                    title:'ahello',
                    start:'2025-08-01',
                    end:'2025-08-11',
                    description:'hellooo'
                },
                                {
                    id:2,
                    title:'bhello',
                    start:'2025-08-01',
                    end:'2025-08-11',
                    description:'hellooo'
                },
                                {
                    id:3,
                    title:'chello',
                    start:'2025-08-01',
                    end:'2025-08-11',
                    description:'hellooo'
                },
                             {
                    id:1,
                    title:'ahello',
                    start:'2025-08-01',
                    end:'2025-08-11',
                    description:'hellooo'
                },
                                {
                    id:2,
                    title:'bhello',
                    start:'2025-08-01',
                    end:'2025-08-11',
                    description:'hellooo'
                },
                                {
                    id:3,
                    title:'chello',
                    start:'2025-08-01',
                    end:'2025-08-11',
                    description:'hellooo'
                },
            ],
            defaultView:'month-grid',
            plugins:[eventService,eventModal, createCurrentTimePlugin()],
        })

        useEffect(()=>{eventService.getAll()},[])
    
  return (
    <div>
        <ScheduleXCalendar className='events_calender' calendarApp={calender} />
    </div>
  )
}

export default Events_Calender

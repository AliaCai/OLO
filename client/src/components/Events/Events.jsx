import './Events.css'
import React from 'react'
// import Events_Calender from './Events_Calender/Events_Calender'
import FullCalender from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
function Events() {
  return (
    <div className='events'>

      <div className="events_row_search">
        <div className="events_searchBarText">
            <input type="text" />
        </div>
        <div className="events_searchBarTime">
        <input type="text" />

        </div>
        <div className="events_searchBarAccounts">
            <input type="text" />
        </div>
        <div className="events_reset">reset</div>
      </div>
      <div className="events_switch"></div>
      <div className="events_alter">
        <div className="events_alter_calender"><FullCalender plugins={[dayGridPlugin]} initialView='dayGridWeek' /></div>
        <div className="events_alter_list events_disable"></div>
      </div>
    </div>
  )
}

export default Events

import './Events.css'
import React, {useState} from 'react'
// import Events_Calender from './Events_Calender/Events_Calender'
import FullCalender from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import  interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import eventEg from '../assets/event_example.jpg'
function Events() {
  const [eventDetail, setEventDetail]=useState(null)
  const event=[{title:"CSC circle",
                start:'2025-09-20 09:00:00',
                end:'2025-09-20 10:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating\n in CSC’s own badminton tourna\n ment July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competitio\n n See you soon!🙈',
                accountName:'n1',
                color:'light-blue'},
                {title:'Wix Meta',
                start:'2025-09-20 15:00:00',
                end:'2025-09-20 19:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈tense competition See you soon!🙈',
                accountName:'n2',
                color:'pink'},
                {title:'Resume Critique',
                start:'2025-09-19 11:00:00',
                end:'2025-09-19 13:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!o summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈',
                accountName:'n3',
                color:'orange'}  ]

  function handleDateClick(arg){
    setEventDetail({
      title:arg.event._def.title,
      des:arg.event._def.extendedProps.description,
      accountName:arg.event._def.extendedProps.accountName,
      img:arg.event._def.extendedProps.img
    })
    console.log(eventDetail)

    // arg.el.style.backgroundColor='red'
    // console.log( arg.event._def, arg.el,arg.date,arg.jsEvent, arg.view, arg.resource)

  return <div>yo</div>
    
  }
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
        <div className="events_alter_calender"><FullCalender height='70vh' 
                                                                  nowIndicator={true}
                                                                   plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin]}
                                                                    eventClick={handleDateClick} 
                                                                    selectable={true} 
                                                                    initialView='timeGridWeek'
                                                                    events={event} 
                                                                    headerToolbar={{left:'prev next today',center:'title',right:'timeGridWeek timeGridDay dayGridMonth'}} /></div>
        
        <div className="eventDetails">{
          eventDetail &&
          <div className="eventDetail">
            <div className="eventDetail_tool_bar">
              <div className="event_detail_buttons">
                <div className="event_detail_add">Add</div>
                <div className="event_detail_interest">Intrest</div>
                <div className="event_detail_report">Report</div>
              </div>
              <div className="eventDetail_toolBar_cross">x</div>
            </div>
            
              <div className="eventDetail_title">{eventDetail.title}</div>
              <img className="eventDetail_img" crossOrigin='anonymous' src={eventEg} alt='event img' />
              <div className="eventDetail_desc">{eventDetail.des}</div>
              <div className="eventDetail_accountName">{eventDetail.accountName}</div>

          </div>
            }</div>
        <div className="events_alter_list events_disable"></div>
      </div>
    </div>
  )
}

export default Events

import './Events.css'
import React, {useState, useRef} from 'react'
// import Events_Calender from './Events_Calender/Events_Calender'
import FullCalender from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import  interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import ListPlugin from '@fullcalendar/list'

import eventEg from '../assets/event_example.jpg'
import CloseIcon from '@mui/icons-material/Close';
import SvgIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { Theme } from '@fullcalendar/core/internal'

function Events() {
  const calendarRef=useRef()
  const [eventDetail, setEventDetail]=useState(null)
  const [eventDetailPos, setEventDetailPos]=useState(null)
  const [calendarLayout, setCalendarLayout]=useState(false)

  const event=[{title:"CSC circle",
                start:'2025-09-24 00:00:00',
                end:'2025-09-24 10:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating\n in CSC’s own badminton tourna\n ment July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competitio\n n See you soon!🙈',
                accountName:'n1',
                color:'light-blue'},
                {title:'Wix Meta',
                start:'2025-09-25 15:00:00',
                end:'2025-09-25 16:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈tense competition See you soon!🙈',
                accountName:'n2',
                color:'pink'},
                              {title:'Wix Meta',
                start:'2025-09-25 16:00:00',
                end:'2025-09-25 17:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈tense competition See you soon!🙈',
                accountName:'n2',
                color:'pink'},
                {title:'Resume Critique',
                start:'2025-09-22 11:00:00',
                end:'2025-09-22 13:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!o summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈',
                accountName:'n3',
                color:'orange'} ,
                              {title:'Resume Critique',
                start:'2025-09-23 11:00:00',
                end:'2025-09-23 13:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!o summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈',
                accountName:'n3',
                color:'orange'},
                              {title:'Resume Critique',
                start:'2025-09-24 11:00:00',
                end:'2025-09-24 13:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!o summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈',
                accountName:'n3',
                color:'orange'},
                              {title:'Resume Critique',
                start:'2025-09-25 23:00:00',
                end:'2025-09-25 24:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!o summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈',
                accountName:'n3',
                color:'orange'} ,
                                           {title:'Resume Critique',
                start:'2025-09-26 04:00:00',
                end:'2025-09-26 05:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!o summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈',
                accountName:'n3',
                color:'orange'},
                                           {title:'Resume Critique',
                start:'2025-09-27 01:00:00',
                end:'2025-09-27 02:00:00',
                img:'https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-15/502467169_18049437413451410_1178223913794747179_n.jpg?stp=dst-jpg_e35_s720x720_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjc1NzYxLmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=102&_nc_oc=Q6cZ2QGQ_4JZpzF3wXfuO6DBgGV-5upUys_7CAjOrla0NFwNdrET944yxfDqVHqqVD7YQWs&_nc_ohc=H7lnoCvdUVoQ7kNvwFUsWLC&_nc_gid=FZwiImHYcaGtks9vVE12RA&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzY2NTk2MzM5NDQ4MjgxODM2NQ%3D%3D.3-ccb7-5&oh=00_AfbKOcBDHqh0paa79SarqlTu82r-JPOBhHxO_69nzvZbtA&oe=68D23A14&_nc_sid=7a9f4b',
                description:'🏸Smash your way into summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!o summer by participating in CSC’s own badminton tournament July 4th 8 pm PAC Small Included: free snacks & drinks, rackets, good vibes, awesome people, and intense competition See you soon!🙈',
                accountName:'n3',
                color:'orange'}]

  function handleDateClick(arg){
    setEventDetail({
      title:arg.event._def.title,
      des:arg.event._def.extendedProps.description,
      accountName:arg.event._def.extendedProps.accountName,
      img:arg.event._def.extendedProps.img
    })
    // console.log(arg.jsEvent.pageX,arg.jsEvent.pageY,arg.el.fcSeg.start,arg.el.fcSeg.start.toString().split(' ')[4].split(':')[0])
    setEventDetailPos({x:arg.jsEvent.pageX, y:arg.jsEvent.pageY, start:arg.el.fcSeg.start?Number(arg.el.fcSeg.start.toString().split(' ')[4].split(':')[0]):9})
    // console.log(arg.jsEvent.pageX,arg.jsEvent.pageY)

    // arg.el.style.backgroundColor='red'
    // console.log( arg.event._def, arg.el,arg.date,arg.jsEvent, arg.view, arg.resource)


    
  }

  function handelCloseEvent(){
    setEventDetail(null)
  }

  function handleLayougChange(){
    console.log('ori',calendarLayout)
      setCalendarLayout(!calendarLayout)
      const calendarApi=calendarRef.current.getApi()
      calendarApi.changeView(calendarLayout?'timeGridWeek':'listWeek')
      calendarApi.setOption('headerToolbar',calendarLayout?{left:'prev next today',center:'title',right: 'timeGridWeek timeGridDay dayGridMonth'}:{left:'prev next today',center:'title',right:'listWeek listDay listMonth' })

    console.log(calendarLayout)
  }
  return (
    <div className='events' onClick={handelCloseEvent}>

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
      <div className="events_switch"><Stack direction='row' spacing={0.3}><Typography >List</Typography> <FormControlLabel onClick={handleLayougChange} control={<Switch defaultChecked />} /><Typography >Calendar</Typography></Stack></div>
      <div className="events_alter">
        <div className="events_alter_calender"><FullCalender     ref={calendarRef}
                                                                  nowIndicator={true}
                                                                   plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin,ListPlugin]}
                                                                    eventClick={handleDateClick} 
                                                                    selectable={true} 
                                                                    buttonText={{listWeek:'week', listDay:'day', listMonth:'month'}}
                                                                    initialView='timeGridWeek'
                                                                    events={event} 
                                                                    headerToolbar={{left:'prev next today',center:'title',right: 'timeGridWeek timeGridDay dayGridMonth'}} /></div>
        
        <div className="eventDetails">{
          eventDetail &&
          <div className="eventDetail" style={{    position: 'absolute',top:eventDetailPos.start>19?(eventDetailPos.start-20)*48+215:(Math.min(eventDetailPos.start-1,4.5))*48+215 ,left:(eventDetailPos.x<1084)?(Math.floor((eventDetailPos.x-332)/190)*190+245) :((Math.floor((eventDetailPos.x-332)/190)-3.5)*190+245)}}>
            <div className="eventDetail_tool_bar">
              <div className="event_detail_buttons">
                <div className="event_detail_add"><SvgIcon className="event_detail_icon" component={AddIcon}></SvgIcon>Add</div>
                <div className="event_detail_interested"><SvgIcon className="event_detail_icon" component={NotificationsIcon}></SvgIcon>Interested</div>
                <div className="event_detail_report"><SvgIcon className="event_detail_icon" component={OutlinedFlagIcon}></SvgIcon>Report</div>
              </div>
              <div className="eventDetail_toolBar_cross" onClick={handelCloseEvent}><CloseIcon /></div>
            </div>
            
              <div className="eventDetail_title">{eventDetail.title}</div>
              <img className="eventDetail_img" crossOrigin='anonymous' src={eventDetail.img} alt='event img' />
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



// list -> listDay, listWeek, listMonth,listYear
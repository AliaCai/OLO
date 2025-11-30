import '../styles/Events.css'
import React, {useState, useRef, useEffect} from 'react'
// import Events_Calender from './Events_Calender/Events_Calender'
import FullCalender from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid/index.js'
import  interactionPlugin from '@fullcalendar/interaction/index.js'
import timeGridPlugin from '@fullcalendar/timegrid/index.js'
import ListPlugin from '@fullcalendar/list/index.js'

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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { styled } from '@mui/system'
import { backdropClasses } from '@mui/material'
// import { Theme } from '@fullcalendar/core/internal'


//constants
import {account_color} from '../constants/account_color'

//mock data:
// import {mock_event} from '../mock/mock_event'

function Events() {
  const calendarRef=useRef()
  const [eventDetail, setEventDetail]=useState(null)
  const [eventDetailPos, setEventDetailPos]=useState(null)
  const [calendarLayout, setCalendarLayout]=useState(false)
  const [event, setEvent]=useState(null)



  const StyledDatePicker=styled(DatePicker)({
    '.MuiPickersToolbar-root':{
      color: "#1868DB"
    }
  })
  

  function convertEvent(events){
    console.log('this is events',events, events.length)
    let res=[]
    for (let i=100;i<events.length;++i){

      let eve=  {
        title: events[i].event_title,
        start: events[i].event_start_time,
        end:  events[i].event_end_time,
        img: events[i].img_url,
        description:events[i].img_text,
        source:events[i].ig_link,
        accountName: events[i].account_name,
        color: account_color[events[i].account_name]
      }

      // console.log('--color',eve[accountName],account_color[events[i].account_nam])

    res.push(eve)

    }
    return res
  }
    useEffect(()=>{
      fetch('http://localhost:4000/api/event/list/condition',{
        method:'POST',
        credentials:"include",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({})
      }).then((res)=>{

        res.json().then((cres)=>{
          // console.log('caought it', cres,cres.rows,convertEvent(cres.rows))
          const converted_events=convertEvent(cres.rows)
          setEvent(converted_events)
          console.log("event is",converted_events)
        })
    

      }).catch((err)=>{
        console.err('error:',err)
      })
      
    },[])

  function handleDateClick(arg){
    console.log('click something',arg)
    let an=arg.event._def.extendedProps.accountName
    setEventDetail({
      title:arg.event._def.title,
      des:arg.event._def.extendedProps.description,
      accountName:an,
      img:arg.event._def.extendedProps.img,
      source:arg.event._def.extendedProps.source,
      color:account_color[an]
    })
  

    console.log('-click something',eventDetail,arg.event._instance,account_color[an])
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
    // console.log('ori',calendarLayout)
      setCalendarLayout(!calendarLayout)
      const calendarApi=calendarRef.current.getApi()
      calendarApi.changeView(calendarLayout?'timeGridWeek':'listWeek')
      calendarApi.setOption('headerToolbar',calendarLayout?{left:'prev next today',center:'title',right: 'timeGridWeek timeGridDay dayGridMonth'}:{left:'prev next today',center:'title',right:'listWeek listDay listMonth' })

    console.log(calendarLayout)
  }
  return (
    <div className='events'>

      <div className="events_row_search">
          <div className=" events_searchBarDate">
              <LocalizationProvider   dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <StyledDatePicker className="test" label="event date" />
                </DemoContainer>
              </LocalizationProvider>
          </div>
          <div className=" events_searchBarName">
              <input className='event_searchField' placeholder="event name" type="text" />
          </div>
          <div className=" events_searchBarLocation">
              <input  className='event_searchField' placeholder="location" type="text" />
          </div>
          <div className=" events_searchBarDes">
              <input  className='event_searchField' placeholder="description" type="text" />
          </div>
          <div className=" events_searchBarAccount">
              <input className='event_searchField'  placeholder="organization" type="text" />
          </div>
          <div className="events_reset">Reset</div>
          <div className="events_switch"><Stack direction='row' spacing={0.3}><Typography >List</Typography> <FormControlLabel onClick={handleLayougChange} control={<Switch defaultChecked />} /><Typography >Calendar</Typography></Stack></div>
      </div>

      <div className="events_alter">
        <div className="events_alter_calender"><FullCalender     ref={calendarRef}
                                                                  nowIndicator={true}
                                                                   plugins={[ dayGridPlugin,timeGridPlugin,interactionPlugin,ListPlugin]}
                                                                    eventClick={handleDateClick} 
                                                                    selectable={true} 
                                                                    buttonText={{listWeek:'week', listDay:'day', listMonth:'month'}}
                                                                    initialView='timeGridWeek'
                                                                    events={event} 
                                                                    headerToolbar={{left:'prev next today',center:'title',right: 'timeGridWeek timeGridDay dayGridMonth'}} />
                                                                    
                                                                    
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
              <div className="source">source: {eventDetail.source}</div>
              <div className="eventDetail_accountName" style={{backgroundColor:eventDetail.color}}>{eventDetail.accountName}</div>

          </div>
            }</div>
            
          </div>
        

        <div className="events_alter_list events_disable"></div>
      </div>
    </div>
  )
}

export default Events



// list -> listDay, listWeek, listMonth,listYear
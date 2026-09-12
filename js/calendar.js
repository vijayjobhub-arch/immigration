/**
 * BridgeBuilder AI - RFC-5545 Compliant .ics Calendar Generator
 * Enables 1-click import to Google Calendar, Apple iCal, and Microsoft Outlook.
 */
class CalendarGenerator {
  /**
   * Format JS Date to iCal date string (YYYYMMDDTHHMMSSZ)
   */
  formatDate(date, isAllDay = false) {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const d = new Date(date);
    
    if (isNaN(d.getTime())) {
      // Return a safe fallback date
      const now = new Date();
      return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
    }

    const year = d.getUTCFullYear();
    const month = pad(d.getUTCMonth() + 1);
    const day = pad(d.getUTCDate());
    const hours = pad(d.getUTCHours());
    const minutes = pad(d.getUTCMinutes());
    const seconds = pad(d.getUTCSeconds());

    if (isAllDay) {
      return `${year}${month}${day}`;
    }
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

  /**
   * Generates a standard RFC-5545 .ics string for a list of events
   * @param {Array} events - Array of event objects: { title, description, startDate, endDate, location, isAllDay }
   */
  generateICS(events) {
    const nowStr = this.formatDate(new Date());

    let ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//BridgeBuilder AI//EduBridge School Calendar//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:School Schedule & Action Deadlines',
      'X-WR-TIMEZONE:America/Chicago'
    ];

    events.forEach((evt, idx) => {
      const uid = `bridgebuilder-${Date.now()}-${idx}@bridgebuilder.ai`;
      const isAllDay = evt.isAllDay !== undefined ? evt.isAllDay : true;
      const dtStart = this.formatDate(evt.startDate, isAllDay);
      const dtEnd = evt.endDate ? this.formatDate(evt.endDate, isAllDay) : dtStart;
      
      const cleanSummary = (evt.title || 'School Event').replace(/[\r\n]+/g, ' ');
      const cleanDesc = (evt.description || '').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,');
      const cleanLocation = (evt.location || 'School Campus').replace(/[\r\n]+/g, ' ');

      ics.push('BEGIN:VEVENT');
      ics.push(`UID:${uid}`);
      ics.push(`DTSTAMP:${nowStr}`);
      if (isAllDay) {
        ics.push(`DTSTART;VALUE=DATE:${dtStart}`);
        ics.push(`DTEND;VALUE=DATE:${dtEnd}`);
      } else {
        ics.push(`DTSTART:${dtStart}`);
        ics.push(`DTEND:${dtEnd}`);
      }
      ics.push(`SUMMARY:${cleanSummary}`);
      ics.push(`DESCRIPTION:${cleanDesc}`);
      ics.push(`LOCATION:${cleanLocation}`);
      ics.push('STATUS:CONFIRMED');
      
      // Add 24-hour advance alarm reminder
      ics.push('BEGIN:VALARM');
      ics.push('TRIGGER:-P1D');
      ics.push('ACTION:DISPLAY');
      ics.push(`DESCRIPTION:Reminder: ${cleanSummary}`);
      ics.push('END:VALARM');

      ics.push('END:VEVENT');
    });

    ics.push('END:VCALENDAR');
    return ics.join('\r\n');
  }

  /**
   * Triggers a browser file download of the generated .ics calendar
   */
  downloadICS(events, filename = 'School_Schedule_BridgeBuilder.ics') {
    const icsContent = this.generateICS(events);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /**
   * Generates a direct Google Calendar Web Link for a single event
   */
  createGoogleCalendarLink(event) {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const title = encodeURIComponent(event.title || 'School Deadline');
    const details = encodeURIComponent(event.description || '');
    const location = encodeURIComponent(event.location || '');
    
    const isAllDay = event.isAllDay !== undefined ? event.isAllDay : true;
    const start = this.formatDate(event.startDate, isAllDay);
    const end = event.endDate ? this.formatDate(event.endDate, isAllDay) : start;
    const dates = `${start}/${end}`;

    return `${baseUrl}&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  }
}

window.calendarGenerator = new CalendarGenerator();

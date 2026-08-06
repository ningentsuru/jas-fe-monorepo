import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

export function useDateFormat() {
  function unixAndTimezoneFormat(unix: number, timezone: number, format?: string) {
    const offsetMinutes = timezone / 60
    return dayjs.unix(unix).utc().utcOffset(offsetMinutes).format(format)
  }

  function dateToFormat(date: Date | string, format: string) {
    return dayjs(date).format(format)
  }

  return { unixAndTimezoneFormat, dateToFormat }
}

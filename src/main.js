import { polyfill } from 'es6-object-assign'
import { CalendarStyle } from './calendar-style.js'
import DatePicker from './components/DatePickerAsyncWrapper.svelte'
polyfill()

export {
  CalendarStyle,
  DatePicker
}

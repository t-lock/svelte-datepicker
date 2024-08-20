import { writable } from 'svelte/store'
import { createFormatter } from './formatter.js'
import { getMonths } from './calendar.js'
import { sanitizeInitialValue } from './sanitization.js'
import { dayjs } from './date-utils.js'
import { ensureFutureMonth } from './date-manipulation.js'

const contextKey = {}

async function setLoadingCursor () {
  const loadingStyle = document.createElement('style')

  loadingStyle.dataset.styleName = 'loading-style'

  loadingStyle.innerHTML = '* { cursor: wait !important; }'

  document.head.appendChild(loadingStyle)

  await new Promise((resolve) => setTimeout(resolve, 20))
}

function clearLoadingCursor () {
  const loadingStyles = document.querySelectorAll('[data-style-name="loading-style"]')
  if (loadingStyles.length) {
    setTimeout(() => {
      loadingStyles.forEach(styletag => styletag.remove())
    }, 20)
  }
}

function setup (given, config) {
  const today = dayjs().startOf('day')

  const { isDateChosen, chosen: [ preSelectedStart, preSelectedEnd ] } = sanitizeInitialValue(given, config)
  const selectedStartDate = writable(preSelectedStart)
  const selectedEndDate = writable(preSelectedEnd)
  const { formatter } = createFormatter(selectedStartDate, selectedEndDate, config)
  const component = writable('date-view')

  const leftDate = preSelectedStart.subtract(
    config.isRangePicker && preSelectedStart.isSame(config.end, 'month') ? 1 : 0, 'month'
  ).startOf('month')
  const rightDate = config.isRangePicker ? ensureFutureMonth(leftDate, preSelectedEnd).startOf('month') : null

  const setupObj = {
    months: getMonths(config),
    component,
    today,
    selectedStartDate,
    selectedEndDate,
    leftCalendarDate: writable(leftDate),
    rightCalendarDate: writable(rightDate),
    config,
    shouldShakeDate: writable(false),
    isOpen: writable(false),
    isClosing: writable(false),
    highlighted: writable(today),
    formatter,
    isDateChosen: writable(isDateChosen),
    resetView: () => {
      component.set('date-view')
    },
    isSelectingFirstDate: writable(true)
  }

  clearLoadingCursor()

  return setupObj
}

export {
  contextKey,
  setup,
  setLoadingCursor,
  clearLoadingCursor
}

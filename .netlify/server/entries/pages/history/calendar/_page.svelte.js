import { y as set_current_component, r as run_all, z as current_component, i as is_function, u as get_store_value, A as identity, c as create_ssr_component, o as getContext, s as subscribe, k as each, g as add_attribute, e as escape, v as validate_component, q as missing_component, B as get_current_component, p as setContext, t as add_styles, m as set_store_value } from "../../../../chunks/ssr.js";
import { f as fasts, l as loading, d as dataFetched } from "../../../../chunks/stores2.js";
import { u as user } from "../../../../chunks/userStore.js";
import { d as derived, r as readable, w as writable } from "../../../../chunks/index.js";
import { L as Loading, a as aws_stages } from "../../../../chunks/Loading.js";
import axios from "axios";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
const DAY_IN_SECONDS = 86400;
function createDate(input = void 0) {
  if (input !== void 0) {
    return input instanceof Date ? _fromLocalDate(input) : _fromISOString(input);
  }
  return _fromLocalDate(/* @__PURE__ */ new Date());
}
function createDuration(input) {
  if (typeof input === "number") {
    input = { seconds: input };
  } else if (typeof input === "string") {
    let seconds = 0, exp = 2;
    for (let part of input.split(":", 3)) {
      seconds += parseInt(part, 10) * Math.pow(60, exp--);
    }
    input = { seconds };
  } else if (input instanceof Date) {
    input = { hours: input.getUTCHours(), minutes: input.getUTCMinutes(), seconds: input.getUTCSeconds() };
  }
  let weeks = input.weeks || input.week || 0;
  return {
    years: input.years || input.year || 0,
    months: input.months || input.month || 0,
    days: weeks * 7 + (input.days || input.day || 0),
    seconds: (input.hours || input.hour || 0) * 60 * 60 + (input.minutes || input.minute || 0) * 60 + (input.seconds || input.second || 0),
    inWeeks: !!weeks
  };
}
function cloneDate(date) {
  return new Date(date.getTime());
}
function addDuration(date, duration, x = 1) {
  date.setUTCFullYear(date.getUTCFullYear() + x * duration.years);
  let month = date.getUTCMonth() + x * duration.months;
  date.setUTCMonth(month);
  month %= 12;
  if (month < 0) {
    month += 12;
  }
  while (date.getUTCMonth() !== month) {
    subtractDay(date);
  }
  date.setUTCDate(date.getUTCDate() + x * duration.days);
  date.setUTCSeconds(date.getUTCSeconds() + x * duration.seconds);
  return date;
}
function subtractDuration(date, duration, x = 1) {
  return addDuration(date, duration, -x);
}
function addDay(date, x = 1) {
  date.setUTCDate(date.getUTCDate() + x);
  return date;
}
function subtractDay(date, x = 1) {
  return addDay(date, -x);
}
function setMidnight(date) {
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function toLocalDate(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}
function toISOString(date, len = 19) {
  return date.toISOString().substring(0, len);
}
function datesEqual(date1, ...dates2) {
  return dates2.every((date2) => date1.getTime() === date2.getTime());
}
function nextClosestDay(date, day) {
  let diff2 = day - date.getUTCDay();
  date.setUTCDate(date.getUTCDate() + (diff2 >= 0 ? diff2 : diff2 + 7));
  return date;
}
function prevClosestDay(date, day) {
  let diff2 = day - date.getUTCDay();
  date.setUTCDate(date.getUTCDate() + (diff2 <= 0 ? diff2 : diff2 - 7));
  return date;
}
function noTimePart(date) {
  return typeof date === "string" && date.length <= 10;
}
function copyTime(toDate, fromDate) {
  toDate.setUTCHours(fromDate.getUTCHours(), fromDate.getUTCMinutes(), fromDate.getUTCSeconds(), 0);
  return toDate;
}
function nextDate(date, duration) {
  addDuration(date, duration);
  return date;
}
function prevDate(date, duration, hiddenDays) {
  subtractDuration(date, duration);
  if (hiddenDays.length && hiddenDays.length < 7) {
    while (hiddenDays.includes(date.getUTCDay())) {
      subtractDay(date);
    }
  }
  return date;
}
function _fromLocalDate(date) {
  return new Date(Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ));
}
function _fromISOString(str) {
  const parts = str.match(/\d+/g);
  return new Date(Date.UTC(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2]),
    Number(parts[3] || 0),
    Number(parts[4] || 0),
    Number(parts[5] || 0)
  ));
}
function debounce(fn, handle, queueStore) {
  queueStore.update((queue) => queue.set(handle, fn));
}
function assign(...args) {
  return Object.assign(...args);
}
function keys(object) {
  return Object.keys(object);
}
function symbol() {
  return Symbol("ec");
}
function createElement(tag, className, content, attrs = []) {
  let el = document.createElement(tag);
  el.className = className;
  if (typeof content == "string") {
    el.innerText = content;
  } else if (content.domNodes) {
    el.replaceChildren(...content.domNodes);
  } else if (content.html) {
    el.innerHTML = content.html;
  }
  for (let attr of attrs) {
    el.setAttribute(...attr);
  }
  return el;
}
let payloadProp = symbol();
function hasPayload(el) {
  return !!el?.[payloadProp];
}
function getPayload(el) {
  return el[payloadProp];
}
function getElementWithPayload(x, y, root = document) {
  for (let el of root.elementsFromPoint(x, y)) {
    if (hasPayload(el)) {
      return el;
    }
    if (el.shadowRoot) {
      let shadowEl = getElementWithPayload(x, y, el.shadowRoot);
      if (shadowEl) {
        return shadowEl;
      }
    }
  }
  return null;
}
function createView(view2, _viewTitle, _currentRange, _activeRange) {
  return {
    type: view2,
    title: _viewTitle,
    currentStart: _currentRange.start,
    currentEnd: _currentRange.end,
    activeStart: _activeRange.start,
    activeEnd: _activeRange.end,
    calendar: void 0
  };
}
function toViewWithLocalDates(view2) {
  view2 = assign({}, view2);
  view2.currentStart = toLocalDate(view2.currentStart);
  view2.currentEnd = toLocalDate(view2.currentEnd);
  view2.activeStart = toLocalDate(view2.activeStart);
  view2.activeEnd = toLocalDate(view2.activeEnd);
  return view2;
}
function listView(view2) {
  return view2.startsWith("list");
}
let eventId = 1;
function createEvents(input) {
  return input.map((event) => {
    let result = {
      id: "id" in event ? String(event.id) : `{generated-${eventId++}}`,
      resourceIds: Array.isArray(event.resourceIds) ? event.resourceIds.map(String) : "resourceId" in event ? [String(event.resourceId)] : [],
      allDay: event.allDay ?? (noTimePart(event.start) && noTimePart(event.end)),
      start: createDate(event.start),
      end: createDate(event.end),
      title: event.title || "",
      titleHTML: event.titleHTML || "",
      editable: event.editable,
      startEditable: event.startEditable,
      durationEditable: event.durationEditable,
      display: event.display || "auto",
      extendedProps: event.extendedProps || {},
      backgroundColor: event.backgroundColor || event.color,
      textColor: event.textColor
    };
    if (result.allDay) {
      setMidnight(result.start);
      let end = cloneDate(result.end);
      setMidnight(result.end);
      if (!datesEqual(result.end, end) || datesEqual(result.end, result.start)) {
        addDay(result.end);
      }
    }
    return result;
  });
}
function createEventSources(input) {
  return input.map((source) => ({
    events: source.events,
    url: source.url && source.url.trimEnd("&") || "",
    method: source.method && source.method.toUpperCase() || "GET",
    extraParams: source.extraParams || {}
  }));
}
function createEventChunk(event, start, end) {
  return {
    start: event.start > start ? event.start : start,
    end: event.end < end ? event.end : end,
    event
  };
}
function sortEventChunks(chunks) {
  chunks.sort((a, b) => a.start - b.start || b.event.allDay - a.event.allDay);
}
function createEventContent(chunk, displayEventEnd, eventContent, theme, _intlEventTime, _view) {
  let timeText = _intlEventTime.formatRange(
    chunk.start,
    displayEventEnd && chunk.event.display !== "pointer" ? copyTime(cloneDate(chunk.start), chunk.end) : chunk.start
  );
  let content;
  if (eventContent) {
    content = is_function(eventContent) ? eventContent({
      event: toEventWithLocalDates(chunk.event),
      timeText,
      view: toViewWithLocalDates(_view)
    }) : eventContent;
  } else {
    let domNodes;
    switch (chunk.event.display) {
      case "background":
        domNodes = [];
        break;
      case "pointer":
        domNodes = [createTimeElement(timeText, chunk, theme)];
        break;
      default:
        domNodes = [
          ...chunk.event.allDay ? [] : [createTimeElement(timeText, chunk, theme)],
          createElement("h4", theme.eventTitle, chunk.event.title)
        ];
    }
    content = { domNodes };
  }
  return [timeText, content];
}
function createTimeElement(timeText, chunk, theme) {
  return createElement(
    "time",
    theme.eventTime,
    timeText,
    [["datetime", toISOString(chunk.start)]]
  );
}
function createEventClasses(eventClassNames, event, _view) {
  if (eventClassNames) {
    if (is_function(eventClassNames)) {
      eventClassNames = eventClassNames({
        event: toEventWithLocalDates(event),
        view: toViewWithLocalDates(_view)
      });
    }
    return Array.isArray(eventClassNames) ? eventClassNames : [eventClassNames];
  }
  return [];
}
function toEventWithLocalDates(event) {
  return _cloneEvent(event, toLocalDate);
}
function _cloneEvent(event, dateFn) {
  event = assign({}, event);
  event.start = dateFn(event.start);
  event.end = dateFn(event.end);
  return event;
}
function prepareEventChunks(chunks, hiddenDays) {
  let longChunks = {};
  if (chunks.length) {
    sortEventChunks(chunks);
    let prevChunk;
    for (let chunk of chunks) {
      let dates = [];
      let date = setMidnight(cloneDate(chunk.start));
      while (chunk.end > date) {
        if (!hiddenDays.includes(date.getUTCDay())) {
          dates.push(cloneDate(date));
          if (dates.length > 1) {
            let key = date.getTime();
            if (longChunks[key]) {
              longChunks[key].chunks.push(chunk);
            } else {
              longChunks[key] = {
                sorted: false,
                chunks: [chunk]
              };
            }
          }
        }
        addDay(date);
      }
      if (dates.length) {
        chunk.date = dates[0];
        chunk.days = dates.length;
        chunk.dates = dates;
      } else {
        chunk.date = setMidnight(cloneDate(chunk.start));
        chunk.days = 1;
        chunk.dates = [chunk.date];
      }
      if (prevChunk && datesEqual(prevChunk.date, chunk.date)) {
        chunk.prev = prevChunk;
      }
      prevChunk = chunk;
    }
  }
  return longChunks;
}
function runReposition(refs, data) {
  refs.length = data.length;
  let result = [];
  for (let ref of refs) {
    result.push(ref?.reposition?.());
  }
  return result;
}
function eventIntersects(event, start, end, resource) {
  return event.start < end && event.end > start && resource === void 0;
}
function helperEvent(display) {
  return previewEvent(display) || ghostEvent(display) || pointerEvent(display);
}
function bgEvent(display) {
  return display === "background";
}
function previewEvent(display) {
  return display === "preview";
}
function ghostEvent(display) {
  return display === "ghost";
}
function pointerEvent(display) {
  return display === "pointer";
}
function btnTextMonth(text) {
  return btnText(text, "month");
}
function btnText(text, period) {
  return {
    ...text,
    next: "Next " + period,
    prev: "Previous " + period
  };
}
function themeView(view2) {
  return (theme) => ({ ...theme, view: view2 });
}
function createResources(input) {
  return input.map((resource) => ({
    id: String(resource.id),
    title: resource.title || "",
    titleHTML: resource.titleHTML || "",
    eventBackgroundColor: resource.eventBackgroundColor,
    eventTextColor: resource.eventTextColor
  }));
}
function resourceBackgroundColor(event, resources) {
  return findResource(event, resources)?.eventBackgroundColor;
}
function resourceTextColor(event, resources) {
  return findResource(event, resources)?.eventTextColor;
}
function findResource(event, resources) {
  return resources.find((resource) => event.resourceIds.includes(resource.id));
}
function intl(locale, format) {
  return derived([locale, format], ([$locale, $format]) => {
    let intl2 = is_function($format) ? { format: $format } : new Intl.DateTimeFormat($locale, $format);
    return {
      format: (date) => intl2.format(toLocalDate(date))
    };
  });
}
function intlRange(locale, format) {
  return derived([locale, format], ([$locale, $format]) => {
    let formatRange;
    if (is_function($format)) {
      formatRange = $format;
    } else {
      let intl2 = new Intl.DateTimeFormat($locale, $format);
      formatRange = (start, end) => {
        if (start <= end) {
          return intl2.formatRange(start, end);
        } else {
          let parts = intl2.formatRangeToParts(end, start);
          let result = "";
          let sources = ["startRange", "endRange"];
          let processed = [false, false];
          for (let part of parts) {
            let i = sources.indexOf(part.source);
            if (i >= 0) {
              if (!processed[i]) {
                result += _getParts(sources[1 - i], parts);
                processed[i] = true;
              }
            } else {
              result += part.value;
            }
          }
          return result;
        }
      };
    }
    return {
      formatRange: (start, end) => formatRange(toLocalDate(start), toLocalDate(end))
    };
  });
}
function _getParts(source, parts) {
  let result = "";
  for (let part of parts) {
    if (part.source == source) {
      result += part.value;
    }
  }
  return result;
}
function createOptions(plugins) {
  let options = {
    allDayContent: void 0,
    allDaySlot: true,
    buttonText: {
      today: "today"
    },
    customButtons: {},
    date: /* @__PURE__ */ new Date(),
    datesSet: void 0,
    dayHeaderFormat: {
      weekday: "short",
      month: "numeric",
      day: "numeric"
    },
    dayHeaderAriaLabelFormat: {
      dateStyle: "full"
    },
    displayEventEnd: true,
    duration: { weeks: 1 },
    events: [],
    eventAllUpdated: void 0,
    eventBackgroundColor: void 0,
    eventTextColor: void 0,
    eventClassNames: void 0,
    eventClick: void 0,
    eventColor: void 0,
    eventContent: void 0,
    eventDidMount: void 0,
    eventMouseEnter: void 0,
    eventMouseLeave: void 0,
    eventSources: [],
    eventTimeFormat: {
      hour: "numeric",
      minute: "2-digit"
    },
    filterResourcesWithEvents: false,
    firstDay: 0,
    flexibleSlotTimeLimits: false,
    // ec option
    headerToolbar: {
      start: "title",
      center: "",
      end: "today prev,next"
    },
    height: void 0,
    hiddenDays: [],
    highlightedDates: [],
    // ec option
    lazyFetching: true,
    loading: void 0,
    locale: void 0,
    nowIndicator: false,
    resourceLabelContent: void 0,
    resourceLabelDidMount: void 0,
    resources: [],
    selectable: false,
    scrollTime: "06:00:00",
    slotDuration: "00:30:00",
    slotEventOverlap: true,
    slotHeight: 24,
    // ec option
    slotLabelFormat: {
      hour: "numeric",
      minute: "2-digit"
    },
    slotMaxTime: "24:00:00",
    slotMinTime: "00:00:00",
    slotWidth: 72,
    theme: {
      allDay: "ec-all-day",
      active: "ec-active",
      bgEvent: "ec-bg-event",
      bgEvents: "ec-bg-events",
      body: "ec-body",
      button: "ec-button",
      buttonGroup: "ec-button-group",
      calendar: "ec",
      compact: "ec-compact",
      content: "ec-content",
      day: "ec-day",
      dayHead: "ec-day-head",
      days: "ec-days",
      event: "ec-event",
      eventBody: "ec-event-body",
      eventTime: "ec-event-time",
      eventTitle: "ec-event-title",
      events: "ec-events",
      extra: "ec-extra",
      handle: "ec-handle",
      header: "ec-header",
      hiddenScroll: "ec-hidden-scroll",
      highlight: "ec-highlight",
      icon: "ec-icon",
      line: "ec-line",
      lines: "ec-lines",
      nowIndicator: "ec-now-indicator",
      otherMonth: "ec-other-month",
      resource: "ec-resource",
      sidebar: "ec-sidebar",
      sidebarTitle: "ec-sidebar-title",
      today: "ec-today",
      time: "ec-time",
      title: "ec-title",
      toolbar: "ec-toolbar",
      view: "",
      weekdays: ["ec-sun", "ec-mon", "ec-tue", "ec-wed", "ec-thu", "ec-fri", "ec-sat"],
      withScroll: "ec-with-scroll"
    },
    titleFormat: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    view: void 0,
    viewDidMount: void 0,
    views: {}
  };
  for (let plugin of plugins) {
    plugin.createOptions?.(options);
  }
  return options;
}
function createParsers(plugins) {
  let parsers = {
    date: (date) => setMidnight(createDate(date)),
    duration: createDuration,
    events: createEvents,
    eventSources: createEventSources,
    hiddenDays: (days2) => [...new Set(days2)],
    highlightedDates: (dates) => dates.map((date) => setMidnight(createDate(date))),
    resources: createResources,
    scrollTime: createDuration,
    slotDuration: createDuration,
    slotMaxTime: createDuration,
    slotMinTime: createDuration
  };
  for (let plugin of plugins) {
    plugin.createParsers?.(parsers);
  }
  return parsers;
}
function diff(options, prevOptions) {
  let diff2 = [];
  for (let key of keys(options)) {
    if (options[key] !== prevOptions[key]) {
      diff2.push([key, options[key]]);
    }
  }
  assign(prevOptions, options);
  return diff2;
}
function dayGrid(state) {
  return derived(state.view, ($view) => $view?.startsWith("dayGrid"));
}
function activeRange(state) {
  return derived(
    [state._currentRange, state.firstDay, state.slotMaxTime, state._dayGrid],
    ([$_currentRange, $firstDay, $slotMaxTime, $_dayGrid]) => {
      let start = cloneDate($_currentRange.start);
      let end = cloneDate($_currentRange.end);
      if ($_dayGrid) {
        prevClosestDay(start, $firstDay);
        nextClosestDay(end, $firstDay);
      } else if ($slotMaxTime.days || $slotMaxTime.seconds > DAY_IN_SECONDS) {
        addDuration(subtractDay(end), $slotMaxTime);
        let start2 = subtractDay(cloneDate(end));
        if (start2 < start) {
          start = start2;
        }
      }
      return { start, end };
    }
  );
}
function currentRange(state) {
  return derived(
    [state.date, state.duration, state.firstDay],
    ([$date, $duration, $firstDay]) => {
      let start = cloneDate($date), end;
      if ($duration.months) {
        start.setUTCDate(1);
      } else if ($duration.inWeeks) {
        prevClosestDay(start, $firstDay);
      }
      end = addDuration(cloneDate(start), $duration);
      return { start, end };
    }
  );
}
function viewDates(state) {
  return derived([state._activeRange, state.hiddenDays], ([$_activeRange, $hiddenDays]) => {
    let dates = [];
    let date = setMidnight(cloneDate($_activeRange.start));
    let end = setMidnight(cloneDate($_activeRange.end));
    while (date < end) {
      if (!$hiddenDays.includes(date.getUTCDay())) {
        dates.push(cloneDate(date));
      }
      addDay(date);
    }
    if (!dates.length && $hiddenDays.length && $hiddenDays.length < 7) {
      state.date.update((date2) => {
        while ($hiddenDays.includes(date2.getUTCDay())) {
          addDay(date2);
        }
        return date2;
      });
      dates = get_store_value(state._viewDates);
    }
    return dates;
  });
}
function viewTitle(state) {
  return derived(
    [state.date, state._activeRange, state._intlTitle, state._dayGrid],
    ([$date, $_activeRange, $_intlTitle, $_dayGrid]) => {
      return $_dayGrid ? $_intlTitle.formatRange($date, $date) : $_intlTitle.formatRange($_activeRange.start, subtractDay(cloneDate($_activeRange.end)));
    }
  );
}
function view(state) {
  return derived([state.view, state._viewTitle, state._currentRange, state._activeRange], (args) => createView(...args));
}
function events(state) {
  let _events = writable([]);
  let abortController;
  let fetching = 0;
  let debounceHandle = {};
  derived(
    [state.events, state.eventSources, state._activeRange, state._fetchedRange, state.lazyFetching, state.loading],
    (values, set) => debounce(() => {
      let [$events, $eventSources, $_activeRange, $_fetchedRange, $lazyFetching, $loading] = values;
      if (!$eventSources.length) {
        set($events);
        return;
      }
      if (!$_fetchedRange.start || $_fetchedRange.start > $_activeRange.start || $_fetchedRange.end < $_activeRange.end || !$lazyFetching) {
        if (abortController) {
          abortController.abort();
        }
        abortController = new AbortController();
        if (is_function($loading) && !fetching) {
          $loading(true);
        }
        let stopLoading = () => {
          if (--fetching === 0 && is_function($loading)) {
            $loading(false);
          }
        };
        let events2 = [];
        let failure = (e) => stopLoading();
        let success = (data) => {
          events2 = events2.concat(createEvents(data));
          set(events2);
          stopLoading();
        };
        let startStr = toISOString($_activeRange.start);
        let endStr = toISOString($_activeRange.end);
        for (let source of $eventSources) {
          if (is_function(source.events)) {
            let result = source.events({
              start: toLocalDate($_activeRange.start),
              end: toLocalDate($_activeRange.end),
              startStr,
              endStr
            }, success, failure);
            if (result !== void 0) {
              Promise.resolve(result).then(success, failure);
            }
          } else {
            let params = is_function(source.extraParams) ? source.extraParams() : assign({}, source.extraParams);
            params.start = startStr;
            params.end = endStr;
            params = new URLSearchParams(params);
            let url = source.url, headers = {}, body;
            if (["GET", "HEAD"].includes(source.method)) {
              url += (url.includes("?") ? "&" : "?") + params;
            } else {
              headers["content-type"] = "application/x-www-form-urlencoded;charset=UTF-8";
              body = String(params);
            }
            fetch(url, { method: source.method, headers, body, signal: abortController.signal, credentials: "same-origin" }).then((response) => response.json()).then(success).catch(failure);
          }
          ++fetching;
        }
        $_fetchedRange.start = $_activeRange.start;
        $_fetchedRange.end = $_activeRange.end;
      }
    }, debounceHandle, state._queue),
    []
  ).subscribe(_events.set);
  return _events;
}
function now() {
  return readable(createDate(), (set) => {
    let interval = setInterval(() => {
      set(createDate());
    }, 1e3);
    return () => clearInterval(interval);
  });
}
function today(state) {
  return derived(state._now, ($_now) => setMidnight(cloneDate($_now)));
}
class State {
  constructor(plugins, input) {
    plugins = plugins || [];
    let options = createOptions(plugins);
    let parsers = createParsers(plugins);
    options = parseOpts(options, parsers);
    input = parseOpts(input, parsers);
    for (let [option, value] of Object.entries(options)) {
      this[option] = writable(value);
    }
    this._queue = writable(/* @__PURE__ */ new Map());
    this._queue2 = writable(/* @__PURE__ */ new Map());
    this._tasks = /* @__PURE__ */ new Map();
    this._auxiliary = writable([]);
    this._dayGrid = dayGrid(this);
    this._currentRange = currentRange(this);
    this._activeRange = activeRange(this);
    this._fetchedRange = writable({ start: void 0, end: void 0 });
    this._events = events(this);
    this._now = now();
    this._today = today(this);
    this._intlEventTime = intlRange(this.locale, this.eventTimeFormat);
    this._intlSlotLabel = intl(this.locale, this.slotLabelFormat);
    this._intlDayHeader = intl(this.locale, this.dayHeaderFormat);
    this._intlDayHeaderAL = intl(this.locale, this.dayHeaderAriaLabelFormat);
    this._intlTitle = intlRange(this.locale, this.titleFormat);
    this._bodyEl = writable(void 0);
    this._scrollable = writable(false);
    this._viewTitle = viewTitle(this);
    this._viewDates = viewDates(this);
    this._view = view(this);
    this._viewComponent = writable(void 0);
    this._interaction = writable({});
    this._iEvents = writable([null, null]);
    this._iClasses = writable(identity);
    this._iClass = writable(void 0);
    this._set = (key, value) => {
      if (validKey(key, this)) {
        if (parsers[key]) {
          value = parsers[key](value);
        }
        this[key].set(value);
      }
    };
    this._get = (key) => validKey(key, this) ? get_store_value(this[key]) : void 0;
    for (let plugin of plugins) {
      plugin.createStores?.(this);
    }
    if (input.view) {
      this.view.set(input.view);
    }
    let views = /* @__PURE__ */ new Set([...keys(options.views), ...keys(input.views ?? {})]);
    for (let view2 of views) {
      let defOpts = mergeOpts(options, options.views[view2] ?? {});
      let opts = mergeOpts(defOpts, input, input.views?.[view2] ?? {});
      let component = opts.component;
      filterOpts(opts, this);
      for (let key of keys(opts)) {
        let { set, _set = set, ...rest } = this[key];
        this[key] = {
          // Set value in all views
          set: ["buttonText", "theme"].includes(key) ? (value) => {
            if (is_function(value)) {
              let result = value(defOpts[key]);
              opts[key] = result;
              set(set === _set ? result : value);
            } else {
              opts[key] = value;
              set(value);
            }
          } : (value) => {
            opts[key] = value;
            set(value);
          },
          _set,
          ...rest
        };
      }
      this.view.subscribe((newView) => {
        if (newView === view2) {
          this._viewComponent.set(component);
          if (is_function(opts.viewDidMount)) {
            tick().then(() => opts.viewDidMount(get_store_value(this._view)));
          }
          for (let key of keys(opts)) {
            this[key]._set(opts[key]);
          }
        }
      });
    }
  }
}
function parseOpts(opts, parsers) {
  let result = { ...opts };
  for (let key of keys(parsers)) {
    if (key in result) {
      result[key] = parsers[key](result[key]);
    }
  }
  if (opts.views) {
    result.views = {};
    for (let view2 of keys(opts.views)) {
      result.views[view2] = parseOpts(opts.views[view2], parsers);
    }
  }
  return result;
}
function mergeOpts(...args) {
  let result = {};
  for (let opts of args) {
    let override = {};
    for (let key of ["buttonText", "theme"]) {
      if (is_function(opts[key])) {
        override[key] = opts[key](result[key]);
      }
    }
    result = {
      ...result,
      ...opts,
      ...override
    };
  }
  return result;
}
function filterOpts(opts, state) {
  keys(opts).filter((key) => !validKey(key, state) || key == "view").forEach((key) => delete opts[key]);
}
function validKey(key, state) {
  return state.hasOwnProperty(key) && key[0] !== "_";
}
const Buttons = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_duration;
  let $$unsubscribe_date;
  let $$unsubscribe_hiddenDays;
  let $_currentRange, $$unsubscribe__currentRange;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__viewTitle;
  let $buttonText, $$unsubscribe_buttonText;
  let $customButtons, $$unsubscribe_customButtons;
  let $view, $$unsubscribe_view;
  let { buttons } = $$props;
  let { _currentRange, _viewTitle, buttonText, customButtons, date, duration, hiddenDays, theme, view: view2 } = getContext("state");
  $$unsubscribe__currentRange = subscribe(_currentRange, (value) => $_currentRange = value);
  $$unsubscribe__viewTitle = subscribe(_viewTitle, (value) => value);
  $$unsubscribe_buttonText = subscribe(buttonText, (value) => $buttonText = value);
  $$unsubscribe_customButtons = subscribe(customButtons, (value) => $customButtons = value);
  $$unsubscribe_date = subscribe(date, (value) => value);
  $$unsubscribe_duration = subscribe(duration, (value) => value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_view = subscribe(view2, (value) => $view = value);
  let today2 = setMidnight(createDate()), isToday;
  if ($$props.buttons === void 0 && $$bindings.buttons && buttons !== void 0)
    $$bindings.buttons(buttons);
  isToday = today2 >= $_currentRange.start && today2 < $_currentRange.end || null;
  $$unsubscribe_duration();
  $$unsubscribe_date();
  $$unsubscribe_hiddenDays();
  $$unsubscribe__currentRange();
  $$unsubscribe_theme();
  $$unsubscribe__viewTitle();
  $$unsubscribe_buttonText();
  $$unsubscribe_customButtons();
  $$unsubscribe_view();
  return `${each(buttons, (button) => {
    return `${button == "title" ? ` <h2${add_attribute("class", $theme.title, 0)}></h2>` : `${button == "prev" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}"${add_attribute("aria-label", $buttonText.prev, 0)}${add_attribute("title", $buttonText.prev, 0)}><i class="${escape($theme.icon, true) + " ec-" + escape(button, true)}"></i></button>` : `${button == "next" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}"${add_attribute("aria-label", $buttonText.next, 0)}${add_attribute("title", $buttonText.next, 0)}><i class="${escape($theme.icon, true) + " ec-" + escape(button, true)}"></i></button>` : `${button == "today" ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true)}" ${isToday ? "disabled" : ""}>${escape($buttonText[button])}</button>` : `${$customButtons[button] ? `<button class="${escape($theme.button, true) + " ec-" + escape(button, true) + escape($customButtons[button].active ? " " + $theme.active : "", true)}"></button>` : `${button != "" ? `<button class="${escape($theme.button, true) + escape($view === button ? " " + $theme.active : "", true) + " ec-" + escape(button, true)}">${escape($buttonText[button])}</button>` : ``}`}`}`}`}`}`;
  })}`;
});
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $headerToolbar, $$unsubscribe_headerToolbar;
  let $theme, $$unsubscribe_theme;
  let { headerToolbar, theme } = getContext("state");
  $$unsubscribe_headerToolbar = subscribe(headerToolbar, (value) => $headerToolbar = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let sections = { start: [], center: [], end: [] };
  {
    {
      for (let key of keys(sections)) {
        sections[key] = $headerToolbar[key].split(" ").map((group) => group.split(","));
      }
    }
  }
  $$unsubscribe_headerToolbar();
  $$unsubscribe_theme();
  return `<nav${add_attribute("class", $theme.toolbar, 0)}>${each(keys(sections), (key) => {
    return `<div class="${"ec-" + escape(key, true)}">${each(sections[key], (buttons) => {
      return `${buttons.length > 1 ? `<div${add_attribute("class", $theme.buttonGroup, 0)}>${validate_component(Buttons, "Buttons").$$render($$result, { buttons }, {}, {})} </div>` : `${validate_component(Buttons, "Buttons").$$render($$result, { buttons }, {}, {})}`}`;
    })} </div>`;
  })}</nav>`;
});
const Auxiliary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_view, $$unsubscribe__view;
  let $datesSet, $$unsubscribe_datesSet;
  let $_activeRange, $$unsubscribe__activeRange;
  let $_auxiliary, $$unsubscribe__auxiliary;
  let { datesSet, _auxiliary, _activeRange, _queue, _view } = getContext("state");
  $$unsubscribe_datesSet = subscribe(datesSet, (value) => $datesSet = value);
  $$unsubscribe__auxiliary = subscribe(_auxiliary, (value) => $_auxiliary = value);
  $$unsubscribe__activeRange = subscribe(_activeRange, (value) => $_activeRange = value);
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  let debounceHandle = {};
  function runDatesSet(_activeRange2) {
    if (is_function($datesSet)) {
      debounce(
        () => $datesSet({
          start: toLocalDate(_activeRange2.start),
          end: toLocalDate(_activeRange2.end),
          startStr: toISOString(_activeRange2.start),
          endStr: toISOString(_activeRange2.end),
          view: toViewWithLocalDates($_view)
        }),
        debounceHandle,
        _queue
      );
    }
  }
  {
    runDatesSet($_activeRange);
  }
  $$unsubscribe__view();
  $$unsubscribe_datesSet();
  $$unsubscribe__activeRange();
  $$unsubscribe__auxiliary();
  return `${each($_auxiliary, (component) => {
    return `${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
  })}`;
});
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__bodyEl;
  let $_scrollable, $$unsubscribe__scrollable;
  let $$unsubscribe__queue2;
  let $$unsubscribe__queue;
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $duration, $$unsubscribe_duration;
  let $date, $$unsubscribe_date;
  let $_interaction, $$unsubscribe__interaction;
  let $_events, $$unsubscribe__events;
  let $theme, $$unsubscribe_theme;
  let $_iClass, $$unsubscribe__iClass;
  let $height, $$unsubscribe_height;
  let $view, $$unsubscribe_view;
  let $_viewComponent, $$unsubscribe__viewComponent;
  let { plugins = [] } = $$props;
  let { options = {} } = $$props;
  let component = get_current_component();
  let state = new State(plugins, options);
  setContext("state", state);
  let { _viewComponent, _bodyEl, _interaction, _iClass, _events, _queue, _queue2, _tasks, _scrollable, date, duration, hiddenDays, height, theme, view: view2 } = state;
  $$unsubscribe__viewComponent = subscribe(_viewComponent, (value) => $_viewComponent = value);
  $$unsubscribe__bodyEl = subscribe(_bodyEl, (value) => value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  $$unsubscribe__iClass = subscribe(_iClass, (value) => $_iClass = value);
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  $$unsubscribe__queue = subscribe(_queue, (value) => value);
  $$unsubscribe__queue2 = subscribe(_queue2, (value) => value);
  $$unsubscribe__scrollable = subscribe(_scrollable, (value) => $_scrollable = value);
  $$unsubscribe_date = subscribe(date, (value) => $date = value);
  $$unsubscribe_duration = subscribe(duration, (value) => $duration = value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  $$unsubscribe_height = subscribe(height, (value) => $height = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_view = subscribe(view2, (value) => $view = value);
  let prevOptions = { ...options };
  function setOption(name, value) {
    state._set(name, value);
    return this;
  }
  function getOption(name) {
    let value = state._get(name);
    return value instanceof Date ? toLocalDate(value) : value;
  }
  function refetchEvents() {
    state._fetchedRange.set({ start: void 0, end: void 0 });
    return this;
  }
  function getEvents() {
    return $_events.map(toEventWithLocalDates);
  }
  function getEventById(id) {
    for (let event of $_events) {
      if (event.id == id) {
        return toEventWithLocalDates(event);
      }
    }
    return null;
  }
  function addEvent(event) {
    $_events.push(createEvents([event])[0]);
    _events.set($_events);
    return this;
  }
  function updateEvent(event) {
    for (let e of $_events) {
      if (e.id == event.id) {
        assign(e, createEvents([event])[0]);
        _events.set($_events);
        break;
      }
    }
    return this;
  }
  function removeEventById(id) {
    let idx = $_events.findIndex((event) => event.id == id);
    if (idx >= 0) {
      $_events.splice(idx, 1);
      _events.set($_events);
    }
    return this;
  }
  function getView() {
    return toViewWithLocalDates(get_store_value(state._view));
  }
  function unselect() {
    $_interaction.action?.unselect();
    return this;
  }
  function dateFromPoint(x, y) {
    let dayEl = getElementWithPayload(x, y);
    return dayEl ? getPayload(dayEl)(x, y) : null;
  }
  function destroy() {
    destroy_component(component, true);
  }
  function next() {
    set_store_value(date, $date = nextDate($date, $duration), $date);
    return this;
  }
  function prev() {
    set_store_value(date, $date = prevDate($date, $duration, $hiddenDays), $date);
    return this;
  }
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.setOption === void 0 && $$bindings.setOption && setOption !== void 0)
    $$bindings.setOption(setOption);
  if ($$props.getOption === void 0 && $$bindings.getOption && getOption !== void 0)
    $$bindings.getOption(getOption);
  if ($$props.refetchEvents === void 0 && $$bindings.refetchEvents && refetchEvents !== void 0)
    $$bindings.refetchEvents(refetchEvents);
  if ($$props.getEvents === void 0 && $$bindings.getEvents && getEvents !== void 0)
    $$bindings.getEvents(getEvents);
  if ($$props.getEventById === void 0 && $$bindings.getEventById && getEventById !== void 0)
    $$bindings.getEventById(getEventById);
  if ($$props.addEvent === void 0 && $$bindings.addEvent && addEvent !== void 0)
    $$bindings.addEvent(addEvent);
  if ($$props.updateEvent === void 0 && $$bindings.updateEvent && updateEvent !== void 0)
    $$bindings.updateEvent(updateEvent);
  if ($$props.removeEventById === void 0 && $$bindings.removeEventById && removeEventById !== void 0)
    $$bindings.removeEventById(removeEventById);
  if ($$props.getView === void 0 && $$bindings.getView && getView !== void 0)
    $$bindings.getView(getView);
  if ($$props.unselect === void 0 && $$bindings.unselect && unselect !== void 0)
    $$bindings.unselect(unselect);
  if ($$props.dateFromPoint === void 0 && $$bindings.dateFromPoint && dateFromPoint !== void 0)
    $$bindings.dateFromPoint(dateFromPoint);
  if ($$props.destroy === void 0 && $$bindings.destroy && destroy !== void 0)
    $$bindings.destroy(destroy);
  if ($$props.next === void 0 && $$bindings.next && next !== void 0)
    $$bindings.next(next);
  if ($$props.prev === void 0 && $$bindings.prev && prev !== void 0)
    $$bindings.prev(prev);
  {
    for (let [name, value] of diff(options, prevOptions)) {
      setOption(name, value);
    }
  }
  $$unsubscribe__bodyEl();
  $$unsubscribe__scrollable();
  $$unsubscribe__queue2();
  $$unsubscribe__queue();
  $$unsubscribe_hiddenDays();
  $$unsubscribe_duration();
  $$unsubscribe_date();
  $$unsubscribe__interaction();
  $$unsubscribe__events();
  $$unsubscribe_theme();
  $$unsubscribe__iClass();
  $$unsubscribe_height();
  $$unsubscribe_view();
  $$unsubscribe__viewComponent();
  return `<div class="${escape($theme.calendar, true) + " " + escape($theme.view, true) + escape($_scrollable ? " " + $theme.withScroll : "", true) + escape($_iClass ? " " + $theme[$_iClass] : "", true)}"${add_attribute("role", listView($view) ? "list" : "table", 0)}${add_styles({ "height": $height })}>${validate_component(Toolbar, "Toolbar").$$render($$result, {}, {}, {})} ${validate_component($_viewComponent || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div> ${validate_component(Auxiliary, "Auxiliary").$$render($$result, {}, {}, {})} `;
});
function days(state) {
  return derived([state.date, state.firstDay, state.hiddenDays], ([$date, $firstDay, $hiddenDays]) => {
    let days2 = [];
    let day = cloneDate($date);
    let max = 7;
    while (day.getUTCDay() !== $firstDay && max) {
      subtractDay(day);
      --max;
    }
    for (let i = 0; i < 7; ++i) {
      if (!$hiddenDays.includes(day.getUTCDay())) {
        days2.push(cloneDate(day));
      }
      addDay(day);
    }
    return days2;
  });
}
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  let $_days, $$unsubscribe__days;
  let $_intlDayHeaderAL, $$unsubscribe__intlDayHeaderAL;
  let $$unsubscribe__intlDayHeader;
  let { theme, _intlDayHeader, _intlDayHeaderAL, _days } = getContext("state");
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__intlDayHeader = subscribe(_intlDayHeader, (value) => value);
  $$unsubscribe__intlDayHeaderAL = subscribe(_intlDayHeaderAL, (value) => $_intlDayHeaderAL = value);
  $$unsubscribe__days = subscribe(_days, (value) => $_days = value);
  $$unsubscribe_theme();
  $$unsubscribe__days();
  $$unsubscribe__intlDayHeaderAL();
  $$unsubscribe__intlDayHeader();
  return `<div${add_attribute("class", $theme.header, 0)}><div${add_attribute("class", $theme.days, 0)} role="row">${each($_days, (day) => {
    return `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[day.getUTCDay()], true)}" role="columnheader"><span${add_attribute("aria-label", $_intlDayHeaderAL.format(day), 0)}></span> </div>`;
  })}</div> <div${add_attribute("class", $theme.hiddenScroll, 0)}></div></div>`;
});
const Event = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $eventClick, $$unsubscribe_eventClick;
  let $$unsubscribe__hiddenEvents;
  let $$unsubscribe_dayMaxEvents;
  let $$unsubscribe__popupDate;
  let $_interaction, $$unsubscribe__interaction;
  let $_view, $$unsubscribe__view;
  let $$unsubscribe_eventAllUpdated;
  let $$unsubscribe_eventDidMount;
  let $_intlEventTime, $$unsubscribe__intlEventTime;
  let $theme, $$unsubscribe_theme;
  let $eventContent, $$unsubscribe_eventContent;
  let $displayEventEnd, $$unsubscribe_displayEventEnd;
  let $eventClassNames, $$unsubscribe_eventClassNames;
  let $_iClasses, $$unsubscribe__iClasses;
  let $eventTextColor, $$unsubscribe_eventTextColor;
  let $resources, $$unsubscribe_resources;
  let $eventColor, $$unsubscribe_eventColor;
  let $eventBackgroundColor, $$unsubscribe_eventBackgroundColor;
  let $$unsubscribe_eventMouseEnter;
  let $$unsubscribe_eventMouseLeave;
  let { chunk } = $$props;
  let { longChunks = {} } = $$props;
  let { inPopup = false } = $$props;
  let { dates = [] } = $$props;
  let { dayMaxEvents, displayEventEnd, eventAllUpdated, eventBackgroundColor, eventTextColor, eventClick, eventColor, eventContent, eventClassNames, eventDidMount, eventMouseEnter, eventMouseLeave, resources, theme, _view, _intlEventTime, _interaction, _iClasses, _hiddenEvents, _popupDate, _tasks } = getContext("state");
  $$unsubscribe_dayMaxEvents = subscribe(dayMaxEvents, (value) => value);
  $$unsubscribe_displayEventEnd = subscribe(displayEventEnd, (value) => $displayEventEnd = value);
  $$unsubscribe_eventAllUpdated = subscribe(eventAllUpdated, (value) => value);
  $$unsubscribe_eventBackgroundColor = subscribe(eventBackgroundColor, (value) => $eventBackgroundColor = value);
  $$unsubscribe_eventTextColor = subscribe(eventTextColor, (value) => $eventTextColor = value);
  $$unsubscribe_eventClick = subscribe(eventClick, (value) => $eventClick = value);
  $$unsubscribe_eventColor = subscribe(eventColor, (value) => $eventColor = value);
  $$unsubscribe_eventContent = subscribe(eventContent, (value) => $eventContent = value);
  $$unsubscribe_eventClassNames = subscribe(eventClassNames, (value) => $eventClassNames = value);
  $$unsubscribe_eventDidMount = subscribe(eventDidMount, (value) => value);
  $$unsubscribe_eventMouseEnter = subscribe(eventMouseEnter, (value) => value);
  $$unsubscribe_eventMouseLeave = subscribe(eventMouseLeave, (value) => value);
  $$unsubscribe_resources = subscribe(resources, (value) => $resources = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__view = subscribe(_view, (value) => $_view = value);
  $$unsubscribe__intlEventTime = subscribe(_intlEventTime, (value) => $_intlEventTime = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => $_interaction = value);
  $$unsubscribe__iClasses = subscribe(_iClasses, (value) => $_iClasses = value);
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => value);
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => value);
  let el;
  let event;
  let classes;
  let style;
  let margin = 1;
  let display;
  let onclick;
  function createHandler(fn, display2) {
    return !helperEvent(display2) && is_function(fn) ? (jsEvent) => fn({
      event: toEventWithLocalDates(event),
      el,
      jsEvent,
      view: toViewWithLocalDates($_view)
    }) : void 0;
  }
  function reposition() {
    {
      return;
    }
  }
  if ($$props.chunk === void 0 && $$bindings.chunk && chunk !== void 0)
    $$bindings.chunk(chunk);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.inPopup === void 0 && $$bindings.inPopup && inPopup !== void 0)
    $$bindings.inPopup(inPopup);
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  if ($$props.reposition === void 0 && $$bindings.reposition && reposition !== void 0)
    $$bindings.reposition(reposition);
  event = chunk.event;
  {
    {
      display = event.display;
      let bgColor = event.backgroundColor || resourceBackgroundColor(event, $resources) || $eventBackgroundColor || $eventColor;
      let txtColor = event.textColor || resourceTextColor(event, $resources) || $eventTextColor;
      let marginTop = margin;
      if (event._margin) {
        let [_margin, _dates] = event._margin;
        if (chunk.date >= _dates[0] && chunk.date <= _dates[_dates.length - 1]) {
          marginTop = _margin;
        }
      }
      style = `width:calc(${chunk.days * 100}% + ${(chunk.days - 1) * 7}px);margin-top:${marginTop}px;`;
      if (bgColor) {
        style += `background-color:${bgColor};`;
      }
      if (txtColor) {
        style += `color:${txtColor};`;
      }
      classes = [
        $theme.event,
        ...$_iClasses([], event),
        ...createEventClasses($eventClassNames, event, $_view)
      ].join(" ");
    }
  }
  createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view);
  onclick = createHandler($eventClick, display);
  $$unsubscribe_eventClick();
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_dayMaxEvents();
  $$unsubscribe__popupDate();
  $$unsubscribe__interaction();
  $$unsubscribe__view();
  $$unsubscribe_eventAllUpdated();
  $$unsubscribe_eventDidMount();
  $$unsubscribe__intlEventTime();
  $$unsubscribe_theme();
  $$unsubscribe_eventContent();
  $$unsubscribe_displayEventEnd();
  $$unsubscribe_eventClassNames();
  $$unsubscribe__iClasses();
  $$unsubscribe_eventTextColor();
  $$unsubscribe_resources();
  $$unsubscribe_eventColor();
  $$unsubscribe_eventBackgroundColor();
  $$unsubscribe_eventMouseEnter();
  $$unsubscribe_eventMouseLeave();
  return ` <article${add_attribute("class", classes, 0)}${add_attribute("style", style, 0)}${add_attribute("role", onclick ? "button" : void 0, 0)}${add_attribute("tabindex", onclick ? 0 : void 0, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.eventBody, 0)}></div> ${validate_component($_interaction.resizer || missing_component, "svelte:component").$$render($$result, { event }, {}, {})}</article>`;
});
const Popup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe__interaction;
  let $_popupDate, $$unsubscribe__popupDate;
  let $_popupChunks, $$unsubscribe__popupChunks;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__intlDayPopover;
  let $buttonText, $$unsubscribe_buttonText;
  let { buttonText, theme, _interaction, _intlDayPopover, _popupDate, _popupChunks } = getContext("state");
  $$unsubscribe_buttonText = subscribe(buttonText, (value) => $buttonText = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  $$unsubscribe__intlDayPopover = subscribe(_intlDayPopover, (value) => value);
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => $_popupDate = value);
  $$unsubscribe__popupChunks = subscribe(_popupChunks, (value) => $_popupChunks = value);
  let el;
  let style = "";
  $$unsubscribe__interaction();
  $$unsubscribe__popupDate();
  $$unsubscribe__popupChunks();
  $$unsubscribe_theme();
  $$unsubscribe__intlDayPopover();
  $$unsubscribe_buttonText();
  return `<div${add_attribute("class", $theme.popup, 0)}${add_attribute("style", style, 0)}${add_attribute("this", el, 0)}><div${add_attribute("class", $theme.dayHead, 0)}><time${add_attribute("datetime", toISOString($_popupDate, 10), 0)}></time>  <a role="button" tabindex="0"${add_attribute("aria-label", $buttonText.close, 0)}>×</a></div> <div${add_attribute("class", $theme.events, 0)}>${each($_popupChunks, (chunk) => {
    return `${validate_component(Event, "Event").$$render($$result, { chunk, inPopup: true }, {}, {})}`;
  })}</div></div>`;
});
const Day = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_popupChunks, $$unsubscribe__popupChunks;
  let $_popupDate, $$unsubscribe__popupDate;
  let $moreLinkContent, $$unsubscribe_moreLinkContent;
  let $_hiddenEvents, $$unsubscribe__hiddenEvents;
  let $highlightedDates, $$unsubscribe_highlightedDates;
  let $currentDate, $$unsubscribe_currentDate;
  let $_today, $$unsubscribe__today;
  let $theme, $$unsubscribe_theme;
  let $$unsubscribe__interaction;
  let $$unsubscribe__intlDayCell;
  let { date } = $$props;
  let { chunks } = $$props;
  let { longChunks } = $$props;
  let { iChunks = [] } = $$props;
  let { dates } = $$props;
  let { date: currentDate, dayMaxEvents, highlightedDates, moreLinkContent, theme, _hiddenEvents, _intlDayCell, _popupDate, _popupChunks, _today, _interaction, _queue } = getContext("state");
  $$unsubscribe_currentDate = subscribe(currentDate, (value) => $currentDate = value);
  $$unsubscribe_highlightedDates = subscribe(highlightedDates, (value) => $highlightedDates = value);
  $$unsubscribe_moreLinkContent = subscribe(moreLinkContent, (value) => $moreLinkContent = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => $_hiddenEvents = value);
  $$unsubscribe__intlDayCell = subscribe(_intlDayCell, (value) => value);
  $$unsubscribe__popupDate = subscribe(_popupDate, (value) => $_popupDate = value);
  $$unsubscribe__popupChunks = subscribe(_popupChunks, (value) => $_popupChunks = value);
  $$unsubscribe__today = subscribe(_today, (value) => $_today = value);
  $$unsubscribe__interaction = subscribe(_interaction, (value) => value);
  let el;
  let dayChunks;
  let isToday;
  let otherMonth;
  let highlight;
  let hiddenEvents = /* @__PURE__ */ new Set();
  let showPopup;
  let refs = [];
  function setPopupChunks() {
    let nextDay = addDay(cloneDate(date));
    let chunks2 = dayChunks.concat(longChunks[date.getTime()]?.chunks || []);
    set_store_value(_popupChunks, $_popupChunks = chunks2.map((chunk) => assign({}, chunk, createEventChunk(chunk.event, date, nextDay), { days: 1, dates: [date] })).sort((a, b) => a.top - b.top), $_popupChunks);
  }
  function reposition() {
    runReposition(refs, dayChunks);
  }
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.chunks === void 0 && $$bindings.chunks && chunks !== void 0)
    $$bindings.chunks(chunks);
  if ($$props.longChunks === void 0 && $$bindings.longChunks && longChunks !== void 0)
    $$bindings.longChunks(longChunks);
  if ($$props.iChunks === void 0 && $$bindings.iChunks && iChunks !== void 0)
    $$bindings.iChunks(iChunks);
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  if ($$props.reposition === void 0 && $$bindings.reposition && reposition !== void 0)
    $$bindings.reposition(reposition);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        dayChunks = [];
        hiddenEvents.clear();
        hiddenEvents = hiddenEvents;
        for (let chunk of chunks) {
          if (datesEqual(chunk.date, date)) {
            dayChunks.push(chunk);
          }
        }
      }
    }
    set_store_value(_hiddenEvents, $_hiddenEvents[date.getTime()] = hiddenEvents, $_hiddenEvents);
    isToday = datesEqual(date, $_today);
    {
      {
        otherMonth = date.getUTCMonth() !== $currentDate.getUTCMonth();
        highlight = $highlightedDates.some((d) => datesEqual(d, date));
      }
    }
    {
      if ($_hiddenEvents && hiddenEvents.size) {
        let text = "+" + hiddenEvents.size + " more";
        if ($moreLinkContent) {
          is_function($moreLinkContent) ? $moreLinkContent({ num: hiddenEvents.size, text }) : $moreLinkContent;
        }
      }
    }
    showPopup = $_popupDate && datesEqual(date, $_popupDate);
    {
      if (showPopup && longChunks && dayChunks) {
        tick().then(setPopupChunks);
      }
    }
    $$rendered = `<div class="${escape($theme.day, true) + " " + escape($theme.weekdays?.[date.getUTCDay()], true) + escape(isToday ? " " + $theme.today : "", true) + escape(otherMonth ? " " + $theme.otherMonth : "", true) + escape(highlight ? " " + $theme.highlight : "", true)}" role="cell"${add_attribute("this", el, 0)}><time${add_attribute("class", $theme.dayHead, 0)}${add_attribute("datetime", toISOString(date, 10), 0)}></time>  ${iChunks[2] && datesEqual(iChunks[2].date, date) ? `<div${add_attribute("class", $theme.events, 0)}>${validate_component(Event, "Event").$$render($$result, { chunk: iChunks[2] }, {}, {})}</div>` : ``}  ${iChunks[0] && datesEqual(iChunks[0].date, date) ? `<div class="${escape($theme.events, true) + " " + escape($theme.preview, true)}">${validate_component(Event, "Event").$$render($$result, { chunk: iChunks[0] }, {}, {})}</div>` : ``} <div${add_attribute("class", $theme.events, 0)}>${each(dayChunks, (chunk, i) => {
      return `${validate_component(Event, "Event").$$render(
        $$result,
        { chunk, longChunks, dates, this: refs[i] },
        {
          this: ($$value) => {
            refs[i] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div> ${showPopup ? `${validate_component(Popup, "Popup").$$render($$result, {}, {}, {})}` : ``} <div${add_attribute("class", $theme.dayFoot, 0)}>${hiddenEvents.size ? `  <a role="button" tabindex="0" aria-haspopup="true"></a>` : ``}</div></div>`;
  } while (!$$settled);
  $$unsubscribe__popupChunks();
  $$unsubscribe__popupDate();
  $$unsubscribe_moreLinkContent();
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_highlightedDates();
  $$unsubscribe_currentDate();
  $$unsubscribe__today();
  $$unsubscribe_theme();
  $$unsubscribe__interaction();
  $$unsubscribe__intlDayCell();
  return $$rendered;
});
const Week = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_hiddenEvents, $$unsubscribe__hiddenEvents;
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $_iEvents, $$unsubscribe__iEvents;
  let $_events, $$unsubscribe__events;
  let $theme, $$unsubscribe_theme;
  let { dates } = $$props;
  let { _events, _iEvents, _queue2, _hiddenEvents, hiddenDays, theme } = getContext("state");
  $$unsubscribe__events = subscribe(_events, (value) => $_events = value);
  $$unsubscribe__iEvents = subscribe(_iEvents, (value) => $_iEvents = value);
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => $_hiddenEvents = value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let chunks, longChunks, iChunks = [];
  let start;
  let end;
  let refs = [];
  let debounceHandle = {};
  function reposition() {
    debounce(() => runReposition(refs, dates), debounceHandle, _queue2);
  }
  if ($$props.dates === void 0 && $$bindings.dates && dates !== void 0)
    $$bindings.dates(dates);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        start = dates[0];
        end = addDay(cloneDate(dates[dates.length - 1]));
      }
    }
    {
      {
        chunks = [];
        for (let event of $_events) {
          if (!bgEvent(event.display) && eventIntersects(event, start, end)) {
            let chunk = createEventChunk(event, start, end);
            chunks.push(chunk);
          }
        }
        longChunks = prepareEventChunks(chunks, $hiddenDays);
        reposition();
      }
    }
    iChunks = $_iEvents.map((event) => {
      let chunk;
      if (event && eventIntersects(event, start, end)) {
        chunk = createEventChunk(event, start, end);
        prepareEventChunks([chunk], $hiddenDays);
      } else {
        chunk = null;
      }
      return chunk;
    });
    {
      if ($_hiddenEvents) {
        tick().then(reposition);
      }
    }
    $$rendered = `<div${add_attribute("class", $theme.days, 0)} role="row">${each(dates, (date, i) => {
      return `${validate_component(Day, "Day").$$render(
        $$result,
        {
          date,
          chunks,
          longChunks,
          iChunks,
          dates,
          this: refs[i]
        },
        {
          this: ($$value) => {
            refs[i] = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div> `;
  } while (!$$settled);
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_hiddenDays();
  $$unsubscribe__iEvents();
  $$unsubscribe__events();
  $$unsubscribe_theme();
  return $$rendered;
});
const Body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $_viewDates, $$unsubscribe__viewDates;
  let $dayMaxEvents, $$unsubscribe_dayMaxEvents;
  let $_hiddenEvents, $$unsubscribe__hiddenEvents;
  let $hiddenDays, $$unsubscribe_hiddenDays;
  let $theme, $$unsubscribe_theme;
  let $_bodyEl, $$unsubscribe__bodyEl;
  let { _bodyEl, _viewDates, _hiddenEvents, dayMaxEvents, hiddenDays, theme } = getContext("state");
  $$unsubscribe__bodyEl = subscribe(_bodyEl, (value) => $_bodyEl = value);
  $$unsubscribe__viewDates = subscribe(_viewDates, (value) => $_viewDates = value);
  $$unsubscribe__hiddenEvents = subscribe(_hiddenEvents, (value) => $_hiddenEvents = value);
  $$unsubscribe_dayMaxEvents = subscribe(dayMaxEvents, (value) => $dayMaxEvents = value);
  $$unsubscribe_hiddenDays = subscribe(hiddenDays, (value) => $hiddenDays = value);
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let weeks;
  let days2;
  {
    {
      weeks = [];
      days2 = 7 - $hiddenDays.length;
      set_store_value(_hiddenEvents, $_hiddenEvents = {}, $_hiddenEvents);
      for (let i = 0; i < $_viewDates.length / days2; ++i) {
        let dates = [];
        for (let j = 0; j < days2; ++j) {
          dates.push($_viewDates[i * days2 + j]);
        }
        weeks.push(dates);
      }
    }
  }
  $$unsubscribe__viewDates();
  $$unsubscribe_dayMaxEvents();
  $$unsubscribe__hiddenEvents();
  $$unsubscribe_hiddenDays();
  $$unsubscribe_theme();
  $$unsubscribe__bodyEl();
  return `<div class="${escape($theme.body, true) + escape($dayMaxEvents === true ? " " + $theme.uniform : "", true)}"${add_attribute("this", $_bodyEl, 0)}><div${add_attribute("class", $theme.content, 0)}>${each(weeks, (dates) => {
    return `${validate_component(Week, "Week").$$render($$result, { dates }, {}, {})}`;
  })}</div></div>`;
});
const View = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(Body, "Body").$$render($$result, {}, {}, {})}`;
});
const DayGrid = {
  createOptions(options) {
    options.dayMaxEvents = false;
    options.dayCellFormat = { day: "numeric" };
    options.dayPopoverFormat = { month: "long", day: "numeric", year: "numeric" };
    options.moreLinkContent = void 0;
    options.buttonText.dayGridMonth = "month";
    options.buttonText.close = "Close";
    options.theme.uniform = "ec-uniform";
    options.theme.dayFoot = "ec-day-foot";
    options.theme.popup = "ec-popup";
    options.view = "dayGridMonth";
    options.views.dayGridMonth = {
      buttonText: btnTextMonth,
      component: View,
      dayHeaderFormat: { weekday: "short" },
      dayHeaderAriaLabelFormat: { weekday: "long" },
      displayEventEnd: false,
      duration: { months: 1 },
      theme: themeView("ec-day-grid ec-month-view"),
      titleFormat: { year: "numeric", month: "long" }
    };
  },
  createStores(state) {
    state._days = days(state);
    state._intlDayCell = intl(state.locale, state.dayCellFormat);
    state._intlDayPopover = intl(state.locale, state.dayPopoverFormat);
    state._hiddenEvents = writable({});
    state._popupDate = writable(null);
    state._popupChunks = writable([]);
  }
};
const css = {
  code: ".calendar-cont.svelte-1t5rzyx{padding:3rem;background-color:#f5f5f5;border-radius:10px;height:60rem}",
  map: `{"version":3,"file":"Calendar.svelte","sources":["Calendar.svelte"],"sourcesContent":["<script>\\r\\n    // @ts-nocheck\\r\\n    import { afterUpdate, onMount } from \\"svelte\\";\\r\\n    import { user } from \\"./auth/userStore\\";\\r\\n    import { Loading } from \\"carbon-components-svelte\\";\\r\\n    import { loading, fasts, dataFetched } from \\"./stores\\";\\r\\n    import Calendar from '@event-calendar/core';\\r\\n    import DayGrid from '@event-calendar/day-grid'\\r\\n    import '@event-calendar/core/index.css';\\r\\n    import './style/calendar.css'\\r\\n    import { aws_stages } from \\"../aws/stages\\";\\r\\n    import axios from \\"axios\\";\\r\\n   \\r\\n    let ec;\\r\\n    let plugins = [DayGrid];\\r\\n    let options = {\\r\\n        view: 'dayGridMonth',\\r\\n        events: [],\\r\\n        eventContent: renderEventContent,\\r\\n        datesSet: handleDatesSet,\\r\\n        height: 'auto',\\r\\n    }\\r\\n    \\r\\n    let showDuration = true;\\r\\n    \\r\\n   \\r\\n    onMount(async () => {\\r\\n        if ($user?.username && !$dataFetched) {\\r\\n            await fetchFasts();\\r\\n        } else {\\r\\n            updateCalendarEvents()\\r\\n        }\\r\\n    });\\r\\n   \\r\\n    $: if ($user !== null && !$dataFetched){\\r\\n        fetchFasts()\\r\\n    }\\r\\n\\r\\n\\r\\n    async function fetchFasts() {\\r\\n        if ($dataFetched || $fasts.length > 0){\\r\\n            updateCalendarEvents()\\r\\n        }\\r\\n\\r\\n        try {\\r\\n            $loading = true;\\r\\n            const username = $user?.username\\r\\n            console.log($user)\\r\\n            console.log('Fetching fasts for username:', username);\\r\\n            const url = aws_stages.API_GET_ALL_URL.replace(\\"{username}\\", username);\\r\\n            const response = await axios.get(url);\\r\\n            $fasts = response.data;\\r\\n            $dataFetched = true;\\r\\n            console.log('Fetched fasts:', fasts);\\r\\n            $loading = false;\\r\\n            updateCalendarEvents();\\r\\n        } catch (err) {\\r\\n            console.error('Error fetching fasts: ', err)\\r\\n            $loading = false;\\r\\n        }\\r\\n    }\\r\\n   \\r\\n\\r\\n    function millisToHours(millis) {\\r\\n        return Math.round(millis / (60 * 60 * 1000) * 10) / 10; // Round to 1 decimal place\\r\\n    }\\r\\n\\r\\n\\r\\n\\r\\n    function updateCalendarEvents() {\\r\\n        console.log('Updating calendar events. Fasts:', $fasts);\\r\\n        const events = $fasts.map(fast => ({\\r\\n            start: new Date(Number(fast.StartDate)),\\r\\n            end: new Date(Number(fast.EndDate)),\\r\\n            title: showDuration ? \`\${fast.ExpectedDuration}h\` : \`\`,\\r\\n            extendedProps: {\\r\\n                expectedDuration: Number(fast.ExpectedDuration),\\r\\n                actualDuration: Number(fast.ActualDuration),\\r\\n                success: fast.Succeeded\\r\\n            }\\r\\n        }));\\r\\n       \\r\\n        if (ec) {\\r\\n            ec.setOption('events', events);\\r\\n        } else {\\r\\n            options.events = events;\\r\\n        }\\r\\n    }\\r\\n\\r\\n    function renderEventContent(info) {\\r\\n        const expectedDuration = info.event.extendedProps.expectedDuration;\\r\\n        const actualDuration = millisToHours(info.event.extendedProps.actualDuration);\\r\\n        const success = info.event.extendedProps.success;\\r\\n        const color = getColorForDuration(actualDuration);\\r\\n        console.log(\`Event: Expected \${expectedDuration}h, Actual \${actualDuration}h, Color: \${color}\`);\\r\\n        return {\\r\\n            html: \`<div class=\\"fast-event\\" style=\\"background-color: \${color}; color: white; padding: 1.2rem 5rem; font-weight: bold; font-size: 0.8em; white-space: nowrap;\\">\\r\\n                     \${info.event.title} (\${actualDuration}h) : \${success ? 'Succeeded' : 'Incomplete'}\\r\\n                   </div>\`\\r\\n        };\\r\\n    }\\r\\n\\r\\n    function getColorForDuration(duration) {\\r\\n        if (duration < 12) return 'var(--lighter-color)';\\r\\n        if (duration < 24) return 'var(--secondary-color)';\\r\\n        if (duration < 48) return 'var(--rare-color)';\\r\\n        return '#DDA0DD';\\r\\n    }\\r\\n\\r\\n    function handleDatesSet(info) {\\r\\n        console.log('Date range changed:', info.start, info.end);\\r\\n    }\\r\\n   \\r\\n<\/script>\\r\\n\\r\\n\\r\\n\\r\\n<style global>\\r\\n      .calendar-cont {\\r\\n        padding: 3rem;\\r\\n        background-color: #f5f5f5;\\r\\n        border-radius: 10px;\\r\\n        height: 60rem;\\r\\n    }\\r\\n\\r\\n\\r\\n  </style>\\r\\n\\r\\n\\r\\n{#if $user !== null}\\r\\n    {#if $loading}\\r\\n        <Loading />\\r\\n    {:else}\\r\\n\\r\\n    <div class=\\"calendar-cont\\">\\r\\n        <Calendar bind:this={ec} {plugins} {options} />\\r\\n    </div>\\r\\n    {/if}\\r\\n{:else}\\r\\n    <div>\\r\\n        <h2>Log in to see the calendar</h2>\\r\\n    </div>    \\r\\n{/if}"],"names":[],"mappings":"AAsHM,6BAAe,CACb,OAAO,CAAE,IAAI,CACb,gBAAgB,CAAE,OAAO,CACzB,aAAa,CAAE,IAAI,CACnB,MAAM,CAAE,KACZ"}`
};
function millisToHours(millis) {
  return Math.round(millis / (60 * 60 * 1e3) * 10) / 10;
}
function renderEventContent(info) {
  const expectedDuration = info.event.extendedProps.expectedDuration;
  const actualDuration = millisToHours(info.event.extendedProps.actualDuration);
  const success = info.event.extendedProps.success;
  const color = getColorForDuration(actualDuration);
  console.log(`Event: Expected ${expectedDuration}h, Actual ${actualDuration}h, Color: ${color}`);
  return {
    html: `<div class="fast-event" style="background-color: ${color}; color: white; padding: 1.2rem 5rem; font-weight: bold; font-size: 0.8em; white-space: nowrap;">
                     ${info.event.title} (${actualDuration}h) : ${success ? "Succeeded" : "Incomplete"}
                   </div>`
  };
}
function getColorForDuration(duration) {
  if (duration < 12)
    return "var(--lighter-color)";
  if (duration < 24)
    return "var(--secondary-color)";
  if (duration < 48)
    return "var(--rare-color)";
  return "#DDA0DD";
}
function handleDatesSet(info) {
  console.log("Date range changed:", info.start, info.end);
}
const Calendar_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $fasts, $$unsubscribe_fasts;
  let $loading, $$unsubscribe_loading;
  let $dataFetched, $$unsubscribe_dataFetched;
  let $user, $$unsubscribe_user;
  $$unsubscribe_fasts = subscribe(fasts, (value) => $fasts = value);
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  $$unsubscribe_dataFetched = subscribe(dataFetched, (value) => $dataFetched = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let ec;
  let plugins = [DayGrid];
  let options = {
    view: "dayGridMonth",
    events: [],
    eventContent: renderEventContent,
    datesSet: handleDatesSet,
    height: "auto"
  };
  async function fetchFasts() {
    if ($dataFetched || $fasts.length > 0) {
      updateCalendarEvents();
    }
    try {
      set_store_value(loading, $loading = true, $loading);
      const username = $user?.username;
      console.log($user);
      console.log("Fetching fasts for username:", username);
      const url = aws_stages.API_GET_ALL_URL.replace("{username}", username);
      const response = await axios.get(url);
      set_store_value(fasts, $fasts = response.data, $fasts);
      set_store_value(dataFetched, $dataFetched = true, $dataFetched);
      console.log("Fetched fasts:", fasts);
      set_store_value(loading, $loading = false, $loading);
      updateCalendarEvents();
    } catch (err) {
      console.error("Error fetching fasts: ", err);
      set_store_value(loading, $loading = false, $loading);
    }
  }
  function updateCalendarEvents() {
    console.log("Updating calendar events. Fasts:", $fasts);
    const events2 = $fasts.map((fast) => ({
      start: new Date(Number(fast.StartDate)),
      end: new Date(Number(fast.EndDate)),
      title: `${fast.ExpectedDuration}h`,
      extendedProps: {
        expectedDuration: Number(fast.ExpectedDuration),
        actualDuration: Number(fast.ActualDuration),
        success: fast.Succeeded
      }
    }));
    if (ec) {
      ec.setOption("events", events2);
    } else {
      options.events = events2;
    }
  }
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if ($user !== null && !$dataFetched) {
        fetchFasts();
      }
    }
    $$rendered = `${$user !== null ? `${$loading ? `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}` : `<div class="calendar-cont svelte-1t5rzyx">${validate_component(Calendar, "Calendar").$$render(
      $$result,
      { plugins, options, this: ec },
      {
        this: ($$value) => {
          ec = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`}` : `<div data-svelte-h="svelte-1tfp12f"><h2>Log in to see the calendar</h2></div>`}`;
  } while (!$$settled);
  $$unsubscribe_fasts();
  $$unsubscribe_loading();
  $$unsubscribe_dataFetched();
  $$unsubscribe_user();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Calendar_1, "Calendar").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

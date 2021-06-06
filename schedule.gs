function createScheduleMessage(mode) {

  // 取得対象のカレンダーID
  let calendarIds = ['XXXXXX', 'XXXXXX'];

  // すべてのカレンダーを取得する
  let calendars = [];
  for (let calendarId of calendarIds) {
    calendars.push(CalendarApp.getCalendarById(calendarId));
  }

  // モード選択(今日/明日)
  let message = "";
  let date = new Date();
  if (mode == MODE_TODAY) {
    message += "今日";
  } else if (mode == MODE_TOMORROW) {
    message += "明日";
    date.setDate(date.getDate() + 1);
  }

  // すべてのイベントを取得する
  let events = [];
  for (let calendar of calendars) {
    events.push(calendar.getEventsForDay(date));
  }

  // サブイベントの深さを統一
  events = events.flat();

  // 予定がない場合
  if (events.length == 0) {
    message += "の予定はありません。";
    return message;
  }

  // 予定がある場合
  message += "の予定です。\n";

  let targetSchedules = [];
  for (let event of events) {
    // タイトル取得
    let title = event.getTitle();
    targetSchedules.push(title);
  }

  return message + createMessageFromList(targetSchedules);
}
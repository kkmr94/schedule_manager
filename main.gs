function push() {
  // push通知URL
  let url = "https://api.line.me/v2/bot/message/push";

  // userID 
  let to = "XXXXXX";

  let headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  let postData = {
    "to": to,
    "messages": [
      {
        'type': 'text',
        'text': "おはようございます。",
      },
      {
        'type': 'text',
        'text': createScheduleMessage(MODE_TODAY),
      },
      {
        'type': 'text',
        'text': createTaskMessage(),
      }
    ]
  };

  let options = {
    "headers": headers,
    "method": "post",
    "payload": JSON.stringify(postData)
  };

  return UrlFetchApp.fetch(url, options);
}

function doPost(e) {
  // イベント取得
  let event = JSON.parse(e.postData.contents).events[0];
  // 応答用Token
  let replyToken = event.replyToken;
  // ユーザーメッセージ
  let userMessage = event.message.text;
  // 応答URL
  let url = 'https://api.line.me/v2/bot/message/reply';

  let message = "";
  // 今日の予定
  if (userMessage == USERMESSAGE_TODAY) {
    message = createScheduleMessage(MODE_TODAY);
  }
  // 明日の予定
  else if (userMessage == USERMESSAGE_TOMORROW) {
    message = createScheduleMessage(MODE_TOMORROW);
  }
  else {
    message = "不正なメッセージです。"
  }

  let headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  let postData = {
    'replyToken': replyToken,
    'messages': [
      {
        'type': 'text',
        'text': message,
      }
    ],
  };

  let options = {
    'headers': headers,
    'method': 'post',
    'payload': JSON.stringify(postData),
  };

  UrlFetchApp.fetch(url, options);

  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}
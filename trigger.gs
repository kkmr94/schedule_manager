function deleteTrigger() {
  let allTriggers = ScriptApp.getProjectTriggers();
  // すべてのトリガーを削除する
  for (var i in allTriggers) {
    ScriptApp.deleteTrigger(allTriggers[i]);
  }
}

function setTrigger() {
  // 実行日時のDateを取得
  let now = new Date();
  // 実行日時のDateを元に、当日8時のDateを作成
  let setTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8);
  // トリガーを設定する
  ScriptApp.newTrigger('push').timeBased().at(setTime).create();
}
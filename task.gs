function createTaskMessage() {
  // すべてのタスクを取得する
  let allTaskLists = Tasks.Tasklists.list();

  // タスクが存在しない場合
  if (!allTaskLists.items) {
    return "今日のタスクはありません";
  }

  // タスクが存在する場合
  let targetTaskLists = [];

  for (let i = 0; i < allTaskLists.items.length; i++) {
    let taskList = allTaskLists.items[i];
    let id = taskList.id;

    // リスト内のタスクを取得する
    let tasks = Tasks.Tasks.list(id);

    // リストにアイテムが含まれない場合は次のリストへ
    if (!tasks.items) {
      continue;
    }

    for (let i = 0; i < tasks.items.length; i++) {
      let task = tasks.items[i];

      // 期限が設定されていないタスクは読み飛ばす
      if (!task.due) {
        continue;
      }

      let taskDate = new Date(task.due);
      let now = new Date();

      // タスクの期限が実行日の場合
      if (taskDate.getFullYear() == now.getFullYear()
        && taskDate.getMonth() == now.getMonth()
        && taskDate.getDate() == now.getDate()) {
        // 出力対象リストに追加する
        targetTaskLists.push(task.title);
      }
    }
  }

  if(targetTaskLists.length == 0){
    return "今日のタスクはありません";
  }
  
  let message = "今日のタスクです。\n"
  message += createMessageFromList(targetTaskLists);

  return message;
}
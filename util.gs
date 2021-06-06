function createMessageFromList(list) {

  let message = "";

  for (var i = 0; i < list.length; i++) {
    message += "[" + (i + 1) + "] " + list[i];
    if (i < list.length - 1) {
      message += "\n";
    }
  }

  return message;
}
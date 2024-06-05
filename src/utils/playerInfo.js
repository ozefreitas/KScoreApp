export function getPlayerTeam(player) {
  return player.split("|")[2];
}

export function getPlayerNumber(player) {
  return player.split("|")[1];
}

export function getPlayerName(player) {
  return player.split("|")[0];
}

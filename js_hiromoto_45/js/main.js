'use strict';

let players = [];
const startBtnNode = document.getElementById("start");
const selectPlayerNode = document.querySelector(".select-player");
const selectHandNode = document.querySelector(".select-hand");
const displayHandNode = document.getElementById("display-hand");
const displayResultNode = document.getElementById("display-result");
const restartBtnNode = document.getElementById("restart");
const resetBtnNode = document.getElementById("reset");
const jankenHands = ["グー","チョキ","パー"]
const recordNode = document.getElementById("record");

if (localStorage.getItem('win') === null) {
  localStorage.setItem('win', 0);
}
if (localStorage.getItem('lose') === null) {
  localStorage.setItem('lose', 0);
}
recordNode.innerHTML = `現在の成績は${localStorage.getItem('win')}勝:${localStorage.getItem('lose')}敗`;

function start() {
  startBtnNode.classList.add("disabled");
  selectPlayerNode.classList.remove("disabled");  
}

startBtnNode.addEventListener('click', e => {
  start();
})

function selectPlayer() {
  let selectNode = document.querySelector('[name="player-number"]');
  let player_num = selectNode.selectedIndex + 1;
  if (player_num >= 2) {
    console.log(`${player_num}人で対戦します。`);
    for(let i = 0; i < player_num; i++) {
      let player = new Player(i);
      (i === 0) ? player.type = 0 : player.type = 1
      players.push(player);
    }
  }
  selectPlayerNode.classList.add("disabled");
  selectHandNode.classList.remove("disabled");
}


function displayHand(players) {
  for (let i = 0; i < players.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = `CPU${players[i].id}の出した手は${jankenHands[players[i].hand - 1]}です。`;
    if (i === 0) {
      div.innerHTML = `あなたの出した手は${jankenHands[players[i].hand - 1]}です。`;
    }
    displayHandNode.appendChild(div);
  }
}

function janken() {
  for (let i = 0; i < players.length; i++) {
    if (players[i].type === 1) {
      players[i].autoSelectHand();
    }
  }
  displayHand(players);
  judge(players);
}

function judge(players) {
  let rock_players =[];
  let scissors_players =[];
  let paper_players =[];
  
  for (let i = 0; i < players.length; i++) {
    if (players[i].hand === 1) {
      rock_players.push(players[i]);
    } else if (players[i].hand === 2) {
      scissors_players.push(players[i]);
    } else if (players[i].hand === 3) {
      paper_players.push(players[i]);
    }
  }

  let h1 = document.createElement("h1");
  let win_num = localStorage.getItem('win');
  let lose_num = localStorage.getItem('lose');
  win_num = Number(win_num) + 1;
  lose_num = Number(lose_num) + 1;

  if (rock_players.length !== 0 && paper_players.length === 0 && scissors_players.length !== 0) {
    if (players[0].hand === 1) {
      h1.innerHTML = "あなたはグーで勝ちました";
      localStorage.setItem('win', win_num);
    } else {
      h1.innerHTML = "あなたはチョキで負けました";
      localStorage.setItem('lose', lose_num);
    }
  } else if (rock_players.length !== 0 && paper_players.length !== 0 && scissors_players.length === 0) {
    if (players[0].hand === 3) {
      h1.innerHTML = "あなたはパーで勝ちました";
      localStorage.setItem('win', win_num);
    } else {
      h1.innerHTML = "あなたはグーで負けました";
      localStorage.setItem('lose', lose_num);
    }
  } else if (rock_players.length === 0 && paper_players.length !== 0 && scissors_players.length !== 0) {
    if (players[0].hand === 2) {
      h1.innerHTML = "あなたはチョキで勝ちました";
      localStorage.setItem('win', win_num);
    } else {
      h1.innerHTML = "あなたはパーで負けました";
      localStorage.setItem('lose', lose_num);
    }
  } else {
    h1.innerHTML = "あいこです";
  }
  displayResultNode.appendChild(h1);
  restartBtnNode.classList.remove("disabled");
  recordNode.innerHTML = `現在の成績は${localStorage.getItem('win')}勝:${localStorage.getItem('lose')}敗`;
}

function restart() {
  location.reload();
}

restartBtnNode.addEventListener('click', e => {
  restart();
})

function reset() {
  localStorage.clear();
  restart();
}

resetBtnNode.addEventListener('click', e => {
  reset();
})
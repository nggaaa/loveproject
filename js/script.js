var i = 0;
var noCount = 0;
var score = 0;
const config = {
  interval: 2000,
  botToken: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  chatId: "xxxxxxxxx",
};

const message = [
  "Hai",
  "Apa kabar?",
  "Semoga kamu dalam keadaan yang baik.",
  "Aku mau ngomong sama kamu.",
  "Aku selama ini suka sama kamu.",
  "Kamu suka nggak sama aku?",
  "Berapa persentasenya?",
  "Berapa persentasenya?",
  "Terima kasih udah mengerti ",
  "Tetap semangat ya",
  "Selalu berikan yang terbaik",
  "Bagi diri sendiri dan orang lain",
  "Sekian",
  "♥️ ILY ♥️",
];

const slidetext = () => {
  document.getElementById("content").innerHTML = message[i];
  i++;
};
var firstmsg = setInterval(() => {
  if (i == 5) {
    clearInterval(firstmsg);
    document.getElementById("confirmation").className = "mt-5 space-x-10";
  }
  slidetext();
}, config.interval);

var nostate = 0;
document.getElementById("nobtn").addEventListener("mouseover", () => {
  noCount++;
  var classnoBTN =
    "text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-yellow-600";
  if (nostate == 0) {
    document.getElementById("nobtn").className = classnoBTN + " absolute top-0";
    document.getElementById("nobtn").className =
      classnoBTN + " absolute left-0";
    nostate++;
  } else {
    document.getElementById("nobtn").className = classnoBTN + " absolute top-0";
    document.getElementById("nobtn").className =
      classnoBTN + " absolute right-0";
    nostate++;
    nostate = 0;
  }
});
document.getElementById("yesbtn").addEventListener("click", () => {
  document.getElementById("confirmation").className = "hidden";
  document.getElementById("content").innerHTML = message[i];
  document.getElementById("score").className = "block mt-5 w-3/4 xl:w-1/2";
});

document.getElementById("score").addEventListener("change", () => {
  const btnClass =
    "text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-pink-400 hover:bg-pink-500 focus:outline-none focus:ring-pink-600";
  score = document.getElementById("scorerange").value;
  document.getElementById("scoreval").innerText = score + "%";
  if (score >= 50) {
    document.getElementById("confirmscore").className = btnClass;
  } else {
    document.getElementById("confirmscore").className =
      "pointer-events-none " + btnClass;
  }
});

document.getElementById("confirmscore").addEventListener("click", () => {
  document.getElementById("content").innerHTML = message[i + 2] + score + "%";
  document.getElementById("score").className = "hidden";
  i = i + 3;
  const xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    `https://api.telegram.org/bot${config.botToken}/sendMessage?chat_id=${config.chatId}&text=Ya%3A%20${score}%%20%7C%7C%20Tidak%3A%20${noCount}`,
    true
  );
  xhttp.send();
  var secondmsg = setInterval(() => {
    if (i == message.length) {
      document.getElementById("info").className =
        "text-pink-400 text-xl font-bold text-center";
      clearInterval(secondmsg);
    } else {
      slidetext();
    }
  }, config.interval);
});

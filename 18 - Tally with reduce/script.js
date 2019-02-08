class Seconds {
  constructor(seconds) {
    this.seconds = seconds;
  }

  get HHMMSS() {
    let secondsLeft = this.seconds;
    const hours = Math.floor(secondsLeft / 3600);
    secondsLeft %= 3600;
    const minutes = Math.floor(secondsLeft / 60);
    secondsLeft %= 60;
    return [hours, minutes, secondsLeft].join(':');
  }
}

class VideoList {
  constructor(list) {
    this.list = [...list];
  }

  get totalTimeInSeconds() {
    return new Seconds(
      this.list
        .map(node => node.dataset.time)
        .map((timeCode) => {
          const [mins, secs] = timeCode.split(':').map(parseFloat);
          return mins * 60 + secs;
        })
        .reduce((total, seconds) => total + seconds),
    );
  }

  get totalTimeInHHMMSS() {
    return this.totalTimeInSeconds.HHMMSS;
  }
}

const list = new VideoList(document.querySelectorAll('[data-time]'));

const total = list.totalTimeInHHMMSS;

console.log(total);

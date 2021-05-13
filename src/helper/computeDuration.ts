function computeDuration(duration: number): string {
    let time: any = new Date();
    // create Date object and set to today's date and time
    time.setHours((duration / 3600) % 24);
    time.setMinutes((duration / 60) % 60);
    time.setSeconds(duration % 60);
    time = time.toTimeString().split(" ")[0];
    const [hours, minutes, seconds]: string[] = time.split(":");
    let res = "";
    if (parseInt(hours)) {
      res = `${hours}:${minutes}:${seconds}`;
    } else res = `${minutes}:${seconds}`;
  
    return res;
  }


export default computeDuration;
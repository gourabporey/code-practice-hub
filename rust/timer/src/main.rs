use std::time::{Duration, Instant};

use rusty_time::Timer;

const USAGE: &str = "Usage: cargo run <timer-duration-seconds>, eg. cargo run 50";

fn main() {
  let args: Vec<String> = std::env::args().into_iter().collect();
  if let Some(x) = args.get(1) {
    let timer_duration: u64 = x.parse().expect(USAGE);
    println!("Starting a timer for duration: {} seconds", timer_duration);
    let mut timer = Timer::new(Duration::from_secs(timer_duration));
    let mut instant = Instant::now();
    loop {
      std::thread::sleep(Duration::from_millis(100));
      let time_elapsed = instant.elapsed();
      timer.tick(time_elapsed);
      instant = Instant::now();

      if timer.finished() {
        println!("Time's up");
        break;
      }
    }
  } else {
    println!("{USAGE}");
  }
}

fn _half_time_passed(timer: &Timer, timer_duration: u64) -> bool {
  let half_time = timer_duration / 2;
  return timer.remaining() == Duration::from_secs(half_time);
}

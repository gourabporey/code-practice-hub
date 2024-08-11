use rust::two_sum::two_sum;

fn main() {
  println!("Hello, world!");
  let indexes = two_sum(vec![1, 2, 3, 8], 9);
  print!("[{}, {}]", indexes.get(0).unwrap(), indexes.get(1).unwrap());
}

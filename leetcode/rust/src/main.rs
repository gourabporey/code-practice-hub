use rust::missed_and_repeated::find_missing_and_repeated_values;

fn main() {
  let grid = vec![vec![9, 1, 7], vec![8, 9, 2], vec![3, 4, 6]];
  find_missing_and_repeated_values(grid);
}

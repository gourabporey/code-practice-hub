use std::collections::HashMap;

fn parse_int(num_like: usize) -> i32 {
  num_like.to_string().parse().unwrap()
}

pub fn find_missing_and_repeated_values(grid: Vec<Vec<i32>>) -> Vec<i32> {
  let mut map: HashMap<i32, i32> = HashMap::new();
  let length = grid.len() * grid.len();

  for n in 1..(length + 1) {
    map.insert(parse_int(n), 0);
  }

  for grid_element in grid {
    for element in grid_element {
      *map.entry(element).or_insert(0) += 1;
    }
  }

  let mut missing_and_repeated_values = [0, 0];

  for (number, occurance) in &map {
    if occurance == &parse_int(2) {
      missing_and_repeated_values[0] = *number;
    }
    if occurance == &parse_int(0) {
      missing_and_repeated_values[1] = *number;
    }
  }

  return missing_and_repeated_values.to_vec();
}

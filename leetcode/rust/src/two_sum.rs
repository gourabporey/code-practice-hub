use std::collections::HashMap;

pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
  let mut solution: Vec<i32> = Vec::new();
  let mut map: HashMap<i32, usize> = HashMap::new();

  for (index, num) in nums.iter().enumerate() {
    if map.contains_key(num) {
      match map.get(num) {
        Some(x) => solution.push((*x).to_string().parse().unwrap()),
        None => print!("Some error occurred"),
      }
      solution.push(index.to_string().parse().unwrap());
    }
    map.insert(target - num, index);
  }

  solution
}

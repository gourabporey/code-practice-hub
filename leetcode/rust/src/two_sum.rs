use std::collections::HashMap;

fn parse_int(num_like: usize) -> i32 {
  num_like.to_string().parse().unwrap()
}

pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
  let mut map: HashMap<i32, usize> = HashMap::new();

  for (index, num) in nums.iter().enumerate() {
    if let Some(x) = map.get(num) {
      return vec![parse_int(*x), parse_int(index)];
    }
    map.insert(target - num, index);
  }

  vec![]
}

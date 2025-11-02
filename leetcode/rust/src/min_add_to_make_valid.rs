pub fn min_add_to_make_valid(s: String) -> i32 {
  let mut opening = 0;
  let mut unmatched = 0;

  for c in s.chars() {
    if c == '(' {
      opening += 1;
    } else {
      if opening > 0 {
        opening -= 1;
      } else {
        unmatched += 1;
      }
    }
  }

  return opening + unmatched;
}

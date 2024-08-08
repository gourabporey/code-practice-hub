// Silence some warnings so they don't distract from the exercise.
#![allow(unused_variables)]

use b_functions::{area_of, volume};

fn main() {
    let (width, height, depth) = (4, 7, 10);
    let mut a = 34;
    let mut b = 56;
    println!("a is {a} and b is {b}");
    (b, a) = (a, b);
    println!("a is {a} and b is {b}");
    
    {
        let area = area_of(width, height);
        println!("Area is {}", area);
    }

    println!("Volume is {}", volume(width, height, depth));
}
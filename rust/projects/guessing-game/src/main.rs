use std::io;
use rand::Rng;
use std::cmp::Ordering;

fn main() {
    println!("Guess the number: ");
    
    let secret_number = rand::thread_rng().gen_range(1..=100);
    println!("Secret Number: {secret_number}");
    
    println!("Please input your guess...");

    let mut guess = String::new();

    io::stdin()
    .read_line( &mut guess)
    .expect("Failed to readline");

    println!("You guessed: {guess}");

    match guess
    .parse::<i32>()
    .expect("Guess can not converted to Integer")
    .cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
}


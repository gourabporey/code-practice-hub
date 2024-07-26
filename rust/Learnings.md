## Rust

- `!` means calling a macro in rust, in the below example the `println!` is a macro

  ```rust
  fn main() {
    println!("Hello, world!");
  }
  ```

- ### Cargo Commands

  - `cargo new` : Creates a new project in cargo
  - `cargo build` : Build a project
  - `cargo run` : Build and run a project, By default it runs in debug mode, `cargo run --release` runs in production with optimization
  - `cargo check` : Checks if the code will compile without creating a build file

- ### Prelude
  Set of functions that rust imports for all programs

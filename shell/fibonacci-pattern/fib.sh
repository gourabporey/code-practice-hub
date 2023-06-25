#! /bin/zsh
NO_OF_TERMS=$1

echo -n  "" > second_last_term;
echo -n "a" > last_term;

yes "cat last_term second_last_term > sum_of_previous_terms; cat second_last_term | wc -c >> fibonacci_series; cat last_term > second_last_term; cat sum_of_previous_terms > last_term" | head -n$NO_OF_TERMS > zsh_command.sh

zsh zsh_command.sh

tail -n1 fibonacci_series

rm last_term second_last_term sum_of_previous_terms fibonacci_series zsh_command.sh

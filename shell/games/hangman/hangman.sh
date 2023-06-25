#! /bin/bash

function generate_random_word()
{
    cat countries_list.txt | sort -R | head -n1
}

function mask_word()
{
    local WORD=$1
    local LETTERS_TO_MASK=$2
    local MASKED_WORD=$(echo $WORD | tr "$LETTERS_TO_MASK" "_")
    echo $MASKED_WORD
}

function increase() 
{
    dc -e "$1 1 + p"
}

function guess_word()
{
    local WORD=$1
    local CURRENT_ATTEMPT=$2
    local MAX_ATTEMPT=$3
    
    if [ $CURRENT_ATTEMPT -gt $MAX_ATTEMPT ]
    then
        return 1
    fi

    read -p "Guess the word " USER_GUESS

    if [ -n "$USER_GUESS" -a $WORD = "$USER_GUESS" ]
    then
        return 0
    fi

    CURRENT_ATTEMPT=$(increase $CURRENT_ATTEMPT)

    guess_word $WORD $CURRENT_ATTEMPT $MAX_ATTEMPT
}

function get_no_of_character() 
{
    WORD=$1
    echo -n $WORD | wc -c
}

function is_valid_input()
{
    USER_GUESSED_LETTER=$1
    [ $(get_no_of_character $USER_GUESSED_LETTER) -eq 1 ]
}

function guess_letter()
{
    local CURRENT_ATTEMPT=$1
    local MAX_ATTEMPT=$2
    local WORD=$3
    local LETTERS_TO_MASK=$4

    if [ $CURRENT_ATTEMPT -gt $MAX_ATTEMPT ]
    then
        return 0
    fi

    read -p "Guess a letter between a - z: " USER_GUESSED_LETTER
    
    if is_valid_input $USER_GUESSED_LETTER
    then
        CURRENT_ATTEMPT=$(increase $CURRENT_ATTEMPT)
        LETTERS_TO_MASK=$(echo $LETTERS_TO_MASK | tr -d "$USER_GUESSED_LETTER")
        mask_word $WORD $LETTERS_TO_MASK
    fi

    guess_letter $CURRENT_ATTEMPT $MAX_ATTEMPT $WORD $LETTERS_TO_MASK 
}

function main()
{
    WORD=$(generate_random_word)
    CURRENT_ATTEMPT=1
    MAX_ATTEMPT=5
    LETTERS_TO_MASK="abcdefghijklmnopqrstuvwxyz"
    MESSAGE="Oops! Better luck next time"

    mask_word $WORD $LETTERS_TO_MASK
    echo No of characters: $(get_no_of_character $WORD)

    guess_letter $CURRENT_ATTEMPT $MAX_ATTEMPT $WORD $LETTERS_TO_MASK 
    
    guess_word $WORD $CURRENT_ATTEMPT $MAX_ATTEMPT 
    local GUESS_SUCESSFUL=$?

    if [ $GUESS_SUCESSFUL -eq 0 ] 
    then
        MESSAGE="Congrats you guessed it correctly"
    fi

    echo -e $MESSAGE "\nThe country name was : " $WORD
}

main

;; loop to take intput until the game is over
;; - change state of the game by adding 

(defn game-over? 
  [state] 
  (= 9 (get state :total-turns)))

(defn take-input
  [player]
  (print (str player "'s" "turn: "))
  (flush)
  (read-line))

(defn get-all-moves
  [state p1 p2]
  (concat (get state p1) (get state p2)))

(defn valid-move?
  [state p1 p2 move]
  (nil? ((set (get-all-moves state p1 p2)) move)))

(defn ttt
  [p1 p2]
  (loop 
   [players [p1 p2] 
    state {:total-turns 0 p1 [] p2 []}]
    (cond
      (game-over? state) (println "Game Over")
      :else (let [[curr, next] players
                  move (take-input curr)]
              (if (valid-move? state curr next move)
                (recur (reverse players) (-> state 
                                             (update-in [:total-turns] inc)
                                             (update-in [curr] #(conj % move))))
                (recur players state))))))

(ttt "g" "m")
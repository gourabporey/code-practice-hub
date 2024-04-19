(loop [value (read)]
  (cond
    (= value :exit) (println :bye-bye)
    (list? value) (do (println (eval value)) (recur (read)))
    :else (do (println value) (recur (read)))))
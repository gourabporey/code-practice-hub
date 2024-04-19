(spit "input.txt" "dummy")

(slurp "input.txt")

(defn take-2 [x y] ([x y]))

(pop [1 2 23])
(rest [1 2 23])


(def greatest-among-pairs (comp
                           (partial apply map max)
                           (juxt identity rest)))

#_(defn greatest-among-pairs [c] (map max c (rest c)))

(greatest-among-pairs [1 2 4 3 5 6])

;; '((1 2 3) (2 3 4)) '((1 2) (1 2) (1 2))

(let [x '((1 2) (1 2) (1 2)) y 0] (map (partial get x) y))

(def y '((1 2 3 4)
         (1 2 3 4)))

(def x '((1 1)
         (2 2)
         (3 3)))

(def transpose (partial apply map list))
(defn matrix-multiplication
  [x y]
  (partition-all
   (count (nth y 0))
   (for [m1 x, m2 (transpose y)] (reduce + (map * m1 m2)))))

(defn mm [m1 m2]
  (for [x m1]
    (for [y (transpose m2)]
      (apply + (map * x y)))))

(mm x y)


(matrix-multiplication x y)

#_(defmacro if-!
    [test then else]
    `(if (not ~test) ~then ~else))

(defmacro if-!
  [test then else]
  (list 'if test then else))

(macroexpand '(if-! (= 2 2) (println "not equal") (println "equal")))
(if-! (= 2 2) (println "not equal") (println "equal"))

(let [a 10]
  (macroexpand '(when (pos? a) (println "Positive"))))

(defmacro when'
  [test & statements]
  `(if ~test (do ~@statements)))

(let [a 10]
  (macroexpand '(when' (pos? a) (println "Positive"))))

(when' (pos? 10) (println "Positive"))

(loop [value (read)]
  (cond
    (= value ".exit") :bye-bye
    (list? value) (do (println (eval value)) (recur (read)))
    :else value))

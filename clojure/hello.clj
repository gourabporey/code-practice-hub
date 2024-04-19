(+ 2 4)

(defn fact [n] (if (zero? n) 1 (* n (fact (- n 1)))))

(print-str (fact 5))

((defn my-add
   ([] 0)
   ([x] x)
   ([x y] (+ x y))
   ([x y & more] (my-add (my-add x y) (apply my-add more)))) 5 6 12)

(my-add 12 34 56 45)

(def id (comp inc dec))
(id 2)

((partial apply + [1 2]) 2)
(apply (partial + 1) [1 2 3])
(((juxt inc dec))
 (comp (do (print "hello") inc) (partial * 2)) 5)

(defn fibonacci [num]
  (if (<= num 0)
    0
    (if (= num 1)
      1
      (apply + ((juxt (comp fibonacci dec) (comp fibonacci dec dec)) num)))))

(def square (comp (partial apply *) (juxt identity identity)))
(square 4)

(defn zero [x] 0)
(defn my-mod [num] (mod num 2))
(def isDivisibleByTwo (comp (partial apply = zero) (juxt zero my-mod)))
(isDivisibleByTwo 3)

(take 2 (repeat 5))

(def square (comp (partial apply *) (partial repeat 2)))

(range 2 5)
(Math/round (Math/sqrt 23))

(def sqrt (comp (partial #(Math/round %)) (partial #(Math/sqrt %))))
(def getAllDivisors (comp (partial range 2) inc sqrt))
(def divisible? (comp zero? rem))
(def prime? (comp
             not
             (partial apply some)
             (juxt (partial partial divisible?) getAllDivisors)))

;; Alternative way to check prime
((comp (partial apply map) (juxt (partial partial rem) getAllDivisors)) 5)

(map (partial rem 5) (getAllDivisors 5))


(defn multiply [x y] (* x y))
(map multiply '(1 2 3) (repeat 3 5))

(map (partial divisible? 5) (range 1 (inc 5)))
(def prime? (comp
             (partial >= 2)
             count
             (partial remove false?)
             (partial apply map)
             (juxt (partial partial divisible?) (comp (partial range 1) inc))))

(prime? 4)

;; given by Jayanth
((comp reverse (partial take 2)) (range 10))

((juxt #(str %) reverse) "hello world")

((partial apply *) (map inc (range 5)))
;; 120

((comp #(+ % 10) (partial / 2)) 20)

((juxt (comp dec inc) identity) 5)

((comp #(str "The answer is: " %) (partial apply +)) (range 1 6))

((partial juxt #(str %) first) ["apple" "banana" "cherry"])

((comp (partial take 3) reverse) (range 1 10))

((comp #(vector % %) (juxt even? odd?)) 7)

(def prime? (comp
             (partial every? pos?)
             (partial apply map rem)
             (juxt (partial repeat) (partial range 2))))


(take 20 (filter prime? (iterate inc 2)))

(def powers-of-two (iterate (partial * 2) 1))

(take 10 powers-of-two)

(defn my-partial
  ([f & additional]
   (fn [& more] (apply f (concat additional more)))))

((my-partial *) 2 3 5)
((my-partial every? odd?) [1 2 3])

(defn get-string [x] (case x
                       4 :gourab
                       5 :another
                       :something-else))

(defn process-data [data & options]
  (let [verbose? (some? (find (vector options) :verbose))]
    (if-not verbose?
      (concat "Verbose printing" " " data)
      :something-else)))

(process-data :something :verbose true)






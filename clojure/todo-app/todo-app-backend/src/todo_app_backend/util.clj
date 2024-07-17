(ns todo-app-backend.util
  (:gen-class)
  (:require [clojure.data.json :as json])
  (:import [org.bson.types ObjectId]))

(defn write-json [x]
  (json/write-str x
                  :value-fn (fn [key value]
                              (if (instance? ObjectId value)
                                (str value)
                                value))))

(defn response
  [body]
  {:status 200
   :headers {"Content-Type" "application/json"}
   :body (write-json body)})
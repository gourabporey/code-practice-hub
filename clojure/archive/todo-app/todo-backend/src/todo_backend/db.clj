(ns todo-backend.db
  (:require [monger.core :as mg]
  ;;           [monger.collection :as mc]
  ;;           [monger.json :refer [from-json to-json]]
            [ring.util.response :refer [response]]))
  

(def db (mg/get-db (mg/connect) "todoapp"))

;; (defn get-todos []
;;   (response (mc/find-maps db "todos")))

;; (defn create-todo [request]
;;   (let [todo (from-json (slurp (:body request)))]
;;     (mc/insert db "todos" todo)
;;     (response todo)))

;; (defn update-todo [id request]
;;   (let [todo (from-json (slurp (:body request)))]
;;     (mc/update db "todos" {:_id (mg/object-id id)} {"$set" todo})
;;     (response todo)))

;; (defn delete-todo [id]
;;   (mc/remove db "todos" {:_id (mg/object-id id)})
;;   (response {:message "Deleted"}))

(defonce todos [])

(defn get-todos 
  []
  (response todos))

(defn create-todo 
  [request]
  (let [todo (slurp (:body request))]
    (conj todos todo)
    (response todo)))

(defn update-todo 
  [id request] 
  (println (str id " Todo updated")))

(defn delete-todo 
  [id]
  (println id " todo deleted"))
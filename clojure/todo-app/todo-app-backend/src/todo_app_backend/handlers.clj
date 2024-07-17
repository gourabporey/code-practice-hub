(ns todo-app-backend.handlers
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [clojure.data.json :as json]
            [monger.core :as mg]
            [monger.collection :as mc]
            [todo-app-backend.util :refer [response]])
  (:import [org.bson.types ObjectId]))

(def conn (mg/connect))

(def db (mg/get-db conn "todos-clojure"))

(defn get-todos
  []
  (let [all-todos (mc/find-maps db "todos")]
    (println "All Todos -> " all-todos)
    (->> all-todos
         (map #(select-keys % [:desc :marked :_id]))
         (response))
    #_(response {:data (map #(select-keys % [:desc :marked :_id]) all-todos)})))

(defn add-todo
  [request]
  (let [new-todo (json/read-str (slurp (:body request)))]
    (println "New Todo Created ->>" new-todo)
    (response (mc/insert-and-return db "todos" {:desc (new-todo "desc") :marked (new-todo "marked")}))))

(defn update-todo
  [id request]
  (let [new-todo (json/read-str (slurp (:body request)))]
    (println (str "Updated Todo by ID ->" id " " new-todo))
    (response (mc/update-by-id db "todos" id {:desc (new-todo "desc") :marked (new-todo "marked")}))))

(defroutes app-routes
  (GET "/todos" [] (get-todos))
  (POST "/todos" request (add-todo request))
  (PUT "/todos/:id" request (update-todo (ObjectId. (:id (:params request))) request)))
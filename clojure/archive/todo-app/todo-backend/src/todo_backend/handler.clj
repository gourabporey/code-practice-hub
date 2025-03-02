(ns todo-backend.handler
  (:require [compojure.core :refer [defroutes GET POST PUT DELETE]]
            [compojure.route :as route]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [todo-backend.db :refer [get-todos create-todo update-todo delete-todo]]))

(defroutes app-routes
  (GET "/todos" [] (get-todos))
  (POST "/todos" request (create-todo request))
  (PUT "/todos/:id" request (fn [id] (update-todo id request)))
  (DELETE "/todos/:id" [id] (delete-todo id))
  (route/not-found "Not Found"))

(def app
  (-> (wrap-json-body app-routes)
      wrap-json-response))

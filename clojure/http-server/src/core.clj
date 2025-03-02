(ns core
  (:require [org.httpkit.server :refer [run-server]]
            [compojure.core :refer [defroutes GET]]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

(defn handler [request]
  (do (println request) {:status 200
   :headers {"Content-Type" "application/json"}
   :body {:message "Hello, World!"}}))

(defroutes app-routes
  (GET "/" [] handler)
  (GET "/todos/:id" [id] (println id) {:status 200 :body {:message "Todo created"}})
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))

(defn main []
  (run-server app {:port 10000}))

(main)
(ns todo-backend.core
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [todo-backend.handler :refer [app]]))

(defn -main []
  (run-jetty app {:port 6000}))

(ns todo-app-backend.core
  (:gen-class)
  (:require [org.httpkit.server :as server]
            [todo-app-backend.handlers :refer [app-routes]]
            [ring.middleware.cors :refer [wrap-cors]]))

(def app
  (-> app-routes
      (wrap-cors
       :access-control-allow-origin #".*"
       :access-control-allow-methods [:get :post :put :delete :options]
       :access-control-allow-headers ["Content-Type"]
       :access-control-max-age 86400
       :options? true)))

(defn -main
  [& args]
  (let [port (Integer/parseInt (or (System/getenv "PORT") "8080"))]
    (server/run-server app {:port port})
    (println (str "Running web server at http:/127.0.0.1:" port "/"))))

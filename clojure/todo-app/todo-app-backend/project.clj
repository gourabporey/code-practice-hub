(defproject todo-app-backend "0.1.0-SNAPSHOT"
  :description "A simple todo app with backend"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [http-kit "2.3.0"]
                 [compojure "1.6.1"]
                 [org.clojure/data.json "2.5.0"]
                 [com.novemberain/monger "3.5.0"]
                 [ring-cors "0.1.13"]]
  :main ^:skip-aot todo-app-backend.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all
                       :jvm-opts ["-Dclojure.compiler.direct-linking=true"]}})

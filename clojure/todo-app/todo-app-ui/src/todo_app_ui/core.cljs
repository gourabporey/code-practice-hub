(ns todo-app-ui.core
  (:require [goog.dom :as gdom]
            [reagent.dom :as rdom]
            [reagent.core :as r]
            [ajax.core :as ajax]
            [clojure.walk :refer [keywordize-keys]]))

(defonce todo-backend-url "http://localhost:8080")

(def todo-header-style {:font-size "40px"})

(defn todo-header []
  [:h1 {:style todo-header-style
        :class "todo-header"}
   "Todo List"])

(defn todo-delete-btn [todo-id]
  [:button {:class "todo-delete-btn"} "Delete"])

(defn todo-checkbox [todo-id desc marked?]
  [:input {:type "checkbox"
           :class "todo-checkbox"}])

(defn todo-description [id desc]
  [:div {:class "todo-desc"} desc])

(defn todo [id desc marked?]
  [:div {:class (str "todo" (if marked? " marked" ""))
         :id    (str "todo-" id)
         :key id}
   (todo-checkbox id desc marked?)
   (todo-description id desc)
   (todo-delete-btn id)])

#_(def todos [{:_id "01"
               :desc  "This is first todo"
               :marked true}
              {:_id "02"
               :desc  "This is my todo"
               :marked false}])

(defonce todos (r/atom (list)))

(defn handle-todos-response [response]
  (print "Response ->>" response)
  (let [new-todos (vec (map keywordize-keys response))]
    (print "Keywordized response ->> " new-todos)
    (reset! todos new-todos)))

(defn fetch-todos []
  (ajax/GET "http://localhost:8080/todos"
    {:handler handle-todos-response
     :header {:accept "application/json"}
     :response-format :json
     :error-handler #(js/console.error "Error fetching todos: " %)}))

(defn todo-list []
  [:div {:class "todos-container"}
   (for [{:keys [_id desc marked]} @todos]
     ^{:key _id} (todo _id desc marked))])

(def new-todo-value (r/atom ""))

(defn add-todo []
  (ajax/POST (str todo-backend-url "/todos")
    {:body (.stringify js/JSON (clj->js {:desc @new-todo-value
                                         :marked false}))
     :handler #((fetch-todos) (reset! new-todo-value))
     :error-handler #(print "Error while adding todo" %)}))

(defn todo-add-btn []
  [:div {:class "todo-add-btn-wrapper"}
   [:input {:type "text"
            :value @new-todo-value
            :on-change #(reset! new-todo-value (-> % .-target .-value))}]
   [:button {:class "todo-add-btn"
             :on-click add-todo}
    "Add Todo"]])

(defn todo-app []
  (fetch-todos)
  [:div {:class "todo-app"}
   [todo-header]
   [todo-add-btn]
   [todo-list]])

(rdom/render [todo-app] (gdom/getElement "root"))
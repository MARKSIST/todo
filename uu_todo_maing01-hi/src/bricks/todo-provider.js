//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

let todos = [
  {
    id: 1,
    name: "Todo 1",
    text: "This is my todo 1...",
    averageRating: 5.0
  },
  {
    id: 2,
    name: "Todo 2",
    text: "This is my todo 2...",
    averageRating: 4.0
  },
  {
    id: 3,
    name: "Todo 3",
    text: "This is my todo 3...",
    averageRating: 3.0
  },
  {
    id: 4,
    name: "Todo 4",
    text: "This is my todo 4...",
    averageRating: 2.0
  },
  {
    id: 5,
    name: "Todo 5",
    text: "This is my todo 5...",
    averageRating: 1.0
  }
];

const TodoProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TodoProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:private
    function handleDelete(todo) {
      todos = todos.filter(item => item.id !== todo.id);

      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: `
        Todo with name ${todo.name} was deleted from array todos.
        The change is not visible because you need to learn about state first ;-)`
        });
    }
    //@@viewOff:private

    //@@viewOn:render
    return children({ todos, handleDelete });
    //@@viewOff:render
  }
});

export default TodoProvider;
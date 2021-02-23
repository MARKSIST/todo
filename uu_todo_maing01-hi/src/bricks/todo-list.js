//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Todo from "./todo";
//@@viewOff:imports

const TodoList = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TodoList",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    todos: UU5.PropTypes.array.isRequired,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    todos: [],
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ todos, onDetail, onUpdate, onDelete }) {
    //@@viewOn:render
    if (todos.length === 0) {
      return <UU5.Common.Error content="No todos!" />;
    }

    return (
      <div>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            colorSchema="green"
            onDetail={onDetail}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    );
    //@@viewOff:render
  }
});

export default TodoList;
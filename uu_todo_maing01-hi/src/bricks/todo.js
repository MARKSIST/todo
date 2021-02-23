//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const Todo = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Todo",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    todo: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      text: UU5.PropTypes.string.isRequired,
      averageRating: UU5.PropTypes.number.isRequired
    }),
    colorSchema: UU5.PropTypes.string,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    todo: null,
    colorSchema: "blue",
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {}
  },
  //@@viewOff:defaultProps

  render({ todo, colorSchema, onDelete }) {
    //@@viewOn:private
    function handleDelete() {
        onDelete(todo);
      }
      //@@viewOff:private
  
      //@@viewOn:render
      function renderHeader() {
        return (
          <>
            {todo.name}
            <UU5.Bricks.Button onClick={handleDelete} colorSchema="red">
              <UU5.Bricks.Icon icon="mdi-delete" />
            </UU5.Bricks.Button>
          </>
        );
      }
  
      if (!todo) {
        return null;
      }
  
      return (
        <UU5.Bricks.Card header={renderHeader()} colorSchema={colorSchema}>
          <div>{todo.text}</div>
          <UU5.Bricks.Rating value={todo.averageRating} />
        </UU5.Bricks.Card>
      );
      //@@viewOff:render
    }
});

export default Todo;
//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

let jokes = [
  {
    id: 1,
    name: "Joke 1",
    text: "This is my joke 1...",
    averageRating: 5.0
  },
  {
    id: 2,
    name: "Joke 2",
    text: "This is my joke 2...",
    averageRating: 4.0
  },
  {
    id: 3,
    name: "Joke 3",
    text: "This is my joke 3...",
    averageRating: 3.0
  },
  {
    id: 4,
    name: "Joke 4",
    text: "This is my joke 4...",
    averageRating: 2.0
  },
  {
    id: 5,
    name: "Joke 5",
    text: "This is my joke 5...",
    averageRating: 1.0
  }
];

const JokeProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "JokeProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:private
    function handleDelete(joke) {
      jokes = jokes.filter(item => item.id !== joke.id);

      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: `
        Joke with name ${joke.name} was deleted from array jokes.
        The change is not visible because you need to learn about state first ;-)`
        });
    }
    //@@viewOff:private

    //@@viewOn:render
    return children({ jokes, handleDelete });
    //@@viewOff:render
  }
});

export default JokeProvider;
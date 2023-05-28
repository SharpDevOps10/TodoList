import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void,
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }

  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let data = event.currentTarget.value
    setNewTaskTitle(data);
  };
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.shiftKey && event.charCode === 13) {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  return <div>
    <input value={newTaskTitle}
           onChange={onChangeHandler}
           onKeyPress={onKeyPressHandler}
           className={error ? "error" : ""}
    />
    <button onClick={addTask}>+</button>
    {error && <div className="error-message">{error}</div>}
  </div>
}
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
  addTask: (title: string, todolistId: string) => void,
  id: string,
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id);
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
      props.addTask(newTaskTitle, props.id);
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
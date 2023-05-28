import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
  title: string,
};

export function EditableSpan(props: EditableSpanType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(" ");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
  };
  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  }


  return editMode
    ? <input value={props.title} onBlur={activateViewMode} onChange={onChangeTitleHandler}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>;
}
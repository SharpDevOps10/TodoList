import React, {useState} from "react";

type EditableSpanType = {
  title: string,
};

export function EditableSpan(props: EditableSpanType) {
  const [editMode, setEditMode] = useState(false);
  const activateEditMode = () => setEditMode(true);
  const activateViewMode = () => setEditMode(false);


  return editMode
    ? <input value={props.title} onBlur={activateViewMode}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>;
}
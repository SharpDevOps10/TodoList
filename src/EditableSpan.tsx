import React, {useState} from "react";

type EditableSpanType = {
  title: string,
};

export function EditableSpan(props: EditableSpanType) {
  let [editMode, setEditMode] = useState(true);
  return editMode
    ? <input value={props.title}/>
    : <span>{props.title}</span>;
}
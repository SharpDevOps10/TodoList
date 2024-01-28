import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@material-ui/core';

type EditableSpanType = {
  title: string,
  onChange: (newValue: string) => void,
};

export function EditableSpan (props: EditableSpanType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(' ');

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };


  return editMode
    ? <TextField value={title} onBlur={activateViewMode} onChange={onChangeTitleHandler}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>;
}

import React from "react";

type EditableSpanType = {
  title: string,
};

export function EditableSpan(props: EditableSpanType) {
  return <span>{props.title}</span>;
}
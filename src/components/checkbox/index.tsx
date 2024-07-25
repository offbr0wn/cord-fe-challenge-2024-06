import React from "react";
import styled from "styled-components";

interface CheckBoxProps {
  id: string;
  name: string;
  label: string;
}

export default function CheckBox({ id, name, label }: CheckBoxProps) {
  // Custom checkbox component

  return (
    <CheckboxCont>
      <CheckboxInput type="checkbox" id={id} name={name} />
      {label}
    </CheckboxCont>
  );
}

const CheckboxCont = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 5px 0;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

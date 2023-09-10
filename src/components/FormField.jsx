import React from "react";
import { Flex, Input, Label, Text, Textarea } from "theme-ui";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <Flex
      sx={{
        flex: "1",
        width: "100%",
        flexDirection: "column",
      }}
    >
      {labelName && (
        <Label
          sx={{
            fontFamily: "sans-serif",
            fontWeight: "medium",
            fontSize: "14px",
            lineHeight: "22px",
            color: "#808191",
            mb: "10px",
          }}
        >
          {labelName}
        </Label>
      )}
      {isTextArea ? (
        <Textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          sx={{
            py: "15px",
            px: "15px",
            outline: "none",
            border: "solid 1px",
            borderColor: "#3a3a43",
            bg: "transparent",
            fontFamily: "sans-serif",
            color: "white",
            fontSize: "14px",
            "::placeholder": { color: "#4b5264" },
            borderRadius: "10px",
          }}
        />
      ) : (
        <Input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          sx={{
            padding: "15px",
            outline: "none",
            border: "solid 1px",
            borderColor: "#3a3a43",
            bg: "transparent",
            fontFamily: "sans-serif",
            color: "white",
            fontSize: "14px",
            "::placeholder": { color: "#4b5264" },
            borderRadius: "10px",
          }}
        />
      )}
    </Flex>
  );
};

export default FormField;

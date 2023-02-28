import {
  FieldTitle,
  InputHelperText,
  ResettableTextField,
  TextInputProps,
  useInput,
} from "react-admin";
import { useWatch } from "react-hook-form";
import slugify from "slugify";

interface Props extends TextInputProps {
  sourceToWatch: string;
}

export const WatchedSlugInput = ({ sourceToWatch, ...props }: Props) => {
  const updatedSource = useWatch({ name: sourceToWatch });
  const {
    className,
    defaultValue,
    label,
    format,
    helperText,
    onBlur,
    onChange,
    parse,
    resource,
    source,
    validate,
    ...rest
  } = props;
  const {
    field,
    fieldState: { error, invalid, isTouched },
    formState: { isSubmitted },
    id,
    isRequired,
  } = useInput({
    defaultValue,
    format,
    parse,
    resource,
    source,
    type: "text",
    validate,
    onBlur,
    onChange,
    ...rest,
  });

  return (
    <ResettableTextField
      id={id}
      {...field}
      value={slugify(updatedSource || "", {
        lower: true,
      })}
      className={`ra-input ra-input-${source} ${className}`}
      label={
        label !== "" && label !== false ? (
          <FieldTitle
            label={label}
            source={source}
            resource={resource}
            isRequired={isRequired}
          />
        ) : null
      }
      error={(isTouched || isSubmitted) && invalid}
      helperText={
        <InputHelperText
          touched={isTouched || isSubmitted}
          error={error?.message}
          helperText={helperText}
        />
      }
      {...rest}
    />
  );
};

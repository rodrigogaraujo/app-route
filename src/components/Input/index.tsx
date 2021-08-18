import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity, TextInputProps} from 'react-native';

import {
  Container,
  TextInput,
  Content,
  Icon,
  ErrorText,
  IconPassword,
} from './styles';

interface Props extends TextInputProps {
  icon?: string;
  password: boolean;
  error?: string;
  borderBottom?: number;
}

const Input = ({
  icon,
  password = false,
  error,
  borderBottom,
  textAlign,
  ...rest
}: Props) => {
  const [passwordView, setPasswordView] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    setPasswordView(password);
  }, [password]);

  return (
    <Container password={password} isFocused={isFocused} error={!!error}>
      <Content>
        {icon && <Icon isFocused={isFocused} name={icon} size={20} />}
        <TextInput
          {...rest}
          textAlign={textAlign}
          secureTextEntry={passwordView}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {password && (
          <TouchableOpacity onPress={() => setPasswordView(!passwordView)}>
            <IconPassword passwordView={passwordView} name="eye" size={20} />
          </TouchableOpacity>
        )}
      </Content>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default Input;

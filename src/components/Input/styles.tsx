import styled, {css} from 'styled-components/native';
import {SimpleLineIcons} from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';

interface ContainerProps {
  password: boolean;
  isFocused: boolean;
  error: boolean;
}

interface IconProps {
  isFocused: boolean;
}

interface IconPassProps {
  passwordView: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  align-items: center;

  border-bottom-width: 2px;

  border-bottom-color: ${({theme}) => theme.colors.text};
  ${props =>
    props.password &&
    css`
      padding-right: 5px;
    `};
  ${props =>
    props.isFocused &&
    css`
      border-bottom-color: ${({theme}) => theme.colors.primary};
    `};
  ${props =>
    props.error &&
    css`
      border-bottom-color: ${({theme}) => theme.colors.attention};
    `};
  height: ${RFValue(55)}px;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 0 ${RFValue(16)}px;
  align-items: center;
  margin-bottom: ${RFValue(8)}px;
  height: ${RFValue(55)}px;
`;

export const TextInput = styled.TextInput`
  width: 82%;
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.primary};
`;

export const Icon = styled(SimpleLineIcons)<IconProps>`
  margin-right: ${RFValue(16)}px;
  color: ${({theme, isFocused}) =>
    isFocused ? theme.colors.primary : theme.colors.text};
`;

export const IconPassword = styled(SimpleLineIcons)<IconPassProps>`
  margin-right: ${RFValue(32)}px;
  color: ${({theme, passwordView}) =>
    passwordView ? theme.colors.primary : theme.colors.secondary};
`;

export const ErrorText = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.attention};
`;

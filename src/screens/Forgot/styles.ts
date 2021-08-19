import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {SimpleLineIcons} from '@expo/vector-icons';

const logo = require("../../assets/logo.png")

export const Container = styled.View`
  flex: 1;
  margin-top: ${getStatusBarHeight() + RFValue(24)}px;
  padding: 0 ${RFValue(24)}px;
  margin-bottom: ${getStatusBarHeight() + RFValue(8)}px;
`;  

export const ContainerIndicator  = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;  

export const ActivityIndicator = styled.ActivityIndicator`
  align-self: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Logo = styled.Image.attrs({
  source: logo
})`
  width: ${RFValue(300)}px;
  height: ${RFValue(150)}px;
  align-self: center;
  margin-top: ${RFValue(70 -24)}px;
`
export const Content = styled.View`
  width: 100%;
  margin-top: ${RFValue(80)}px;
`;  

export const ForgotText  = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(11)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
` 

export const ButtonItem = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${RFValue(14)}px;
  border-radius: ${RFValue(8)}px;
  justify-content: center;
  margin-top: auto;
`

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
` 

export const Icon = styled(SimpleLineIcons)`
  margin-right: ${RFValue(32)}px;
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
`;

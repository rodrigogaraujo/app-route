import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const logo = require("../../assets/logo.png")

export const Container = styled.View`
  flex: 1;
`;  

export const Header = styled.View` 
  width: 100%;
  height: ${RFPercentage(20)}px;
  justify-content: flex-start;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.text};
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const User = styled.View`
  margin-left: ${RFValue(17)}px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const IconFeather = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const ContentContainer = styled.View`
  width: 100%;
  height: ${RFPercentage(40)}px;
  justify-content: flex-start;
  align-items: center;
  justify-content: flex-end;
`

export const ButtonItem = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${RFValue(14)}px;
  border-radius: ${RFValue(8)}px;
`

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
` 

export const TextTestLat = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFValue(18)}px;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.medium};
` 

export const Logo = styled.Image.attrs({
  source: logo
})`
  width: ${RFValue(200)}px;
  height: ${RFValue(100)}px;
`
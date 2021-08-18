import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const logo = require("../../assets/logo.png")

export const Container = styled.View`
  flex: 1;
  margin-top: ${getStatusBarHeight() + RFValue(70)}px;
  padding: 0 ${RFValue(24)}px;
`;  

export const Logo = styled.Image.attrs({
  source: logo
})`
  width: ${RFValue(300)}px;
  height: ${RFValue(150)}px;
  align-self: center;
`
export const Content = styled.View`
  width: 100%;
  margin-top: ${RFValue(80)}px;
`;  

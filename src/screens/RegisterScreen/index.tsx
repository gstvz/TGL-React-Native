import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthHeader, RegisterForm } from "@components";
import * as S from './styles';

type RootStackParamList = {
  Register: undefined;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: Props) => {
  
  const handleBackNavigate = () => {
    navigation.goBack();
  };

  return (
    <S.Container>
      <S.Content>
        <AuthHeader screen="Registration" />
        <RegisterForm onBackPress={handleBackNavigate} />
      </S.Content>
    </S.Container>
  );
}

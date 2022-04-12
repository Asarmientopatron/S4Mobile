import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { optionStyles } from '../theme/OptionTheme';
import { ThemeContext } from '../contexts/themeContext/ThemeContext';
import { TitleOption } from '../components/Options/TitleOption';
import { DrawerScreenProps } from '@react-navigation/drawer';

interface Props extends DrawerScreenProps<any, any>{};

export const UnauthorizedScreen = ({route}: Props) => {
  const {theme: {palette}} = useContext(ThemeContext);
  // const [totalRows, setTotalRows] = useState(10);

  return (
    <ScrollView
      style={optionStyles.globalMargin}
    >
      <View style={{...optionStyles.mainContainer, backgroundColor: palette.background.default}}>
        <TitleOption center title='NO TIENE AUTORIZACIÓN PARA NINGUNA OPCIÓN EN ESTA APLICACIÓN'/>
      </View>
    </ScrollView>
  );  
};
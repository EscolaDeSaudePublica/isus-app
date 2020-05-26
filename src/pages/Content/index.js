import * as React from 'react';
import {
  View, FlatList, Image, Dimensions, TouchableOpacity
} from 'react-native';
import { Caption } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getProjetosPorCategoria } from '../../apis/apiHome';

export default function InformationScreen(props) {
  const navigation = useNavigation();
  const { route } = props;
  const { params } = route;
  const [data, setData] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getProjetosPorCategoria(params.term_id).then((response) => {
        setData(response.data.data);
      });
    }, [props])
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      numColumns={2}
      keyExtractor={item => item.id}
      style={{ flex: 1, alignSelf: 'center' }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            height: 200,
            width: Dimensions.get('window').width / 2.2,
            alignItems: 'center',
            margin: 5
          }}
          onPress={() => navigation.navigate('Descrição', { object: item, title: params.title_description })}
        >
          <Image
            style={{ height: 110, width: Dimensions.get('window').width / 2.2 }}
            source={{ uri: `${item.image}` }}
            // resizeMode="contain"
          />
          <View style={{ marginHorizontal: 15 }}>
            <Caption numberOfLines={3}>{item.post_title}</Caption>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

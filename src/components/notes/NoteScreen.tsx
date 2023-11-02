import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function NoteScreen() {
  return (
    <View style={{flex: 1, backgroundColor: '#f2f6f9'}}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>Notes</Text>
        <TouchableOpacity>
          <Text style={{color: '#2c93f6'}}>Filters</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 15}}>
        <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
          You don't have any notes yet
        </Text>
        <Text style={{textAlign: 'center', marginTop: 7}}>
          Add notes when you conduct field scouting or When you want to mark an
          important place on the map
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              color: '#2c93f6',
              fontWeight: 'bold',
              marginTop: 7,
              textAlign: 'center',
            }}>
            Add your first note
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Close from 'react-native-vector-icons/AntDesign';

type IProps = {
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  components: any;
};
export default function BottomModal(props: IProps) {
  return (
    <View style={props.isModalOpen && styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalOpen}
        onRequestClose={() => {
          props.setModalOpen(!props.isModalOpen);
        }}>
        <TouchableWithoutFeedback onPress={() => props.setModalOpen(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => props.setModalOpen(!props.isModalOpen)}>
                  <View style={{borderWidth: 3, width: 40, borderRadius: 10}} />
                  {/* <Close name="closecircleo" size={25} color="gray" /> */}
                </TouchableOpacity>
              </View>
              {/* <View style={styles.rowOne}>
                <TouchableOpacity
                  onPress={() => props.setModalOpen(!props.isModalOpen)}>
                  <Close name="closecircleo" size={25} color="gray" />
                </TouchableOpacity>
              </View> */}
              {props.components}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // modal
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
    height: '30%',
    width: '100%',
    // bottom: 50,
  },

  rowOne: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    paddingTop: 10,
  },
  container: {
    flex: 1,
  },
});

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F8",
  },

  footer: {
    flex: 1,
    backgroundColor: "#F5F5F8",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  button: {
    alignItems: "center",
    marginTop: 50,
  },

  signIn: {
    width: 200,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },

  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },

  // upload screen
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
},
itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
},
itemRight: {
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap'
},
square: {
    width: 26,
    height: 26,
    // backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
},
itemDoc: {
  flexDirection: "column", 
  maxWidth: '80%',
  // position: '',
  // width: 204,
  // height: 12,
  // left: 83,
  // marginBottom:25,
},
progress: {
  marginTop: 10,
  color: '#B6E4FC'
},
itemText: {
    maxWidth: '100%',
    fontWeight: '600',
    // fontStyle: 'bold'
    // marginTop: 25,
},
circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5

},
});

export default styles;

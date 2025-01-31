import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 240,
    width: 240,
    marginTop: 25,
  },
  text_footer: {
    color: '#000000',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginTop: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    color: '#000000',
  },
  loginContainer: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 45,
  },
  header: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: -20,
    alignItems: 'center',
    textAlign: 'center',
    margin: 20,
  },
  inBut: {
    width: '60%',
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  inBut2: {
    backgroundColor: '#000000',
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10,
  },
  inBut3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    width: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallIcon2: {
    fontSize: 40,
  },
  bottomText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  bottomText1: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});
export default styles;

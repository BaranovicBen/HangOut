import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    position:'relative'
  },
  navBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sideIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  linkRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    alignItems: 'center',
    marginBottom: 16,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconLeft: {
    padding: 4,
  },
  iconRight: {
    padding: 4,
  },
  sessionLink: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  filterBox: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 6,
    width: 120,
    textAlign: 'center',
  },
  filterValue: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  partyBubble: {
    alignSelf: 'center',
    minHeight: 60,
    minWidth: 120,
    borderRadius: 40,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  bubbleText: {
    fontSize: 26,
    textAlign: 'center',
  },
  friendsBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    paddingBottom: 20,
    flex: 1,
  },
  friendsList: {
    marginTop: 6,
  },
  friendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  friendText: {
    fontSize: 16,
  },
  addRemove: {
    fontSize: 20,
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 60, 
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 150,
    backgroundColor: '#43fb00ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});

export default styles;
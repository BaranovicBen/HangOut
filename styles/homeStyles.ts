import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  navBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 8,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sideIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoBox: {
    maxWidth: '85%',
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
  calendarWrapper: {
    backgroundColor: '#000',
    borderRadius: 24,
    padding: 14,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  arrow: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 30,
  },
  monthLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'white',
    marginVertical: 8,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  weekday: {
    color: '#888',
    fontSize: 14,
    width: 32,
    textAlign: 'center',
  },
  dayCell: {
    width: 32,
    height: 32,
    borderRadius: 16,
   marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 14,
  },
  freeDay: {
    backgroundColor: '#00FF00',
  },
  freeDayText: {
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 50,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    minWidth: '70%',
    alignItems: 'center',
  },
  buttonInactive: {
    backgroundColor: '#000',
  },
  buttonActive: {
    backgroundColor: '#00FF00',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
})

export default styles
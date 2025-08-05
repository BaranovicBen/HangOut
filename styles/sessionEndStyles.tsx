import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
  },
  navBar: {
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
  },
  partyBubble: {
    backgroundColor: '#eee',
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  bubbleText: {
    fontSize: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 26,
    marginBottom: 20,
  },
  monthBlock: {
    width: '90%',
    marginBottom: 24,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: '#000',
    marginBottom: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  dayName: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  dayNumber: {
    fontSize: 14,
    color: '#000',
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightedCircle: {
    backgroundColor: '#3f3',
  },
  highlightedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  endButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginTop: 24,
  },
  endButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight:'bold'
  },
});

export default styles;
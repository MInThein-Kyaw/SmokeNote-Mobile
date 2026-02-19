import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CalendarDayProps {
  day: number;
  count: number;
  isToday?: boolean;
  isFuture?: boolean;
  isEmpty?: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  count,
  isToday = false,
  isFuture = false,
  isEmpty = false,
}) => {
  if (isEmpty) {
    return <View style={styles.calendarDay} />;
  }

  return (
    <View 
      style={[
        styles.calendarDay,
        isToday && styles.calendarDayToday,
        isFuture && styles.calendarDayFuture
      ]}
    >
      <Text style={[
        styles.calendarDayNumber,
        isToday && styles.calendarDayNumberToday,
        isFuture && styles.calendarDayNumberFuture
      ]}>
        {day}
      </Text>
      {count > 0 && !isFuture && (
        <View style={styles.calendarDayCount}>
          <Text style={styles.calendarDayCountText}>{count}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  calendarDay: {
    width: '14.2%',
    aspectRatio: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  calendarDayToday: {
    backgroundColor: '#27272a',
    borderRadius: 8,
  },
  calendarDayFuture: {
    opacity: 0.3,
  },
  calendarDayNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f4f4f5',
    marginBottom: 2,
  },
  calendarDayNumberToday: {
    color: '#10b981',
  },
  calendarDayNumberFuture: {
    color: '#3f3f46',
  },
  calendarDayCount: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 18,
    alignItems: 'center',
  },
  calendarDayCountText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#09090b',
  },
});

export default CalendarDay;

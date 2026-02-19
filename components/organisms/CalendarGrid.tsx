import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarDay from '../molecules/CalendarDay';

interface DailyCounts {
  [key: number]: number;
}

interface CalendarGridProps {
  daysInMonth: number;
  currentDay: number;
  firstDayOfMonth: number;
  dailyCounts: DailyCounts;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  daysInMonth,
  currentDay,
  firstDayOfMonth,
  dailyCounts,
}) => {
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<CalendarDay key={`empty-${i}`} day={0} count={0} isEmpty />);
  }

  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const count = dailyCounts[day] || 0;
    const isToday = day === currentDay;
    const isFuture = day > currentDay;

    days.push(
      <CalendarDay
        key={`day-${day}`}
        day={day}
        count={count}
        isToday={isToday}
        isFuture={isFuture}
      />
    );
  }

  return (
    <View style={styles.calendar}>
      <View style={styles.calendarDayLabels}>
        {dayLabels.map((label, index) => (
          <View key={`label-${index}`} style={styles.calendarDayLabel}>
            <Text style={styles.calendarDayLabelText}>{label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.calendarGrid}>
        {days}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendar: {
    width: '100%',
  },
  calendarDayLabels: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  calendarDayLabel: {
    width: '14.2%',
    alignItems: 'center',
  },
  calendarDayLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#a1a1aa',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default CalendarGrid;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SmokeLog } from '../types';

interface MonthlySummaryProps {
  logs: SmokeLog[];
}

const { width } = Dimensions.get('window');

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ logs }) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const [compareMonth, setCompareMonth] = useState(currentMonth === 0 ? 11 : currentMonth - 1);
  const [compareYear, setCompareYear] = useState(currentMonth === 0 ? currentYear - 1 : currentYear);
  
  // Get logs for current month
  const logsThisMonth = logs.filter(log => {
    const date = new Date(log.timestamp);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  // Get logs for comparison month
  const logsCompareMonth = logs.filter(log => {
    const date = new Date(log.timestamp);
    return date.getMonth() === compareMonth && date.getFullYear() === compareYear;
  });

  // Calculate daily counts for calendar
  const dailyCounts: { [key: number]: number } = {};
  logsThisMonth.forEach(log => {
    const date = new Date(log.timestamp);
    const day = date.getDate();
    dailyCounts[day] = (dailyCounts[day] || 0) + 1;
  });

  // Calculate daily average for this month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentDay = now.getDate();
  const avgPerDay = logsThisMonth.length > 0 ? (logsThisMonth.length / currentDay).toFixed(1) : '0.0';
  
  // Get first day of month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Calculate weekly breakdown
  const getWeekNumber = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const daysSinceStart = Math.floor((date.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24));
    return Math.floor(daysSinceStart / 7);
  };

  const weeklyData: { [key: number]: number } = {};
  logsThisMonth.forEach(log => {
    const week = getWeekNumber(new Date(log.timestamp));
    weeklyData[week] = (weeklyData[week] || 0) + 1;
  });

  const monthName = now.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const compareMonthName = new Date(compareYear, compareMonth).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  
  // Generate list of available months for comparison
  const availableMonths: { month: number; year: number; name: string }[] = [];
  const oldestLog = logs.length > 0 ? Math.min(...logs.map(l => l.timestamp)) : Date.now();
  const oldestDate = new Date(oldestLog);
  
  let tempDate = new Date(currentYear, currentMonth - 1, 1);
  const endDate = new Date(oldestDate.getFullYear(), oldestDate.getMonth(), 1);
  
  while (tempDate >= endDate) {
    availableMonths.push({
      month: tempDate.getMonth(),
      year: tempDate.getFullYear(),
      name: tempDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
    });
    tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth() - 1, 1);
  }
  
  const changeCompareMonth = (direction: 'prev' | 'next') => {
    const currentIndex = availableMonths.findIndex(m => m.month === compareMonth && m.year === compareYear);
    if (direction === 'prev' && currentIndex < availableMonths.length - 1) {
      const newMonth = availableMonths[currentIndex + 1];
      setCompareMonth(newMonth.month);
      setCompareYear(newMonth.year);
    } else if (direction === 'next' && currentIndex > 0) {
      const newMonth = availableMonths[currentIndex - 1];
      setCompareMonth(newMonth.month);
      setCompareYear(newMonth.year);
    }
  };
  
  // Render calendar
  const renderCalendar = () => {
    const days = [];
    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    // Add day labels
    const labels = dayLabels.map((label, index) => (
      <View key={`label-${index}`} style={styles.calendarDayLabel}>
        <Text style={styles.calendarDayLabelText}>{label}</Text>
      </View>
    ));
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const count = dailyCounts[day] || 0;
      const isToday = day === currentDay;
      const isFuture = day > currentDay;
      
      days.push(
        <View 
          key={`day-${day}`} 
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
    }
    
    return (
      <View style={styles.calendar}>
        <View style={styles.calendarHeader}>{labels}</View>
        <View style={styles.calendarGrid}>{days}</View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Summary</Text>
        <Text style={styles.subtitle}>{monthName}</Text>
      </View>

      {/* Calendar View */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CALENDAR</Text>
        <View style={styles.card}>
          {renderCalendar()}
        </View>
      </View>

      {/* Current Month Stats */}
      <View style={styles.section}>
        <View style={styles.mainCard}>
          <View style={styles.cardHeader}>
            <FontAwesome6 name="calendar-days" size={20} color="#10b981" />
            <Text style={styles.cardTitle}>This Month</Text>
          </View>
          <Text style={styles.bigNumber}>{logsThisMonth.length}</Text>
          <Text style={styles.bigNumberLabel}>CIGARETTES</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{avgPerDay}</Text>
              <Text style={styles.statLabel}>PER DAY</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentDay}</Text>
              <Text style={styles.statLabel}>DAYS PASSED</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{daysInMonth}</Text>
              <Text style={styles.statLabel}>TOTAL DAYS</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Comparison with Selected Month */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COMPARISON</Text>
        <View style={styles.comparisonCard}>
          <TouchableOpacity 
            onPress={() => changeCompareMonth('prev')}
            style={styles.monthArrow}
            disabled={availableMonths.findIndex(m => m.month === compareMonth && m.year === compareYear) === availableMonths.length - 1}
          >
            <FontAwesome6 name="chevron-left" size={16} color="#a1a1aa" />
          </TouchableOpacity>
          
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonMonth}>{compareMonthName}</Text>
            <Text style={styles.comparisonValue}>{logsCompareMonth.length}</Text>
          </View>
          
          <View style={styles.comparisonArrow}>
            {logsThisMonth.length < logsCompareMonth.length ? (
              <FontAwesome6 name="arrow-down" size={20} color="#10b981" />
            ) : logsThisMonth.length > logsCompareMonth.length ? (
              <FontAwesome6 name="arrow-up" size={20} color="#ef4444" />
            ) : (
              <FontAwesome6 name="minus" size={20} color="#a1a1aa" />
            )}
          </View>
          
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonMonth}>This Month</Text>
            <Text style={styles.comparisonValue}>{logsThisMonth.length}</Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => changeCompareMonth('next')}
            style={styles.monthArrow}
            disabled={availableMonths.findIndex(m => m.month === compareMonth && m.year === compareYear) === 0}
          >
            <FontAwesome6 name="chevron-right" size={16} color="#a1a1aa" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Weekly Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WEEKLY BREAKDOWN</Text>
        {Object.keys(weeklyData).length > 0 ? (
          Object.entries(weeklyData).map(([week, count]) => (
            <View key={week} style={styles.weekCard}>
              <View style={styles.weekInfo}>
                <FontAwesome6 name="calendar-week" size={14} color="#a1a1aa" />
                <Text style={styles.weekLabel}>Week {parseInt(week) + 1}</Text>
              </View>
              <View style={styles.weekBar}>
                <View 
                  style={[
                    styles.weekBarFill, 
                    { width: `${Math.min((count / Math.max(...Object.values(weeklyData))) * 100, 100)}%` }
                  ]} 
                />
                <Text style={styles.weekCount}>{count}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome6 name="chart-simple" size={32} color="#3f3f46" />
            <Text style={styles.emptyText}>No data this month yet</Text>
          </View>
        )}
      </View>

      {/* Total Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ALL TIME</Text>
        <View style={styles.totalCard}>
          <Text style={styles.totalNumber}>{logs.length}</Text>
          <Text style={styles.totalLabel}>TOTAL CIGARETTES LOGGED</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16, // Standardized padding
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
  subtitle: {
    fontSize: 14,
    color: '#a1a1aa', // Improved contrast
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#a1a1aa', // Improved contrast
    letterSpacing: 1.5,
    marginBottom: 12,
    paddingLeft: 4,
  },
  mainCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16, // Standardized padding
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
  bigNumber: {
    fontSize: 64,
    fontWeight: '900',
    color: '#10b981',
  },
  bigNumberLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#a1a1aa', // Improved contrast
    letterSpacing: 2,
    marginTop: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#27272a',
    marginVertical: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'center',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#a1a1aa', // Improved contrast
    letterSpacing: 1,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
  },
  calendar: {
    width: '100%',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  calendarDayLabel: {
    width: '14.2%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  calendarDayLabelText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#a1a1aa', // Improved contrast
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  calendarDayCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#09090b',
  },
  monthArrow: {
    padding: 8,
  },
  comparisonCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  comparisonItem: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonMonth: {
    fontSize: 12,
    color: '#a1a1aa', // Improved contrast
    marginBottom: 8,
  },
  comparisonValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
  comparisonArrow: {
    marginHorizontal: 16,
  },
  weekCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  weekInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  weekLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f4f4f5',
  },
  weekBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    backgroundColor: '#27272a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  weekBarFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 8,
  },
  weekCount: {
    position: 'absolute',
    right: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f4f4f5',
  },
  emptyState: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#a1a1aa', // Improved contrast
    marginTop: 12,
  },
  totalCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  totalNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#10b981',
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#a1a1aa', // Improved contrast
    letterSpacing: 1.5,
    marginTop: 8,
  },
});

export default MonthlySummary;

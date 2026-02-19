import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { SmokeLog } from '../../types';
import ScreenHeader from '../molecules/ScreenHeader';
import SectionHeader from '../atoms/SectionHeader';
import StatCard from '../atoms/StatCard';
import CalendarGrid from '../organisms/CalendarGrid';
import WeeklyChart from '../organisms/WeeklyChart';

interface MonthlySummaryProps {
  logs: SmokeLog[];
}

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

  return (
    <ScrollView style={styles.container}>
      <ScreenHeader
        title="Monthly Summary"
        subtitle={monthName}
      />

      {/* Calendar View */}
      <View style={styles.section}>
        <SectionHeader title="CALENDAR" />
        <View style={styles.card}>
          <CalendarGrid
            daysInMonth={daysInMonth}
            currentDay={currentDay}
            firstDayOfMonth={firstDayOfMonth}
            dailyCounts={dailyCounts}
          />
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
            <StatCard value={avgPerDay} label="PER DAY" />
            <StatCard value={String(currentDay)} label="DAYS PASSED" />
            <StatCard value={String(daysInMonth)} label="TOTAL DAYS" />
          </View>
        </View>
      </View>

      {/* Comparison with Selected Month */}
      <View style={styles.section}>
        <SectionHeader title="COMPARISON" />
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
        <SectionHeader title="WEEKLY BREAKDOWN" />
        <WeeklyChart weeklyData={weeklyData} />
      </View>

      {/* Total Stats */}
      <View style={styles.section}>
        <SectionHeader title="ALL TIME" />
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  mainCard: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 16,
    padding: 16,
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
    color: '#a1a1aa',
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
    color: '#a1a1aa',
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
    color: '#a1a1aa',
    letterSpacing: 1.5,
    marginTop: 8,
  },
});

export default MonthlySummary;

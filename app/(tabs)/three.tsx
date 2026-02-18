import { StyleSheet, FlatList, Pressable, View as RNView, ScrollView } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';

const EVIDENCE = [
  { id: 'E-001', type: 'LAB', icon: '🧪', label: 'Toxicology Report', caseId: 'C-0041', caseTitle: 'The Blackwood Poisoning', date: 'Nov 12, 2024', notes: 'Confirms cyanide. Ingested approx. 10–11 PM.' },
  { id: 'E-002', type: 'VISUAL', icon: '📸', label: 'Crime Scene Photos (x14)', caseId: 'C-0041', caseTitle: 'The Blackwood Poisoning', date: 'Nov 12, 2024', notes: 'Study, hallway, and wine cellar covered.' },
  { id: 'E-003', type: 'DOCUMENT', icon: '📄', label: 'Last Will & Testament', caseId: 'C-0041', caseTitle: 'The Blackwood Poisoning', date: 'Nov 13, 2024', notes: 'Victor Ashmore listed as executor.' },
  { id: 'E-004', type: 'PHYSICAL', icon: '🔑', label: 'Locked Study Key', caseId: 'C-0041', caseTitle: 'The Blackwood Poisoning', date: 'Nov 12, 2024', notes: 'Found in victim\'s coat pocket.' },
  { id: 'E-005', type: 'DIGITAL', icon: '📞', label: 'Phone Records — Nov 11', caseId: 'C-0041', caseTitle: 'The Blackwood Poisoning', date: 'Nov 13, 2024', notes: '3 calls to unregistered number between 9–10 PM.' },
  { id: 'E-006', type: 'PHYSICAL', icon: '🍷', label: 'Wine Glass (partial print)', caseId: 'C-0041', caseTitle: 'The Blackwood Poisoning', date: 'Nov 12, 2024', notes: 'Partial match to S-002. Lab pending.' },
  { id: 'E-007', type: 'DOCUMENT', icon: '✉️', label: 'Anonymous Letter', caseId: 'C-0041', caseTitle: 'The Blackwood Poisoning', date: 'Nov 13, 2024', notes: 'Typed. Matched to guest room typewriter.' },
  { id: 'E-008', type: 'DIGITAL', icon: '💾', label: 'CCTV Footage — Lobby', caseId: 'C-0038', caseTitle: 'Missing Diplomat', date: 'Oct 29, 2024', notes: 'Subject seen leaving at 11:17 PM. Alone.' },
  { id: 'E-009', type: 'DOCUMENT', icon: '🗂️', label: 'Embassy Visitor Log', caseId: 'C-0038', caseTitle: 'Missing Diplomat', date: 'Oct 30, 2024', notes: 'Two unregistered visitors on Oct 28.' },
  { id: 'E-010', type: 'PHYSICAL', icon: '🧤', label: 'Leather Glove (left hand)', caseId: 'C-0031', caseTitle: 'The Harbor Arsonist', date: 'Sep 4, 2024', notes: 'Found near Dock 7. No prints. Accelerant residue.' },
  { id: 'E-011', type: 'LAB', icon: '🔬', label: 'Accelerant Analysis', caseId: 'C-0031', caseTitle: 'The Harbor Arsonist', date: 'Sep 6, 2024', notes: 'Petroleum-based. Commercially available.' },
  { id: 'E-012', type: 'VISUAL', icon: '🎥', label: 'Warehouse Fire Footage', caseId: 'C-0031', caseTitle: 'The Harbor Arsonist', date: 'Sep 4, 2024', notes: 'Low res. Figure visible approx. 2:14 AM.' },
];

const ALL_TYPES = ['ALL', 'LAB', 'VISUAL', 'DOCUMENT', 'PHYSICAL', 'DIGITAL'];
const ALL_CASES = ['ALL', 'C-0041', 'C-0038', 'C-0031'];

const TYPE_COLORS: Record<string, string> = {
  LAB: '#9B59B6',
  VISUAL: '#3498DB',
  DOCUMENT: '#F1C40F',
  PHYSICAL: '#E67E22',
  DIGITAL: '#1ABC9C',
};

export default function EvidenceScreen() {
  const [activeType, setActiveType] = useState('ALL');
  const [activeCase, setActiveCase] = useState('ALL');

  const filtered = EVIDENCE.filter((e) => {
    const typeMatch = activeType === 'ALL' || e.type === activeType;
    const caseMatch = activeCase === 'ALL' || e.caseId === activeCase;
    return typeMatch && caseMatch;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <RNView style={styles.header}>
        <Text style={styles.headerLabel}>EVIDENCE LOCKER</Text>
        <Text style={styles.headerCount}>{filtered.length} ITEMS</Text>
      </RNView>

      {/* Filters */}
      <RNView style={styles.filterSection}>
        <Text style={styles.filterLabel}>TYPE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {ALL_TYPES.map((type) => (
            <Pressable
              key={type}
              onPress={() => setActiveType(type)}
              style={[
                styles.filterChip,
                activeType === type && {
                  backgroundColor: type === 'ALL' ? '#333' : TYPE_COLORS[type] + '33',
                  borderColor: type === 'ALL' ? '#666' : TYPE_COLORS[type],
                },
              ]}
            >
              <Text style={[
                styles.filterChipText,
                activeType === type && {
                  color: type === 'ALL' ? '#FFF' : TYPE_COLORS[type],
                },
              ]}>
                {type}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </RNView>

      <RNView style={styles.filterSection}>
        <Text style={styles.filterLabel}>CASE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {ALL_CASES.map((c) => (
            <Pressable
              key={c}
              onPress={() => setActiveCase(c)}
              style={[
                styles.filterChip,
                activeCase === c && styles.filterChipActiveCase,
              ]}
            >
              <Text style={[
                styles.filterChipText,
                activeCase === c && styles.filterChipTextActiveCase,
              ]}>
                {c}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </RNView>

      <RNView style={styles.divider} />

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <RNView style={styles.separator} />}
        ListEmptyComponent={() => (
          <RNView style={styles.empty}>
            <Text style={styles.emptyText}>NO EVIDENCE MATCHES FILTERS</Text>
          </RNView>
        )}
        renderItem={({ item }) => (
          <RNView style={styles.card}>
            <RNView style={styles.cardLeft}>
              <RNView style={[styles.iconBox, { borderColor: TYPE_COLORS[item.type] + '66' }]}>
                <Text style={styles.icon}>{item.icon}</Text>
              </RNView>
            </RNView>

            <RNView style={styles.cardBody}>
              <RNView style={styles.cardTop}>
                <Text style={styles.evidenceId}>{item.id}</Text>
                <RNView style={[styles.typeBadge, { borderColor: TYPE_COLORS[item.type] }]}>
                  <Text style={[styles.typeText, { color: TYPE_COLORS[item.type] }]}>{item.type}</Text>
                </RNView>
              </RNView>

              <Text style={styles.evidenceLabel}>{item.label}</Text>
              <Text style={styles.evidenceNotes}>{item.notes}</Text>

              <RNView style={styles.cardFooter}>
                <RNView style={styles.casePill}>
                  <Text style={styles.casePillText}>{item.caseId}</Text>
                </RNView>
                <Text style={styles.dateText}>{item.date}</Text>
              </RNView>
            </RNView>
          </RNView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  headerLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#888',
  },
  headerCount: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#1ABC9C',
  },

  // Filters
  filterSection: {
    paddingTop: 12,
    paddingLeft: 20,
  },
  filterLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#444',
    marginBottom: 6,
  },
  filterRow: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 8,
  },
  filterChipActiveCase: {
    backgroundColor: 'rgba(231,76,60,0.15)',
    borderColor: '#E74C3C',
  },
  filterChipText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#444',
  },
  filterChipTextActiveCase: {
    color: '#E74C3C',
  },
  divider: {
    height: 1,
    backgroundColor: '#1A1A1A',
    marginTop: 4,
  },

  // List
  list: {
    padding: 16,
  },
  separator: {
    height: 10,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#333',
  },

  // Card
  card: {
    backgroundColor: '#141414',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1F1F1F',
    padding: 14,
    flexDirection: 'row',
    gap: 12,
  },
  cardLeft: {
    alignItems: 'center',
    paddingTop: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  cardBody: {
    flex: 1,
    gap: 4,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  evidenceId: {
    fontSize: 10,
    color: '#444',
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  typeBadge: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  typeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  evidenceLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DDD',
    letterSpacing: 0.2,
  },
  evidenceNotes: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
    paddingTop: 8,
  },
  casePill: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    borderRadius: 2,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  casePillText: {
    fontSize: 9,
    color: '#666',
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 10,
    color: '#444',
  },
});

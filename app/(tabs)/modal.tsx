import { StyleSheet, ScrollView, Pressable, View as RNView } from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '@/components/Themed';

const CASE = {
  id: 'C-0041',
  title: 'The Blackwood Poisoning',
  status: 'OPEN',
  priority: 'URGENT',
  location: 'Blackwood Manor, Yorkshire',
  reportedDate: 'November 12, 2024',
  lastUpdated: 'November 14, 2024',
  assignedTo: 'Detective R. Harlow',
  summary:
    'Lord Edmund Blackwood was found unresponsive in his study at 11:42 PM. Toxicology confirms cyanide poisoning. The estate was locked from the inside. Four persons of interest have been identified among the household staff and family members.',
  suspects: [
    { id: 'S-001', name: 'Victor Ashmore', role: 'Family Solicitor', status: 'AT LARGE' },
    { id: 'S-002', name: 'Elara Voss', role: 'Head of Staff', status: 'IN CUSTODY' },
    { id: 'S-004', name: 'Miriam Holst', role: 'Cook', status: 'CLEARED' },
    { id: 'S-006', name: 'James Blackwood', role: 'Son & Heir', status: 'PERSON OF INTEREST' },
  ],
  evidence: [
    { id: 'E-001', type: '🧪', label: 'Toxicology Report', tag: 'LAB' },
    { id: 'E-002', type: '📸', label: 'Crime Scene Photos (x14)', tag: 'VISUAL' },
    { id: 'E-003', type: '📄', label: 'Last Will & Testament', tag: 'DOCUMENT' },
    { id: 'E-004', type: '🔑', label: 'Locked Study Key', tag: 'PHYSICAL' },
    { id: 'E-005', type: '📞', label: 'Phone Records — Nov 11', tag: 'DIGITAL' },
    { id: 'E-006', type: '🍷', label: 'Wine Glass (partial print)', tag: 'PHYSICAL' },
    { id: 'E-007', type: '✉️', label: 'Anonymous Letter', tag: 'DOCUMENT' },
  ],
  notes: [
    { timestamp: 'Nov 14 · 09:12', text: 'Solicitor Ashmore failed to appear for scheduled interview. Warrant issued.' },
    { timestamp: 'Nov 13 · 17:45', text: 'Anonymous letter confirmed to match typewriter found in guest room.' },
    { timestamp: 'Nov 12 · 23:00', text: 'Scene secured. Coroner estimates time of death between 10 PM and midnight.' },
  ],
};

const STATUS_COLORS: Record<string, string> = {
  'AT LARGE': '#E74C3C',
  'IN CUSTODY': '#E67E22',
  'CLEARED': '#27AE60',
  'PERSON OF INTEREST': '#F1C40F',
};

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: '#0D0D0D' },
          headerTintColor: '#666',
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable onPress={() => router.back()} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>CLOSE</Text>
            </Pressable>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Case Header */}
        <RNView style={styles.caseHeader}>
          <RNView style={styles.caseHeaderTop}>
            <Text style={styles.caseId}>{CASE.id}</Text>
            <RNView style={styles.urgentBadge}>
              <Text style={styles.urgentText}>⚠ {CASE.priority}</Text>
            </RNView>
          </RNView>
          <Text style={styles.caseTitle}>{CASE.title}</Text>
          <Text style={styles.caseLocation}>📍 {CASE.location}</Text>

          <RNView style={styles.divider} />

          <RNView style={styles.metaGrid}>
            <RNView style={styles.metaItem}>
              <Text style={styles.metaLabel}>REPORTED</Text>
              <Text style={styles.metaValue}>{CASE.reportedDate}</Text>
            </RNView>
            <RNView style={styles.metaItem}>
              <Text style={styles.metaLabel}>UPDATED</Text>
              <Text style={styles.metaValue}>{CASE.lastUpdated}</Text>
            </RNView>
            <RNView style={styles.metaItem}>
              <Text style={styles.metaLabel}>ASSIGNED</Text>
              <Text style={styles.metaValue}>{CASE.assignedTo}</Text>
            </RNView>
          </RNView>
        </RNView>

        {/* Summary */}
        <RNView style={styles.section}>
          <Text style={styles.sectionLabel}>SUMMARY</Text>
          <Text style={styles.summaryText}>{CASE.summary}</Text>
        </RNView>

        {/* Suspects */}
        <RNView style={styles.section}>
          <Text style={styles.sectionLabel}>SUSPECTS ({CASE.suspects.length})</Text>
          {CASE.suspects.map((s) => (
            <RNView key={s.id} style={styles.suspectRow}>
              <RNView style={styles.suspectLeft}>
                <Text style={styles.suspectName}>{s.name}</Text>
                <Text style={styles.suspectRole}>{s.role}</Text>
              </RNView>
              <RNView style={[styles.statusBadge, { borderColor: STATUS_COLORS[s.status] ?? '#555' }]}>
                <Text style={[styles.statusText, { color: STATUS_COLORS[s.status] ?? '#555' }]}>
                  {s.status}
                </Text>
              </RNView>
            </RNView>
          ))}
        </RNView>

        {/* Evidence */}
        <RNView style={styles.section}>
          <Text style={styles.sectionLabel}>EVIDENCE ({CASE.evidence.length} ITEMS)</Text>
          <RNView style={styles.evidenceGrid}>
            {CASE.evidence.map((e) => (
              <RNView key={e.id} style={styles.evidenceCard}>
                <Text style={styles.evidenceIcon}>{e.type}</Text>
                <Text style={styles.evidenceLabel}>{e.label}</Text>
                <Text style={styles.evidenceTag}>{e.tag}</Text>
              </RNView>
            ))}
          </RNView>
        </RNView>

        {/* Case Notes */}
        <RNView style={styles.section}>
          <Text style={styles.sectionLabel}>CASE NOTES</Text>
          {CASE.notes.map((n, i) => (
            <RNView key={i} style={styles.noteRow}>
              <RNView style={styles.noteLine} />
              <RNView style={styles.noteContent}>
                <Text style={styles.noteTimestamp}>{n.timestamp}</Text>
                <Text style={styles.noteText}>{n.text}</Text>
              </RNView>
            </RNView>
          ))}
        </RNView>

        {/* Action */}
        <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.7 }]}>
          <Text style={styles.actionBtnText}>MARK AS SOLVED</Text>
        </Pressable>

      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scroll: {
    padding: 20,
    paddingBottom: 48,
  },
  closeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  closeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#555',
  },

  // Case Header
  caseHeader: {
    backgroundColor: '#141414',
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1F1F1F',
    marginBottom: 16,
  },
  caseHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseId: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#555',
  },
  urgentBadge: {
    backgroundColor: 'rgba(231,76,60,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },
  urgentText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#E74C3C',
  },
  caseTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F0F0F0',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  caseLocation: {
    fontSize: 12,
    color: '#555',
  },
  divider: {
    height: 1,
    backgroundColor: '#1F1F1F',
    marginVertical: 14,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  metaItem: {
    gap: 3,
  },
  metaLabel: {
    fontSize: 9,
    color: '#444',
    letterSpacing: 2,
    fontWeight: '700',
  },
  metaValue: {
    fontSize: 12,
    color: '#999',
  },

  // Sections
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
    color: '#555',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#AAA',
    lineHeight: 22,
  },

  // Suspects
  suspectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  suspectLeft: {
    gap: 2,
  },
  suspectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DDD',
  },
  suspectRole: {
    fontSize: 11,
    color: '#555',
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  // Evidence
  evidenceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  evidenceCard: {
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#1F1F1F',
    borderRadius: 4,
    padding: 10,
    width: '47%',
    gap: 4,
  },
  evidenceIcon: {
    fontSize: 18,
  },
  evidenceLabel: {
    fontSize: 12,
    color: '#CCC',
    fontWeight: '500',
  },
  evidenceTag: {
    fontSize: 9,
    color: '#555',
    letterSpacing: 1.5,
    fontWeight: '700',
  },

  // Notes
  noteRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  noteLine: {
    width: 2,
    backgroundColor: '#2A2A2A',
    borderRadius: 1,
  },
  noteContent: {
    flex: 1,
    gap: 4,
  },
  noteTimestamp: {
    fontSize: 10,
    color: '#555',
    letterSpacing: 1,
  },
  noteText: {
    fontSize: 13,
    color: '#999',
    lineHeight: 20,
  },

  // Action
  actionBtn: {
    backgroundColor: '#1A0000',
    borderWidth: 1,
    borderColor: '#E74C3C',
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
    color: '#E74C3C',
  },
});

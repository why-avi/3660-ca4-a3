import { StyleSheet, FlatList, Pressable, View as RNView } from 'react-native';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';

const CASES = [
  {
    id: 'C-0041',
    title: 'The Blackwood Poisoning',
    location: 'Blackwood Manor, Yorkshire',
    date: 'Nov 12, 2024',
    status: 'OPEN',
    priority: 'URGENT',
    suspects: 4,
    evidence: 7,
  },
  {
    id: 'C-0038',
    title: 'Missing Diplomat',
    location: 'Central Embassy District',
    date: 'Oct 29, 2024',
    status: 'OPEN',
    priority: null,
    suspects: 2,
    evidence: 3,
  },
  {
    id: 'C-0031',
    title: 'The Harbor Arsonist',
    location: 'Eastport Docks',
    date: 'Sep 4, 2024',
    status: 'COLD',
    priority: null,
    suspects: 6,
    evidence: 11,
  },
  {
    id: 'C-0027',
    title: 'Gallery Heist',
    location: 'Morrow Art Institute',
    date: 'Aug 17, 2024',
    status: 'SOLVED',
    priority: null,
    suspects: 1,
    evidence: 9,
  },
  {
    id: 'C-0019',
    title: 'The Midnight Caller',
    location: 'Unknown',
    date: 'Jun 2, 2024',
    status: 'COLD',
    priority: null,
    suspects: 0,
    evidence: 2,
  },
];

const STATUS_COLORS: Record<string, string> = {
  OPEN: '#E74C3C',
  COLD: '#5D7A8A',
  SOLVED: '#27AE60',
};

export default function CasesScreen() {
  return (
    <View style={styles.container}>
      <RNView style={styles.header}>
        <Text style={styles.headerLabel}>CASE FILES</Text>
        <Text style={styles.headerCount}>{CASES.filter(c => c.status === 'OPEN').length} ACTIVE</Text>
      </RNView>

      <FlatList
        data={CASES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <RNView style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push('/modal')}
          >
            <RNView style={styles.cardTop}>
              <RNView style={styles.caseIdRow}>
                <Text style={styles.caseId}>{item.id}</Text>
                {item.priority === 'URGENT' && (
                  <RNView style={styles.urgentBadge}>
                    <Text style={styles.urgentText}>⚠ URGENT</Text>
                  </RNView>
                )}
              </RNView>
              <RNView style={[styles.statusBadge, { borderColor: STATUS_COLORS[item.status] }]}>
                <Text style={[styles.statusText, { color: STATUS_COLORS[item.status] }]}>
                  {item.status}
                </Text>
              </RNView>
            </RNView>

            <Text style={styles.caseTitle}>{item.title}</Text>
            <Text style={styles.caseLocation}>📍 {item.location}</Text>

            <RNView style={styles.cardBottom}>
              <Text style={styles.metaText}>🗓 {item.date}</Text>
              <RNView style={styles.metaRight}>
                <Text style={styles.metaText}>👤 {item.suspects}</Text>
                <Text style={styles.metaDivider}>·</Text>
                <Text style={styles.metaText}>🔍 {item.evidence}</Text>
              </RNView>
            </RNView>
          </Pressable>
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
    color: '#E74C3C',
  },
  list: {
    padding: 16,
  },
  separator: {
    height: 10,
  },
  card: {
    backgroundColor: '#141414',
    borderRadius: 4,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#2A2A2A',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#1F1F1F',
    borderRightColor: '#1F1F1F',
    borderBottomColor: '#1F1F1F',
  },
  cardPressed: {
    opacity: 0.7,
    borderLeftColor: '#E74C3C',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  caseIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  caseId: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#555',
  },
  urgentBadge: {
    backgroundColor: 'rgba(231,76,60,0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  urgentText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#E74C3C',
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
  caseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#E8E8E8',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  caseLocation: {
    fontSize: 12,
    color: '#555',
    marginBottom: 12,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
    paddingTop: 10,
  },
  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 11,
    color: '#555',
  },
  metaDivider: {
    color: '#333',
  },
});

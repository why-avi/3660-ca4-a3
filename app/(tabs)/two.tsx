import { StyleSheet, FlatList, Pressable, View as RNView } from 'react-native';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';

const SUSPECTS = [
  {
    id: 'S-001',
    name: 'Victor Ashmore',
    alias: '"The Solicitor"',
    age: 54,
    status: 'AT LARGE',
    threat: 'HIGH',
    linkedCase: 'C-0041',
    initials: 'VA',
  },
  {
    id: 'S-002',
    name: 'Elara Voss',
    alias: null,
    age: 31,
    status: 'IN CUSTODY',
    threat: 'MEDIUM',
    linkedCase: 'C-0041',
    initials: 'EV',
  },
  {
    id: 'S-003',
    name: 'Dorian Falk',
    alias: '"Ghost"',
    age: 47,
    status: 'AT LARGE',
    threat: 'CRITICAL',
    linkedCase: 'C-0038',
    initials: 'DF',
  },
  {
    id: 'S-004',
    name: 'Miriam Holst',
    alias: null,
    age: 62,
    status: 'CLEARED',
    threat: 'LOW',
    linkedCase: 'C-0031',
    initials: 'MH',
  },
  {
    id: 'S-005',
    name: 'Theo Crane',
    alias: '"The Painter"',
    age: 38,
    status: 'CLEARED',
    threat: 'LOW',
    linkedCase: 'C-0027',
    initials: 'TC',
  },
];

const THREAT_COLORS: Record<string, string> = {
  CRITICAL: '#E74C3C',
  HIGH: '#E67E22',
  MEDIUM: '#F1C40F',
  LOW: '#27AE60',
};

const STATUS_COLORS: Record<string, string> = {
  'AT LARGE': '#E74C3C',
  'IN CUSTODY': '#E67E22',
  'CLEARED': '#27AE60',
};

export default function SuspectsScreen() {
  return (
    <View style={styles.container}>
      <RNView style={styles.header}>
        <Text style={styles.headerLabel}>SUSPECTS</Text>
        <Text style={styles.headerCount}>
          {SUSPECTS.filter(s => s.status === 'AT LARGE').length} AT LARGE
        </Text>
      </RNView>

      <FlatList
        data={SUSPECTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <RNView style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => router.push('/modal')}
          >
            <RNView style={styles.row}>
              {/* Avatar */}
              <RNView style={[styles.avatar, { borderColor: THREAT_COLORS[item.threat] }]}>
                <Text style={styles.initials}>{item.initials}</Text>
                <RNView style={[styles.threatDot, { backgroundColor: THREAT_COLORS[item.threat] }]} />
              </RNView>

              {/* Info */}
              <RNView style={styles.info}>
                <RNView style={styles.nameRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.suspectId}>{item.id}</Text>
                </RNView>

                {item.alias && (
                  <Text style={styles.alias}>{item.alias}</Text>
                )}

                <RNView style={styles.tags}>
                  <RNView style={[styles.statusBadge, { borderColor: STATUS_COLORS[item.status] }]}>
                    <Text style={[styles.statusText, { color: STATUS_COLORS[item.status] }]}>
                      {item.status}
                    </Text>
                  </RNView>
                  <Text style={styles.metaText}>AGE {item.age}</Text>
                  <Text style={styles.metaText}>CASE {item.linkedCase}</Text>
                </RNView>
              </RNView>
            </RNView>

            {/* Threat bar */}
            <RNView style={styles.threatRow}>
              <Text style={styles.threatLabel}>THREAT LEVEL</Text>
              <RNView style={styles.threatBarBg}>
                <RNView style={[
                  styles.threatBarFill,
                  {
                    backgroundColor: THREAT_COLORS[item.threat],
                    width: item.threat === 'CRITICAL' ? '100%'
                      : item.threat === 'HIGH' ? '75%'
                      : item.threat === 'MEDIUM' ? '50%' : '25%',
                  }
                ]} />
              </RNView>
              <Text style={[styles.threatValue, { color: THREAT_COLORS[item.threat] }]}>
                {item.threat}
              </Text>
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
    padding: 14,
    borderWidth: 1,
    borderColor: '#1F1F1F',
  },
  cardPressed: {
    opacity: 0.7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 16,
    fontWeight: '800',
    color: '#CCC',
    letterSpacing: 1,
  },
  threatDot: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#141414',
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8E8E8',
    letterSpacing: 0.3,
  },
  suspectId: {
    fontSize: 10,
    color: '#444',
    letterSpacing: 1,
  },
  alias: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  metaText: {
    fontSize: 10,
    color: '#444',
    letterSpacing: 1,
  },
  threatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#1F1F1F',
    paddingTop: 10,
  },
  threatLabel: {
    fontSize: 9,
    color: '#444',
    letterSpacing: 1.5,
    width: 80,
  },
  threatBarBg: {
    flex: 1,
    height: 3,
    backgroundColor: '#222',
    borderRadius: 2,
    overflow: 'hidden',
  },
  threatBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  threatValue: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    width: 52,
    textAlign: 'right',
  },
});

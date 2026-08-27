import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { getCashback } from '../utils/storage';

export default function RewardsScreen() {
  const [cashback, setCashback] = useState({ totalCashback: '₹0', rewards: 0, currentMonth: '₹0' });

  useFocusEffect(
    React.useCallback(() => {
      loadCashback();
    }, [])
  );

  const loadCashback = async () => {
    const data = await getCashback();
    setCashback(data);
  };

  const rewardCategories = [
    {
      id: '1',
      name: 'DAILY REWARDS',
      icon: 'gift',
      color: '#FFB44A',
      description: 'Earn daily',
    },
    {
      id: '2',
      name: 'UPI REWARDS',
      icon: 'mobile-pay',
      color: '#5B4E8E',
      description: 'Send & earn',
    },
    {
      id: '3',
      name: 'CRED STORE',
      icon: 'store',
      color: '#9D5BDE',
      description: 'Shop & save',
    },
    {
      id: '4',
      name: 'GIFT CARDS',
      icon: 'card-giftcard',
      color: '#00A8FF',
      description: 'Redeem now',
    },
    {
      id: '5',
      name: 'TOP DEALS',
      icon: 'lightning-bolt',
      color: '#00D9A3',
      description: 'Limited time',
    },
  ];

  const specialOffers = [
    {
      id: '1',
      title: 'Roadside Assistance',
      subtitle: 'Digit Insurance',
      discount: '₹3,000',
      image: '🚗',
    },
    {
      id: '2',
      title: '20% Off Groceries',
      subtitle: 'Country Delight',
      discount: '₹3,000',
      image: '🛒',
    },
  ];

  const renderRewardCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <LinearGradient
        colors={[item.color, item.color + '80']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryGradient}>
        <MaterialCommunityIcons name={item.icon} size={48} color="#fff" />
        <Text style={styles.categoryName}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderOffer = ({ item }) => (
    <View style={styles.offerCard}>
      <Text style={styles.offerEmoji}>{item.image}</Text>
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerSubtitle}>{item.subtitle}</Text>
      </View>
      <View style={styles.offerDiscount}>
        <LinearGradient
          colors={['#00D9A3', '#00B88A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </LinearGradient>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Rewards</Text>
          <Text style={styles.headerSubtitle}>Earn & redeem rewards</Text>
        </View>

        {/* Total Rewards Card */}
        <LinearGradient
          colors={['#00D9A3', '#00B88A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.rewardsCard}>
          <View style={styles.rewardsContent}>
            <View style={styles.rewardsValue}>
              <MaterialCommunityIcons name="coin" size={32} color="#fff" />
              <Text style={styles.rewardsAmount}>{cashback.rewards.toLocaleString('en-IN')}</Text>
            </View>
            <View style={styles.rewardsInfo}>
              <Text style={styles.rewardsLabel}>Total CRED Coins</Text>
              <Text style={styles.rewardsSubtext}>Earned & ready to use</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Cashback Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Cashback</Text>
            <Text style={styles.summaryValue}>{cashback.totalCashback}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={styles.summaryValue}>{cashback.currentMonth}</Text>
          </View>
        </View>

        {/* Reward Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EARN REWARDS</Text>
          <FlatList
            data={rewardCategories}
            renderItem={renderRewardCategory}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={{ gap: 12 }}
          />
        </View>

        {/* Special Offers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SPECIAL OFFERS</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>view all ></Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={specialOffers}
            renderItem={renderOffer}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* How to Earn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOW TO EARN MORE</Text>
          <View style={styles.howToList}>
            <View style={styles.howToItem}>
              <View style={styles.howToNumber}>
                <Text style={styles.howToNumberText}>1</Text>
              </View>
              <View style={styles.howToContent}>
                <Text style={styles.howToTitle}>Pay your credit card bills</Text>
                <Text style={styles.howToDescription}>Get cashback on every payment</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
            </View>
            <View style={styles.howToItem}>
              <View style={styles.howToNumber}>
                <Text style={styles.howToNumberText}>2</Text>
              </View>
              <View style={styles.howToContent}>
                <Text style={styles.howToTitle}>Use UPI payments</Text>
                <Text style={styles.howToDescription}>Earn coins on every transaction</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
            </View>
            <View style={styles.howToItem}>
              <View style={styles.howToNumber}>
                <Text style={styles.howToNumberText}>3</Text>
              </View>
              <View style={styles.howToContent}>
                <Text style={styles.howToTitle}>Refer friends</Text>
                <Text style={styles.howToDescription}>Get bonus rewards on referrals</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#1a1a1a',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 6,
  },
  rewardsCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  rewardsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  rewardsValue: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    width: 70,
    height: 70,
    justifyContent: 'center',
  },
  rewardsAmount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  rewardsInfo: {
    flex: 1,
  },
  rewardsLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  rewardsSubtext: {
    color: '#ccc',
    fontSize: 11,
    marginTop: 4,
  },
  summarySection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#888',
    fontSize: 11,
    fontWeight: '500',
  },
  summaryValue: {
    color: '#00D9A3',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  viewAllText: {
    color: '#00D9A3',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryCard: {
    flex: 1,
    height: 120,
  },
  categoryGradient: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  categoryName: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  offerCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  offerEmoji: {
    fontSize: 40,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  offerSubtitle: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  offerDiscount: {
    alignItems: 'center',
  },
  discountBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  howToList: {
    marginTop: 12,
    gap: 8,
  },
  howToItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  howToNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00D9A3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  howToNumberText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  howToContent: {
    flex: 1,
  },
  howToTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  howToDescription: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { getCards, getLoans, getBankAccounts, getCashback } from '../utils/storage';

export default function HomeScreen() {
  const [cards, setCards] = useState([]);
  const [loans, setLoans] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [cashback, setCashback] = useState({ totalCashback: '₹0', rewards: 0 });

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const cardsData = await getCards();
    const loansData = await getLoans();
    const accountsData = await getBankAccounts();
    const cashbackData = await getCashback();

    setCards(cardsData);
    setLoans(loansData);
    setBankAccounts(accountsData);
    setCashback(cashbackData);
  };

  const renderCard = ({ item }) => (
    <LinearGradient
      colors={[item.cardColor, '#2a1f4a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.creditCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.bankName}>{item.bankName}</Text>
        <Text style={styles.cardBrand}>VISA</Text>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardNumber}>{item.cardNumber}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardHolder}>MUKESH CH</Text>
          <Text style={styles.cardExpiry}>12/28</Text>
        </View>
        <View style={styles.dueInfo}>
          <Text style={styles.dueLabel}>{item.dueAmount}</Text>
          <Text style={styles.dueDate}>{item.dueDate}</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderBill = ({ item }) => (
    <View style={styles.billCard}>
      <View style={styles.billHeader}>
        <View>
          <Text style={styles.billBank}>{item.bankName}</Text>
          <Text style={styles.billCardNumber}>{item.cardNumber}</Text>
        </View>
        <View style={styles.billAmount}>
          <Text style={styles.billDueAmount}>{item.dueAmount}</Text>
          <Text style={styles.billDueDate}>{item.dueDate}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://ui-avatars.com/api/?name=Mukesh&background=00D9A3&color=fff&size=48',
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>Mukesh</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell" size={24} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promo Card */}
      <LinearGradient
        colors={['#9D5BDE', '#5B4E8E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.promoCard}>
        <View style={styles.promoContent}>
          <View style={styles.promoLive}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE NOW</Text>
          </View>
          <Text style={styles.promoAmount}>₹100</Text>
          <Text style={styles.promoStats}>50,60,784</Text>
          <Text style={styles.promoDescription}>MEMBERS EARNED ₹100 CASHBACK ON REWARDS</Text>
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim yours ></Text>
          </TouchableOpacity>
        </View>
        <MaterialCommunityIcons name="currency-inr" size={80} color="#ffffff20" style={styles.promoIcon} />
      </LinearGradient>

      {/* Money Matters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MONEY MATTERS</Text>
        <View style={styles.moneyMattersList}>
          <TouchableOpacity style={styles.moneyMatterItem}>
            <MaterialCommunityIcons name="wallet" size={20} color="#00D9A3" />
            <View style={styles.moneyMatterContent}>
              <Text style={styles.moneyMatterLabel}>cash</Text>
              <Text style={styles.moneyMatterValue}>₹15,00,000</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moneyMatterItem}>
            <MaterialCommunityIcons name="chart-line" size={20} color="#00D9A3" />
            <View style={styles.moneyMatterContent}>
              <Text style={styles.moneyMatterLabel}>money</Text>
              <Text style={styles.moneyMatterValue}>access now</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Bills */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>UPCOMING BILLS ({cards.length})</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>view all ></Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={cards.slice(0, 2)}
          renderItem={renderBill}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* Bank Accounts */}
      {bankAccounts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR BANK ACCOUNTS</Text>
          {bankAccounts.map(account => (
            <View key={account.id} style={styles.accountCard}>
              <MaterialCommunityIcons name="bank" size={24} color="#00D9A3" />
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>{account.bankName}</Text>
                <Text style={styles.accountNumber}>{account.accountNumber}</Text>
              </View>
              <View style={styles.accountBalance}>
                <Text style={styles.accountBalanceLabel}>{account.accountType}</Text>
                <Text style={styles.accountBalanceValue}>{account.balance}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Personal Loans */}
      {loans.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>YOUR LOANS</Text>
          {loans.map(loan => (
            <View key={loan.id} style={styles.loanCard}>
              <View style={styles.loanHeader}>
                <View>
                  <Text style={styles.loanType}>{loan.loanType}</Text>
                  <Text style={styles.loanProvider}>{loan.provider}</Text>
                </View>
                <View style={styles.loanAmount}>
                  <Text style={styles.loanAmountLabel}>EMI Due</Text>
                  <Text style={styles.loanAmountValue}>{loan.emiAmount}</Text>
                </View>
              </View>
              <View style={styles.loanDetails}>
                <View>
                  <Text style={styles.loanDetailLabel}>Original Amount</Text>
                  <Text style={styles.loanDetailValue}>{loan.loanAmount}</Text>
                </View>
                <View>
                  <Text style={styles.loanDetailLabel}>Remaining</Text>
                  <Text style={styles.loanDetailValue}>{loan.remainingAmount}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.payEmiButton}>
                <Text style={styles.payEmiButtonText}>Pay EMI</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1a1a1a',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  greeting: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  notificationButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: '#FF4757',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  promoCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 24,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoContent: {
    flex: 1,
  },
  promoLive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00D9A3',
    marginRight: 6,
  },
  liveText: {
    color: '#00D9A3',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  promoAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoStats: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  promoDescription: {
    color: '#ccc',
    fontSize: 11,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  claimButton: {
    backgroundColor: '#FFB44A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  promoIcon: {
    marginLeft: 16,
    opacity: 0.3,
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
  moneyMattersList: {
    gap: 12,
    marginTop: 12,
  },
  moneyMatterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  moneyMatterContent: {
    flex: 1,
  },
  moneyMatterLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '500',
  },
  moneyMatterValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  creditCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    minHeight: 200,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bankName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cardBrand: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardDetails: {
    marginVertical: 20,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardHolder: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardExpiry: {
    color: '#ccc',
    fontSize: 11,
    marginTop: 4,
  },
  dueInfo: {
    alignItems: 'flex-end',
  },
  dueLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  dueDate: {
    color: '#FFB44A',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  billCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  billBank: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  billCardNumber: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  billAmount: {
    alignItems: 'flex-end',
  },
  billDueAmount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  billDueDate: {
    color: '#FFB44A',
    fontSize: 11,
    marginTop: 2,
  },
  payButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  accountNumber: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  accountBalance: {
    alignItems: 'flex-end',
  },
  accountBalanceLabel: {
    color: '#888',
    fontSize: 11,
  },
  accountBalanceValue: {
    color: '#00D9A3',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  loanCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  loanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  loanType: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loanProvider: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  loanAmount: {
    alignItems: 'flex-end',
  },
  loanAmountLabel: {
    color: '#888',
    fontSize: 11,
  },
  loanAmountValue: {
    color: '#00D9A3',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  loanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 12,
  },
  loanDetailLabel: {
    color: '#888',
    fontSize: 11,
  },
  loanDetailValue: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  payEmiButton: {
    backgroundColor: '#00D9A3',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  payEmiButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
  },
});

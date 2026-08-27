import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getCards, getLoans, getBankAccounts, deleteCard, deleteLoan, deleteBankAccount, ADMIN_PASSWORD } from '../utils/storage';

export default function MoreScreen() {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [manageType, setManageType] = useState(''); // 'cards', 'loans', 'accounts'
  const [managedItems, setManagedItems] = useState([]);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminMode(true);
      setShowAdminModal(false);
      setAdminPassword('');
      Alert.alert('Success', 'Admin mode activated');
    } else {
      Alert.alert('Error', 'Incorrect password');
      setAdminPassword('');
    }
  };

  const handleLogoutAdmin = () => {
    setIsAdminMode(false);
    Alert.alert('Info', 'Admin mode deactivated');
  };

  const handleOpenManageCards = async () => {
    const cards = await getCards();
    setManagedItems(cards);
    setManageType('cards');
    setShowManageModal(true);
  };

  const handleOpenManageLoans = async () => {
    const loans = await getLoans();
    setManagedItems(loans);
    setManageType('loans');
    setShowManageModal(true);
  };

  const handleOpenManageAccounts = async () => {
    const accounts = await getBankAccounts();
    setManagedItems(accounts);
    setManageType('accounts');
    setShowManageModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          if (manageType === 'cards') {
            await deleteCard(itemId);
          } else if (manageType === 'loans') {
            await deleteLoan(itemId);
          } else if (manageType === 'accounts') {
            await deleteBankAccount(itemId);
          }

          // Refresh the list
          let updatedItems = [];
          if (manageType === 'cards') updatedItems = await getCards();
          else if (manageType === 'loans') updatedItems = await getLoans();
          else if (manageType === 'accounts') updatedItems = await getBankAccounts();

          setManagedItems(updatedItems);
          Alert.alert('Success', 'Item deleted successfully');
        },
      },
    ]);
  };

  const renderManagedItem = ({ item }) => {
    let title = '';
    let subtitle = '';

    if (manageType === 'cards') {
      title = item.bankName;
      subtitle = item.cardNumber;
    } else if (manageType === 'loans') {
      title = item.loanType;
      subtitle = item.provider;
    } else if (manageType === 'accounts') {
      title = item.bankName;
      subtitle = item.accountNumber;
    }

    return (
      <View style={styles.itemCard}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteItem(item.id)}>
          <MaterialCommunityIcons name="trash-can" size={20} color="#FF4757" />
        </TouchableOpacity>
      </View>
    );
  };

  const menuItems = [
    {
      id: '1',
      icon: 'bell',
      title: 'Notifications',
      subtitle: 'Manage alerts & reminders',
    },
    {
      id: '2',
      icon: 'lock',
      title: 'Security',
      subtitle: 'Password & 2-factor auth',
    },
    {
      id: '3',
      icon: 'information',
      title: 'About',
      subtitle: 'App version & information',
    },
    {
      id: '4',
      icon: 'file-document',
      title: 'Privacy Policy',
      subtitle: 'Terms & conditions',
    },
    {
      id: '5',
      icon: 'help-circle',
      title: 'Help & Support',
      subtitle: 'Contact our team',
    },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuIcon}>
        <MaterialCommunityIcons name={item.icon} size={24} color="#00D9A3" />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>More</Text>
          <Text style={styles.headerSubtitle}>Settings & more options</Text>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={['#5B4E8E', '#3A5C7D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}>
          <View style={styles.profileContent}>
            <Text style={styles.profileName}>Mukesh Chakraborty</Text>
            <Text style={styles.profileEmail}>mukesh_c@email.com</Text>
            <View style={styles.memberBadge}>
              <MaterialCommunityIcons name="star" size={16} color="#FFB44A" />
              <Text style={styles.memberText}>Premium Member</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Admin Section */}
        <View style={styles.adminSection}>
          {!isAdminMode ? (
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => setShowAdminModal(true)}>
              <MaterialCommunityIcons name="lock-open-outline" size={24} color="#fff" />
              <Text style={styles.adminButtonText}>Admin Panel</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#888" />
            </TouchableOpacity>
          ) : (
            <View style={styles.adminModeActive}>
              <View style={styles.adminHeader}>
                <View style={styles.adminBadge}>
                  <MaterialCommunityIcons name="shield-check" size={20} color="#fff" />
                  <Text style={styles.adminBadgeText}>Admin Mode Active</Text>
                </View>
                <TouchableOpacity onPress={handleLogoutAdmin}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>

              {/* Manage Cards */}
              <TouchableOpacity
                style={styles.adminOption}
                onPress={handleOpenManageCards}>
                <View style={styles.adminOptionIcon}>
                  <MaterialCommunityIcons name="credit-card" size={24} color="#00D9A3" />
                </View>
                <View style={styles.adminOptionContent}>
                  <Text style={styles.adminOptionTitle}>Manage Credit Cards</Text>
                  <Text style={styles.adminOptionSubtitle}>Add or remove cards</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
              </TouchableOpacity>

              {/* Manage Loans */}
              <TouchableOpacity
                style={styles.adminOption}
                onPress={handleOpenManageLoans}>
                <View style={styles.adminOptionIcon}>
                  <MaterialCommunityIcons name="cash-multiple" size={24} color="#FFB44A" />
                </View>
                <View style={styles.adminOptionContent}>
                  <Text style={styles.adminOptionTitle}>Manage Personal Loans</Text>
                  <Text style={styles.adminOptionSubtitle}>Add or remove loans</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
              </TouchableOpacity>

              {/* Manage Bank Accounts */}
              <TouchableOpacity
                style={styles.adminOption}
                onPress={handleOpenManageAccounts}>
                <View style={styles.adminOptionIcon}>
                  <MaterialCommunityIcons name="bank" size={24} color="#FF4757" />
                </View>
                <View style={styles.adminOptionContent}>
                  <Text style={styles.adminOptionTitle}>Manage Bank Accounts</Text>
                  <Text style={styles.adminOptionSubtitle}>Add or remove accounts</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* App Info */}
        <View style={styles.infoSection}>
          <Text style={styles.infoVersion}>Chandaka v1.0.0</Text>
          <Text style={styles.infoSubtext}>Financial Management App</Text>
          <TouchableOpacity style={styles.logoutFinalButton}>
            <Text style={styles.logoutFinalButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Admin Login Modal */}
      <Modal visible={showAdminModal} animationType="fade" transparent>
        <View style={styles.adminLoginOverlay}>
          <View style={styles.adminLoginContent}>
            <Text style={styles.adminLoginTitle}>Admin Login</Text>
            <Text style={styles.adminLoginSubtitle}>Enter admin password</Text>

            <TextInput
              style={styles.adminLoginInput}
              placeholder="Enter password"
              placeholderTextColor="#666"
              secureTextEntry
              value={adminPassword}
              onChangeText={setAdminPassword}
            />

            <TouchableOpacity
              style={styles.adminLoginButton}
              onPress={handleAdminLogin}>
              <Text style={styles.adminLoginButtonText}>Unlock Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.adminLoginCancelButton}
              onPress={() => {
                setShowAdminModal(false);
                setAdminPassword('');
              }}>
              <Text style={styles.adminLoginCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Manage Items Modal */}
      <Modal visible={showManageModal} animationType="slide" transparent>
        <View style={styles.manageModalOverlay}>
          <View style={styles.manageModalContent}>
            <View style={styles.manageModalHeader}>
              <Text style={styles.manageModalTitle}>
                {manageType === 'cards'
                  ? 'Manage Cards'
                  : manageType === 'loans'
                  ? 'Manage Loans'
                  : 'Manage Bank Accounts'}
              </Text>
              <TouchableOpacity onPress={() => setShowManageModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {managedItems.length > 0 ? (
              <FlatList
                data={managedItems}
                renderItem={renderManagedItem}
                keyExtractor={item => item.id}
                style={styles.managedItemsList}
              />
            ) : (
              <View style={styles.emptyManage}>
                <MaterialCommunityIcons name="inbox" size={48} color="#666" />
                <Text style={styles.emptyManageText}>No items to manage</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
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
  profileCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContent: {
    flex: 1,
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  profileEmail: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 6,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
    gap: 6,
  },
  memberText: {
    color: '#FFB44A',
    fontSize: 11,
    fontWeight: '600',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  adminButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  adminModeActive: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
  },
  adminHeader: {
    backgroundColor: '#00D9A3',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adminBadgeText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  logoutText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
  adminOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    gap: 12,
  },
  adminOptionIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminOptionContent: {
    flex: 1,
  },
  adminOptionTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  adminOptionSubtitle: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    gap: 12,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  menuSubtitle: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  infoSection: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  infoVersion: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSubtext: {
    color: '#888',
    fontSize: 12,
    marginTop: 6,
  },
  chandakaLogo: {
    fontSize: 32,
    marginBottom: 12,
  },
  logoutFinalButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  logoutFinalButtonText: {
    color: '#FF4757',
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  adminLoginOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  adminLoginContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  adminLoginTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  adminLoginSubtitle: {
    color: '#888',
    fontSize: 12,
    marginBottom: 20,
  },
  adminLoginInput: {
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    marginBottom: 16,
  },
  adminLoginButton: {
    backgroundColor: '#00D9A3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  adminLoginButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  adminLoginCancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  adminLoginCancelButtonText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 14,
  },
  manageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  manageModalContent: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  manageModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  manageModalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  managedItemsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  itemCard: {
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  emptyManage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyManageText: {
    color: '#888',
    fontSize: 14,
    marginTop: 12,
  },
});

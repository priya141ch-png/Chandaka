import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { getCards, addCard, deleteCard } from '../utils/storage';

export default function CardsScreen() {
  const [cards, setCards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCard, setNewCard] = useState({
    bankName: '',
    cardNumber: '',
    dueAmount: '',
    dueDate: '',
    cardColor: '#5B4E8E',
  });

  useFocusEffect(
    React.useCallback(() => {
      loadCards();
    }, [])
  );

  const loadCards = async () => {
    const cardsData = await getCards();
    setCards(cardsData);
  };

  const handleAddCard = async () => {
    if (!newCard.bankName || !newCard.cardNumber || !newCard.dueAmount) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    await addCard(newCard);
    setNewCard({
      bankName: '',
      cardNumber: '',
      dueAmount: '',
      dueDate: '',
      cardColor: '#5B4E8E',
    });
    setShowAddModal(false);
    loadCards();
    Alert.alert('Success', 'Card added successfully');
  };

  const handleDeleteCard = async (cardId) => {
    Alert.alert('Delete Card', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteCard(cardId);
          loadCards();
        },
      },
    ]);
  };

  const cardColors = ['#5B4E8E', '#3A5C7D', '#2D5A4A', '#8B4513', '#4A3C7D'];

  const renderCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={[item.cardColor, '#2a1f4a']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.creditCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.bankName}>{item.bankName}</Text>
          <MaterialCommunityIcons name="credit-card" size={28} color="#fff" />
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
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="information-outline" size={20} color="#00D9A3" />
          <Text style={styles.actionText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="credit-card-clock" size={20} color="#FFB44A" />
          <Text style={styles.actionText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteCard(item.id)}>
          <MaterialCommunityIcons name="trash-can-outline" size={20} color="#FF4757" />
          <Text style={styles.actionText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cards</Text>
          <Text style={styles.headerSubtitle}>Manage all your credit cards</Text>
        </View>

        {/* Cards List */}
        <View style={styles.cardsSection}>
          {cards.length > 0 ? (
            <FlatList
              data={cards}
              renderItem={renderCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="credit-card-off" size={48} color="#666" />
              <Text style={styles.emptyText}>No cards added yet</Text>
              <Text style={styles.emptySubtext}>Add your first card to get started</Text>
            </View>
          )}
        </View>

        {/* Card Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>CARD SUMMARY</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Due</Text>
              <Text style={styles.statValue}>
                ₹
                {cards
                  .reduce((sum, card) => sum + (card.amountDue || 0), 0)
                  .toLocaleString('en-IN')}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Active Cards</Text>
              <Text style={styles.statValue}>{cards.length}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Add Card Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddModal(true)}>
        <MaterialCommunityIcons name="plus" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Add Card Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Card</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formSection}>
              <Text style={styles.inputLabel}>Bank Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., HDFC Bank"
                placeholderTextColor="#666"
                value={newCard.bankName}
                onChangeText={text => setNewCard({ ...newCard, bankName: text })}
              />

              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., XXXX XXXX XXXX 5678"
                placeholderTextColor="#666"
                value={newCard.cardNumber}
                onChangeText={text => setNewCard({ ...newCard, cardNumber: text })}
              />

              <Text style={styles.inputLabel}>Due Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., ₹50,000"
                placeholderTextColor="#666"
                value={newCard.dueAmount}
                onChangeText={text => setNewCard({ ...newCard, dueAmount: text })}
              />

              <Text style={styles.inputLabel}>Due Date</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., DUE IN 5 DAYS"
                placeholderTextColor="#666"
                value={newCard.dueDate}
                onChangeText={text => setNewCard({ ...newCard, dueDate: text })}
              />

              <Text style={styles.inputLabel}>Card Color</Text>
              <View style={styles.colorPicker}>
                {cardColors.map(color => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      newCard.cardColor === color && styles.colorOptionSelected,
                    ]}
                    onPress={() => setNewCard({ ...newCard, cardColor: color })}
                  />
                ))}
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleAddCard}>
                <Text style={styles.submitButtonText}>Add Card</Text>
              </TouchableOpacity>
            </ScrollView>
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
  cardsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  cardContainer: {
    marginBottom: 20,
  },
  creditCard: {
    borderRadius: 16,
    padding: 20,
    minHeight: 200,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cardDetails: {
    marginVertical: 20,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
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
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingVertical: 12,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionText: {
    color: '#fff',
    fontSize: 11,
    marginTop: 4,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  emptySubtext: {
    color: '#888',
    fontSize: 13,
    marginTop: 6,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statsTitle: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statLabel: {
    color: '#888',
    fontSize: 11,
    fontWeight: '500',
  },
  statValue: {
    color: '#00D9A3',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00D9A3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00D9A3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  formSection: {
    paddingBottom: 20,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  colorPicker: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#00D9A3',
  },
  submitButton: {
    backgroundColor: '#00D9A3',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
});

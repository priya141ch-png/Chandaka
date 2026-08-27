import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  CARDS: 'finance_cards',
  LOANS: 'finance_loans',
  BANK_ACCOUNTS: 'finance_bank_accounts',
  CASHBACK: 'finance_cashback',
  ADMIN_PASSWORD: 'admin_password_12345',
};

const defaultData = {
  cards: [
    {
      id: '1',
      bankName: 'HDFC Bank',
      cardType: 'Credit Card',
      cardNumber: 'XXXX XXXX XXXX 7539',
      dueAmount: '₹72,347',
      dueDate: 'DUE IN 6 DAYS',
      cardColor: '#5B4E8E',
      lastDigits: '7539',
      amountDue: 72347,
    },
    {
      id: '2',
      bankName: 'Axis Bank',
      cardType: 'Credit Card',
      cardNumber: 'XXXX XXXX XXXX 4521',
      dueAmount: '₹45,890',
      dueDate: 'DUE IN 8 DAYS',
      cardColor: '#3A5C7D',
      lastDigits: '4521',
      amountDue: 45890,
    },
  ],
  loans: [
    {
      id: '1',
      loanType: 'Personal Loan',
      provider: 'HDFC Bank',
      loanAmount: '₹5,00,000',
      emiAmount: '₹15,234',
      remainingAmount: '₹2,50,000',
      nextEMIDate: '2026-09-05',
    },
  ],
  bankAccounts: [
    {
      id: '1',
      bankName: 'HDFC Bank',
      accountType: 'Savings',
      accountNumber: 'XXXX XXXX 1234',
      balance: '₹15,00,000',
      ifscCode: 'HDFC0001234',
    },
    {
      id: '2',
      bankName: 'ICICI Bank',
      accountType: 'Savings',
      accountNumber: 'XXXX XXXX 5678',
      balance: '₹8,75,000',
      ifscCode: 'ICIC0005678',
    },
  ],
  cashback: {
    totalCashback: '₹15,000',
    currentMonth: '₹2,345',
    rewards: 601148,
  },
};

export const initializeStorage = async () => {
  try {
    const existingCards = await AsyncStorage.getItem(STORAGE_KEYS.CARDS);
    if (!existingCards) {
      await AsyncStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(defaultData.cards));
      await AsyncStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(defaultData.loans));
      await AsyncStorage.setItem(STORAGE_KEYS.BANK_ACCOUNTS, JSON.stringify(defaultData.bankAccounts));
      await AsyncStorage.setItem(STORAGE_KEYS.CASHBACK, JSON.stringify(defaultData.cashback));
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};

export const getCards = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CARDS);
    return data ? JSON.parse(data) : defaultData.cards;
  } catch (error) {
    console.error('Error getting cards:', error);
    return [];
  }
};

export const getLoans = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LOANS);
    return data ? JSON.parse(data) : defaultData.loans;
  } catch (error) {
    console.error('Error getting loans:', error);
    return [];
  }
};

export const getBankAccounts = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BANK_ACCOUNTS);
    return data ? JSON.parse(data) : defaultData.bankAccounts;
  } catch (error) {
    console.error('Error getting bank accounts:', error);
    return [];
  }
};

export const getCashback = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CASHBACK);
    return data ? JSON.parse(data) : defaultData.cashback;
  } catch (error) {
    console.error('Error getting cashback:', error);
    return defaultData.cashback;
  }
};

export const addCard = async (card) => {
  try {
    const cards = await getCards();
    const newCard = {
      ...card,
      id: Date.now().toString(),
    };
    cards.push(newCard);
    await AsyncStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
    return newCard;
  } catch (error) {
    console.error('Error adding card:', error);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const cards = await getCards();
    const filtered = cards.filter(c => c.id !== cardId);
    await AsyncStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting card:', error);
  }
};

export const addLoan = async (loan) => {
  try {
    const loans = await getLoans();
    const newLoan = {
      ...loan,
      id: Date.now().toString(),
    };
    loans.push(newLoan);
    await AsyncStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(loans));
    return newLoan;
  } catch (error) {
    console.error('Error adding loan:', error);
  }
};

export const deleteLoan = async (loanId) => {
  try {
    const loans = await getLoans();
    const filtered = loans.filter(l => l.id !== loanId);
    await AsyncStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting loan:', error);
  }
};

export const addBankAccount = async (account) => {
  try {
    const accounts = await getBankAccounts();
    const newAccount = {
      ...account,
      id: Date.now().toString(),
    };
    accounts.push(newAccount);
    await AsyncStorage.setItem(STORAGE_KEYS.BANK_ACCOUNTS, JSON.stringify(accounts));
    return newAccount;
  } catch (error) {
    console.error('Error adding bank account:', error);
  }
};

export const deleteBankAccount = async (accountId) => {
  try {
    const accounts = await getBankAccounts();
    const filtered = accounts.filter(a => a.id !== accountId);
    await AsyncStorage.setItem(STORAGE_KEYS.BANK_ACCOUNTS, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting bank account:', error);
  }
};

export const ADMIN_PASSWORD = '12345';

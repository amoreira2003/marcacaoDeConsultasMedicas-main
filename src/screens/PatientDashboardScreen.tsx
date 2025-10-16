import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PatientDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PatientDashboard'>;
};

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface StyledProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

// Utilitário simples para mostrar iniciais quando não há foto
const getInitials = (name?: string) => {
  if (!name) return '??';
  const parts = name.trim().split(' ').filter(Boolean);
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};

const PatientDashboardScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<PatientDashboardScreenProps['navigation']>();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const userAppointments = allAppointments.filter(
          (appointment) => appointment.patientId === user?.id
        );
        setAppointments(userAppointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Carrega as consultas quando a tela estiver em foco
  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [user?.id])
  );

  const initials = getInitials(user?.name);

  return (
    <Container>
      {/* Seu Header global (mantido) */}
      <Header />

      {/* Cabeçalho da conta com avatar que consome user.image */}
      <AccountHeader onPress={() => navigation.navigate('Profile')}>
        <AvatarWrapper>
          {user?.image ? (
            <AvatarImage source={{ uri: user.image }} resizeMode="cover" />
          ) : (
            <AvatarFallback>
              <AvatarInitials>{initials}</AvatarInitials>
            </AvatarFallback>
          )}
        </AvatarWrapper>

        <AccountInfo>
          <WelcomeText>Olá,</WelcomeText>
          <AccountName numberOfLines={1}>{user?.name || 'Paciente'}</AccountName>
          {!!user?.email && <AccountEmail numberOfLines={1}>{user.email}</AccountEmail>}
        </AccountInfo>

        <ProfileCTA>
          <ProfileCTAText>Ver perfil</ProfileCTAText>
        </ProfileCTA>
      </AccountHeader>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Minhas Consultas</Title>

        <Button
          title="Agendar Nova Consulta"
          onPress={() => navigation.navigate('CreateAppointment')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        {loading ? (
          <LoadingText>Carregando consultas...</LoadingText>
        ) : appointments.length === 0 ? (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id}>
              <ListItem.Content>
                <ListItem.Title style={styles.patientName as TextStyle}>
                  Paciente: {appointment.patientName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.dateTime as TextStyle}>
                  {appointment.date} às {appointment.time}
                </ListItem.Subtitle>
                <Text style={styles.doctorName as TextStyle}>
                  {appointment.doctorName}
                </Text>
                <Text style={styles.specialty as TextStyle}>
                  {appointment.specialty}
                </Text>
                <StatusBadge status={appointment.status}>
                  <StatusText status={appointment.status}>
                    {getStatusText(appointment.status)}
                  </StatusText>
                </StatusBadge>
              </ListItem.Content>
            </AppointmentCard>
          ))
        )}

        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
  dateTime: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
};

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

/* ====== Cabeçalho de Conta (consome user.image) ====== */
const AccountHeader = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
  background-color: ${theme.colors.background};
`;

const AvatarWrapper = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  overflow: hidden;
  background-color: ${theme.colors.border};
`;

const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const AvatarFallback = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.border};
`;

const AvatarInitials = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: ${theme.colors.text};
  opacity: 0.8;
`;

const AccountInfo = styled.View`
  flex: 1;
  min-width: 0px;
`;

const WelcomeText = styled.Text`
  font-size: 12px;
  color: ${theme.colors.text};
  opacity: 0.6;
`;

const AccountName = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: ${theme.colors.text};
`;

const AccountEmail = styled.Text`
  font-size: 12px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

const ProfileCTA = styled.View`
  padding: 6px 8px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const ProfileCTAText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.text};
`;

/* ====== Resto da tela ====== */
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

const AppointmentCard = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

const StatusBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => getStatusColor(props.status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

const StatusText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 500;
`;

export default PatientDashboardScreen;

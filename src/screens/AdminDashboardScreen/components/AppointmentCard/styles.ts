import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusColor, AppointmentStatus } from '../../utils/statusHelpers';

/**
 * Novo design para o AppointmentCard (estilização)
 * - Look mais moderno com barra de acento por status
 * - Uso do tema via props.theme (suporta light/dark)
 * - Estados (compact, pressed) e melhor toque/legibilidade
 * - Botões com variantes (primary, outline, ghost)
 * - Layout pronto para avatar, tags e ações
 */

// Helpers visuais reutilizáveis
const shadow = css`
  ${Platform.select({
    ios: css`
      shadow-color: #000;
      shadow-opacity: 0.08;
      shadow-radius: 10px;
      shadow-offset: 0px 6px;
    `,
    android: css`
      elevation: 3;
    `,
    default: '' as any,
  })}
`;

const surface = (p: any) => p.theme?.colors?.surface || '#FFFFFF';
const textColor = (p: any) => p.theme?.colors?.text || '#111827';
const muted = (p: any) => p.theme?.colors?.muted || 'rgba(0,0,0,0.6)';
const border = (p: any) => p.theme?.colors?.border || 'rgba(0,0,0,0.08)';
const primary = (p: any) => p.theme?.colors?.primary || '#2563EB';
const success = (p: any) => p.theme?.colors?.success || '#16A34A';
const danger = (p: any) => p.theme?.colors?.error || '#DC2626';
const spacing = (p: any) => p.theme?.spacing || { xsmall: 4, small: 8, medium: 12, large: 16, xlarge: 24 };

export const Card = styled.Pressable<{ status: AppointmentStatus; compact?: boolean }>`
  background-color: ${surface};
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid ${border};
  ${shadow}
`;

export const AccentBar = styled.View<{ status: AppointmentStatus }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: ${(p) => getStatusColor(p.status)};
`;

export const Content = styled.View<{ compact?: boolean }>`
  padding: ${(p) => spacing(p).large}px;
  ${(p) => p.compact && css`
    padding: ${spacing(p).medium}px;
  `}
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${border};
`;

export const TitleWrap = styled.View`
  flex: 1;
`;

export const DoctorName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: ${textColor};
`;

export const Specialty = styled.Text`
  margin-top: 2px;
  font-size: 13px;
  color: ${muted};
`;

export const MetaRow = styled.View`
  margin-top: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
`;

export const Meta = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const MetaText = styled.Text`
  font-size: 13px;
  color: ${textColor};
  opacity: 0.9;
`;

export const StatusBadge = styled.View<{ status: AppointmentStatus }>`
  background-color: ${(p) => `${getStatusColor(p.status)}20`};
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid ${(p) => `${getStatusColor(p.status)}40`};
`;

export const StatusText = styled.Text<{ status: AppointmentStatus }>`
  color: ${(p) => getStatusColor(p.status)};
  font-size: 12px;
  font-weight: 700;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: ${border};
  margin: 12px 0;
`;

export const Notes = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: ${textColor};
  opacity: 0.9;
`;

export const Tags = styled.View`
  margin-top: 8px;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Tag = styled.View`
  padding: 4px 10px;
  border-radius: 999px;
  background-color: ${border};
`;

export const TagText = styled.Text`
  font-size: 11px;
  color: ${muted};
`;

export const Actions = styled.View`
  margin-top: 6px;
  flex-direction: row;
  gap: 10px;
`;

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

export const ActionButton = styled.Pressable<{ variant?: ButtonVariant }>`
  flex: 1;
  border-radius: 12px;
  padding: 12px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  ${(p) => {
    const v = p.variant || 'primary';
    if (v === 'outline') {
      return css`
        background-color: transparent;
        border-color: ${border(p)};
      `;
    }
    if (v === 'ghost') {
      return css`
        background-color: transparent;
        border-color: transparent;
      `;
    }
    if (v === 'danger') {
      return css`
        background-color: ${danger(p)};
        border-color: ${danger(p)};
      `;
    }
    return css`
      background-color: ${primary(p)};
      border-color: ${primary(p)};
    `;
  }}
`;

export const ActionButtonText = styled.Text<{ variant?: ButtonVariant }>`
  font-weight: 700;
  font-size: 14px;
  ${(p) => {
    const v = p.variant || 'primary';
    if (v === 'outline') {
      return css`
        color: ${textColor(p)};
      `;
    }
    if (v === 'ghost') {
      return css`
        color: ${textColor(p)};
        opacity: 0.9;
      `;
    }
    return css`
      color: #ffffff;
    `;
  }}
`;

// Estados visuais do Pressable (iOS/Android) – uso sugerido no componente
export const PressableOverlay = styled.View`
  ...
`;

// Exemplo de uso (no componente JSX):
// <Card status={status} compact onPress={onOpen}>
//   <AccentBar status={status} />
//   <Content compact>
//     <Header>
//       <Avatar source={{ uri: doctor.avatarUrl }} />
//       <TitleWrap>
//         <DoctorName>{doctor.name}</DoctorName>
//         <Specialty>{doctor.specialty}</Specialty>
//       </TitleWrap>
//       <StatusBadge status={status}>
//         <StatusText status={status}>{statusLabel}</StatusText>
//       </StatusBadge>
//     </Header>
//
//     <MetaRow>
//       <Meta>
//         {/* ícone de calendário */}
//         <MetaText>{dateLabel}</MetaText>
//       </Meta>
//       <Meta>
//         {/* ícone de relógio */}
//         <MetaText>{timeLabel}</MetaText>
//       </Meta>
//       <Meta>
//         {/* ícone de local */}
//         <MetaText>{placeLabel}</MetaText>
//       </Meta>
//     </MetaRow>
//
//     {!!notes && (
//       <>
//         <Divider />
//         <Notes numberOfLines={3}>{notes}</Notes>
//       </>
//     )}
//
//     {!!tags?.length && (
//       <Tags>
//         {tags.map((t) => (
//           <Tag key={t}><TagText>{t}</TagText></Tag>
//         ))}
//       </Tags>
//     )}
//
//     <Actions>
//       <ActionButton variant="outline" onPress={onReschedule}>
//         <ActionButtonText variant="outline">Remarcar</ActionButtonText>
//       </ActionButton>
//       <ActionButton variant="primary" onPress={onConfirm}>
//         <ActionButtonText>Confirmar</ActionButtonText>
//       </ActionButton>
//     </Actions>
//   </Content>
// </Card>

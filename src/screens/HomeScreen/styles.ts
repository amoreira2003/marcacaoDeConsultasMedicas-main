import styled, { css } from 'styled-components/native';
import { FlatList, Platform } from 'react-native';

/**
 * Novo design para a tela de Agendamentos (estilos)
 * - Cabeçalho flutuante com título e contador
 * - Barra de busca e filtros em chips
 * - Lista com espaçamento confortável e separadores sutis
 * - Estados de vazio/erro e botão flutuante de ação
 * - Usa props.theme para suportar light/dark
 */

// Aliases de tokens do tema
const bg = (p: any) => p.theme?.colors?.background || '#0B0B0C';
const surface = (p: any) => p.theme?.colors?.surface || '#FFFFFF';
const text = (p: any) => p.theme?.colors?.text || '#111827';
const muted = (p: any) => p.theme?.colors?.muted || 'rgba(0,0,0,0.6)';
const border = (p: any) => p.theme?.colors?.border || 'rgba(0,0,0,0.08)';
const primary = (p: any) => p.theme?.colors?.primary || '#2563EB';
const danger = (p: any) => p.theme?.colors?.error || '#DC2626';
const success = (p: any) => p.theme?.colors?.success || '#16A34A';
const spacing = (p: any) => p.theme?.spacing || { xsmall: 4, small: 8, medium: 12, large: 16, xlarge: 24 };

const shadow = css`
  ${Platform.select({
    ios: css`
      shadow-color: #000;
      shadow-opacity: 0.08;
      shadow-radius: 12px;
      shadow-offset: 0px 8px;
    `,
    android: css`
      elevation: 3;
    `,
    default: '' as any,
  })}
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${bg};
`;

export const Header = styled.View`
  padding-top: ${Platform.OS === 'ios' ? 8 : 0}px;
  background-color: ${bg};
  border-bottom-width: 1px;
  border-bottom-color: ${border};
`;

export const TitleContainer = styled.View`
  padding: 18px ${Platform.OS === 'android' ? 16 : 20}px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: 800;
  color: ${text};
`;

export const Counter = styled.View`
  padding: 6px 10px;
  border-radius: 999px;
  background-color: ${border};
`;

export const CounterText = styled.Text`
  font-size: 12px;
  color: ${muted};
  font-weight: 700;
`;

export const SearchRow = styled.View`
  padding: 0 ${Platform.OS === 'android' ? 16 : 20}px 12px;
  gap: 10px;
`;

export const SearchBar = styled.View`
  background-color: ${surface};
  border: 1px solid ${border};
  border-radius: 12px;
  padding: 10px 12px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  ${shadow}
`;

export const SearchInput = styled.TextInput.attrs((p) => ({
  placeholderTextColor: p.theme?.colors?.placeholder || 'rgba(0,0,0,0.4)',
}))`
  flex: 1;
  font-size: 14px;
  color: ${text};
`;

export const FiltersScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: Platform.OS === 'android' ? 16 : 20, gap: 8 },
})`
  padding-vertical: 6px;
` as any;

export const Chip = styled.Pressable<{ selected?: boolean }>`
  padding: 8px 12px;
  border-radius: 999px;
  border-width: 1px;
  ${(p) =>
    p.selected
      ? css`
          background-color: ${primary(p)}20;
          border-color: ${primary(p)};
        `
      : css`
          background-color: transparent;
          border-color: ${border(p)};
        `}
`;

export const ChipText = styled.Text<{ selected?: boolean }>`
  font-size: 12px;
  font-weight: 700;
  ${(p) =>
    p.selected
      ? css`
          color: ${primary(p)};
        `
      : css`
          color: ${text(p)};
          opacity: 0.8;
        `}
`;

export const Content = styled.View`
  flex: 1;
`;

export const AppointmentList = styled(FlatList as new () => FlatList<any>).attrs((p) => ({
  contentContainerStyle: {
    padding: Platform.OS === 'android' ? 16 : 20,
    paddingBottom: 100,
    gap: spacing(p).medium,
  },
  showsVerticalScrollIndicator: false,
}))``;

export const ItemSeparator = styled.View`
  height: ${Platform.OS === 'ios' ? 4 : 2}px;
`;

export const ListFooterSpacer = styled.View`
  height: 20px;
`;

export const EmptyState = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
`;

export const EmptyIcon = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background-color: ${border};
  margin-bottom: 16px;
`;

export const EmptyTitle = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: ${text};
  text-align: center;
`;

export const EmptySubtitle = styled.Text`
  margin-top: 6px;
  font-size: 13px;
  color: ${muted};
  text-align: center;
`;

export const RetryButton = styled.Pressable`
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background-color: ${primary};
  ${shadow}
`;

export const RetryText = styled.Text`
  color: #fff;
  font-weight: 800;
  font-size: 14px;
`;

export const Fab = styled.Pressable`
  position: absolute;
  right: 20px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  background-color: ${primary};
  ${shadow}
`;

export const FabBadge = styled.View`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding-horizontal: 4px;
  border-radius: 9px;
  align-items: center;
  justify-content: center;
  background-color: ${danger};
  border: 2px solid ${surface};
`;

export const FabBadgeText = styled.Text`
  color: #fff;
  font-size: 10px;
  font-weight: 800;
`;

export const SectionHeader = styled.View`
  padding: 8px 20px 0px;
`;

export const SectionTitle = styled.Text`
  font-size: 13px;
  letter-spacing: 0.3px;
  color: ${muted};
  font-weight: 700;
  text-transform: uppercase;
`;

// Skeletons simples (sem libs externas)
export const Skeleton = styled.View`
  background-color: ${border};
  border-radius: 10px;
  height: 88px;
`;

export const SkeletonRow = styled.View`
  padding: 16px 20px;
  gap: 12px;
`;

export const SkeletonLine = styled.View<{ w?: number; h?: number }>`
  height: ${(p) => p.h || 12}px;
  width: ${(p) => p.w || 160}px;
  border-radius: 6px;
  background-color: ${border};
`;

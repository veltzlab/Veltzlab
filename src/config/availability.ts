// ─────────────────────────────────────────────────────────
//  Disponibilidade — edite aqui para atualizar a Navbar
// ─────────────────────────────────────────────────────────

export type AvailabilityStatus = 'available' | 'busy' | 'unavailable';

export const availability: {
  status: AvailabilityStatus;
  label: string;
  until: string | null;
} = {
  status: 'available',           // 'available' | 'busy' | 'unavailable'
  label: 'Disponível p/ projetos',
  until: null,                   // ex: 'Junho 2025' — aparece como "Ocupado até Junho 2025"
};

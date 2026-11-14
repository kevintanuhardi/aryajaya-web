import { buildLegacyTheme } from 'sanity';
import tokens from '../../../design-system/tokens.json';

const { brand, ink, semantic } = tokens.color;

/** Sanity Studio theme built from the shared design tokens (design-system/tokens.json). */
export const arjayaTheme = buildLegacyTheme({
  '--font-family-base': tokens.font.sans.join(', '),
  '--font-family-monospace': tokens.font.mono.join(', '),

  '--black': ink['950'],
  '--white': '#ffffff',
  '--gray-base': ink['500'],
  '--gray': ink['500'],
  '--component-bg': '#ffffff',
  '--component-text-color': ink['900'],

  '--brand-primary': brand['500'],
  '--default-button-color': ink['600'],
  '--default-button-primary-color': brand['500'],
  '--default-button-success-color': semantic.success,
  '--default-button-warning-color': semantic.warning,
  '--default-button-danger-color': semantic.danger,

  '--state-info-color': semantic.info,
  '--state-success-color': semantic.success,
  '--state-warning-color': semantic.warning,
  '--state-danger-color': semantic.danger,

  '--main-navigation-color': brand['900'],
  '--main-navigation-color--inverted': '#ffffff',
  '--focus-color': brand['500']
});

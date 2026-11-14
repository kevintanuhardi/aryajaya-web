import tokens from '../../../design-system/tokens.json';

/** Monogram shown in the Studio navbar and workspace menu. */
export function StudioLogo() {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={tokens.color.brand['500']} />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontFamily={tokens.font.sans.join(', ')}
        fontSize="15"
        fontWeight="700"
        fill="#ffffff"
      >
        AL
      </text>
    </svg>
  );
}

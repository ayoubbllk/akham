import { ZelligeFragment } from './ZelligeFragment';

/**
 * Composition prédéfinie de fragments zellige éparpillés en arrière-plan.
 * Positions choisies à la main, jamais aléatoires au runtime.
 */
export function ZelligeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <ZelligeFragment x="-4%" y="6%" size={210} color="safran" opacity={0.18} rotation={-7} animated />
      <ZelligeFragment x="86%" y="14%" size={140} color="terracotta" opacity={0.32} rotation={12} animated />
      <ZelligeFragment x="44%" y="2%" size={70} color="ocre" opacity={0.22} rotation={22} shape="triangle" />
      <ZelligeFragment x="68%" y="62%" size={180} color="carmin" opacity={0.18} rotation={-15} shape="hexagon" animated />
      <ZelligeFragment x="6%" y="74%" size={100} color="orange" opacity={0.28} rotation={5} />
      <ZelligeFragment x="92%" y="88%" size={64} color="safran" opacity={0.4} rotation={-20} shape="triangle" animated />
      <ZelligeFragment x="22%" y="42%" size={48} color="terracotta" opacity={0.35} rotation={30} />
      <ZelligeFragment x="50%" y="80%" size={120} color="ocre" opacity={0.16} rotation={-3} shape="hexagon" />
    </div>
  );
}

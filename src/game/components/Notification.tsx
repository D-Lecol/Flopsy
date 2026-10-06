export default function Notification(){
  return (
    <div className="hidden lg:flex items-center gap-space-sm px-space-md py-1.5 rounded bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
      <span className="material-symbols-outlined text-primary text-[18px]">
        warning
      </span>
      <span className="font-label-sm text-label-sm text-on-surface">
        <strong>PIC TARIFAIRE 18H-20H :</strong> Énergie réseau spot à{' '}
        <strong>142€/MWh</strong>. Bascule suggérée sur batteries locales.
      </span>
    </div>
  );
}
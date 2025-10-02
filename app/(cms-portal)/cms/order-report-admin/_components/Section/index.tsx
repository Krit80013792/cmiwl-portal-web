const Section: React.FC<{ title: string; accent: string; children: React.ReactNode }> = ({
  title,
  accent,
  children,
}) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <h4
        style={{
          color: '#1f2937',
          borderBottom: `2px solid ${accent}`,
          paddingBottom: 8,
          marginBottom: 16,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        {title}
      </h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Section

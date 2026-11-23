/**
 * A formatted statistic. It renders its real value in the HTML, so visitors
 * and search engines never see a placeholder "0".
 */
export default function CountUp({ end, prefix = '', suffix = '', decimals = 0, className = '' }) {
  return (
    <span className={className}>
      {prefix}
      {Number(end).toFixed(decimals)}
      {suffix}
    </span>
  )
}

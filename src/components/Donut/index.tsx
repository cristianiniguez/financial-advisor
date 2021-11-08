import { PieLayer, ResponsivePie } from '@nivo/pie';
import { useMemo } from 'react';
import { categories, labels } from '../../data/risks';

import useCurrentRisk from '../../hooks/useCurrentRisk';
import { percentFormat } from '../../utils';
import './styles.scss';

type DonutData = {
  id: string;
  value: number;
};

const Donut = () => {
  const risk = useCurrentRisk();

  const data = useMemo<DonutData[] | null>(() => {
    if (!risk) return null;
    return categories.map((c) => ({ id: labels[c], value: risk[c] })).filter((d) => d.value > 0);
  }, [risk]);

  const DonutTitle: PieLayer<DonutData> = ({ centerX, centerY }) => (
    <text
      x={centerX}
      y={centerY}
      textAnchor='middle'
      dominantBaseline='central'
      style={{
        fontSize: '16px',
        fontWeight: 600,
      }}
    >
      INVESTMENT PORTFOLIO
    </text>
  );

  return (
    data && (
      <div className='donut'>
        <ResponsivePie
          data={data}
          animate={false}
          innerRadius={0.6}
          arcLabel={(d) => `${d.id}: ${percentFormat(d.value)}`}
          arcLabelsComponent={({ label, style }) => (
            <g transform={style.transform.toJSON()} style={{ pointerEvents: 'none' }}>
              <text
                textAnchor='middle'
                dominantBaseline='central'
                fill={style.textColor}
                style={{ fontSize: 12, fontWeight: 600 }}
              >
                {label}
              </text>
            </g>
          )}
          enableArcLinkLabels={false}
          margin={{ top: 40, bottom: 40, left: 40, right: 40 }}
          layers={['arcLinkLabels', 'arcs', 'arcLabels', 'legends', DonutTitle]}
          tooltip={() => null}
        />
      </div>
    )
  );
};

export default Donut;

import colorscustomiser from './ColorConFig';

export function generateConfig(colors) {
  const generatedConfig = colorscustomiser.map((config) => {
    return { ...config, colors: [...colors] };
  });
  return generatedConfig;
}

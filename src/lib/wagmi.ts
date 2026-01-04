import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
	appName: 'my_blog',
	projectId: '066569847d951e6fe2625eb6ab6e967e',
	chains: [sepolia],
	ssr: true,
});

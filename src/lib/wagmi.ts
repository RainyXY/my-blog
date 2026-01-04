import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
	appName: 'my-blog',
	projectId: 'prj_dC91jKYmsPfJawamOCc52Sx5xvWP',
	chains: [sepolia],
	ssr: true,
});

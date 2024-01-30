import path from 'path';
import fs from 'fs-extra';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

function copyFile() {
	return {
		enforce: 'post',
		async writeBundle() {
			await fs.copy(
				path.resolve(__dirname, 'src/cloudfunctions'),
				path.join(
					__dirname,
					'dist',
					process.env.NODE_ENV === 'production' ? 'build' : 'dev',
					process.env.UNI_PLATFORM,
					'cloudfunctions'
				)
			);
		},
	};
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    copyFile()
  ],
})

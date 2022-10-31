import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const packages = JSON.parse(readFileSync('./package.json')).workspaces.filter((v) =>
	v.includes('packages')
);

for (const p of packages) {
	const package_path = join(p, 'package.json');
	const json = JSON.parse(readFileSync(package_path));
	const [namespace, src] = json.name.split('/');
	json.name = namespace + '/' + src.split('-')[1];
	writeFileSync(package_path, JSON.stringify(json, null, 4));
}

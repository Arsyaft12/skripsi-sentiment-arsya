import fs from 'node:fs/promises';
import path from 'node:path';
import Beast from '@/components/Beast';
import type { Reference, Country, MLModels } from '@/lib/types';

/* Reference curves are read on the server at build time and handed to the client
   as props, so the browser never waits on a second round trip for them. */
export default async function Page() {
  const dir = path.join(process.cwd(), 'public', 'data');
  const [ref, countries, mlModels] = await Promise.all([
    fs.readFile(path.join(dir, 'reference.json'), 'utf8').then((s) => JSON.parse(s) as Reference),
    fs.readFile(path.join(dir, 'countries.json'), 'utf8').then((s) => JSON.parse(s) as Country[]),
    fs.readFile(path.join(dir, 'ml_models.json'), 'utf8').then((s) => JSON.parse(s) as MLModels).catch(() => null),
  ]);
  return <Beast reference={ref} countries={countries} mlModels={mlModels} />;
}

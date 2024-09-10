import { Home } from 'lucide-react';

import { Router } from '../Router';
import { Button } from './Button';

export function HomeButton() {
  return (
    <Button onClick={() => Router.push('Home')}>
      <Home /> Home
    </Button>
  );
}

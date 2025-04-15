// server.ts
import 'zone.js/node';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { renderModule } from '@angular/platform-server';
import { readFileSync } from 'fs';
import { AppServerModule } from './app/app.server.module';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/rick-and-morty-simple/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index.html';

  // Our Universal express-engine
  server.engine('html', (_, options: any, callback) => {
    const indexHtmlContent = readFileSync(join(distFolder, indexHtml), 'utf-8');
    
    renderModule(
      AppServerModule,
      {
        document: indexHtmlContent,
        url: options.req.url,
        extraProviders: [
          { provide: APP_BASE_HREF, useValue: options.req.baseUrl },
        ]
      }
    ).then(html => {
      callback(null, html);
    }).catch(err => {
      callback(err);
    });
  });

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  server.get('*', (req, res) => {
    res.render(indexHtml, { req });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4201;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

export * from './main.server';

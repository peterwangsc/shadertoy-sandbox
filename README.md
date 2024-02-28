```
┏┓┓    ┓    ┏┳┓      ┏┓     ┓┓
┗┓┣┓┏┓┏┫┏┓┏┓ ┃ ┏┓┓┏  ┗┓┏┓┏┓┏┫┣┓┏┓┓┏
┗┛┛┗┗┻┗┻┗ ┛  ┻ ┗┛┗┫  ┗┛┗┻┛┗┗┻┗┛┗┛┛┗
                  ┛
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/shader.ts`. The page auto-updates as you edit the file.

### Scrolling

The page has been made long on purpose to enable scrolling to fast forward time. Use the scroll up or down to increase the iTime variable linearly.

### Channels

There is an example of importing a texture from favicon.png and using it as `sampler2D iChannel0`. You can use this technique to import your own custom images as textures.
